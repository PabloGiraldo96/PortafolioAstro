<script setup lang="ts">
// Texto 3D grueso que se deshace en puntos. Versión optimizada para cargar rápido:
//  · la fuente viene de una caché compartida (una sola descarga para todos los textos) y se pide al cargar el módulo
//  · NO espera la textura: arranca con un matcap generado por código y cambia al real cuando llega
//  · los puntos de la explosión se calculan cuando el navegador está libre (o antes, si hacen falta)
//  · menos segmentos de curva/bisel por defecto → menos geometría que construir
import { onBeforeUnmount } from "vue";
import { useRenderLoop } from "@tresjs/core";
import {
  AdditiveBlending,
  BufferAttribute,
  BufferGeometry,
  CanvasTexture,
  Group,
  Mesh,
  MeshMatcapMaterial,
  Points,
  SRGBColorSpace,
  ShaderMaterial,
  Vector2,
  Vector3,
} from "three";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry.js";
import { MeshSurfaceSampler } from "three/examples/jsm/math/MeshSurfaceSampler.js";
import {
  buildParticleAttributes,
  dampProgress,
  fragmentShader,
  hexToRgb,
  loopTarget,
  scrollProgress,
  thicknessParams,
  vertexShader,
} from "../lib/explodeParticles";
import { FONT_URL, loadFont, loadTexture } from "../lib/assets";
import { scheduleIdle } from "../lib/loadOnce";
import { mark } from "../lib/perf";

const props = defineProps({
  text: { type: String, required: true },
  position: { type: Array, default: () => [0, 0, 0] },
  size: { type: Number, default: 10 },
  font: { type: String, default: FONT_URL },
  matcapUrl: { type: String, default: "" }, // textura matcap (opcional): se carga en segundo plano
  color: { type: String, default: "#ffffff" }, // tinte de la letra
  pointColor: { type: String, default: "#ffffff" }, // color de los puntos al explotar
  thickness: { type: Number, default: 1 }, // 0 = casi plana · 1 = gruesa · 1.5+ = muy gruesa
  curveSegments: { type: Number, default: 6 }, // calidad de las curvas (antes 10): menos = carga más rápido
  bevelSegments: { type: Number, default: 2 }, // calidad del bisel (antes 4)
  count: { type: Number, default: 16000 }, // cantidad de puntos
  pointSize: { type: Number, default: 2 },
  spread: { type: Number, default: 0 }, // hasta dónde llegan los puntos (0 = size × 7)
  trigger: { type: String, default: "scroll" }, // 'scroll' | 'loop' | 'manual'
  loopEvery: { type: Number, default: 14 }, // s, solo para trigger="loop"
});

const tag = props.text.slice(0, 6);

/* ---------- Letras gruesas ---------- */
const font = await loadFont(props.font); // misma promesa para todos los textos; ya suele estar descargada
mark(`font-used:${tag}`);
const { depth, bevelSize, bevelThickness } = thicknessParams(props.size, props.thickness);
const geometry = new TextGeometry(props.text, {
  font,
  size: props.size,
  depth, // three ≥ r163
  height: depth, // three anterior (se ignora si no aplica)
  curveSegments: props.curveSegments,
  bevelEnabled: true,
  bevelThickness,
  bevelSize,
  bevelOffset: 0,
  bevelSegments: props.bevelSegments,
} as any);
geometry.computeBoundingBox();
const bb = geometry.boundingBox!;
mark(`geometry:${tag}`);

/* ---------- Material: matcap provisional (instantáneo) → real cuando llega ---------- */
function makeFallbackMatcap(): CanvasTexture | null {
  if (typeof document === "undefined") return null; // SSR
  const c = document.createElement("canvas");
  c.width = c.height = 128;
  const g = c.getContext("2d")!;
  const grad = g.createRadialGradient(46, 40, 4, 64, 64, 64); // brillo arriba a la izquierda, borde oscuro
  grad.addColorStop(0, "#ffffff");
  grad.addColorStop(0.35, "#c9c9d2");
  grad.addColorStop(0.75, "#5b5b6a");
  grad.addColorStop(1, "#1a1a24");
  g.fillStyle = grad;
  g.fillRect(0, 0, 128, 128);
  const t = new CanvasTexture(c);
  t.colorSpace = SRGBColorSpace;
  return t;
}
const fallbackMatcap = makeFallbackMatcap();
const material = new MeshMatcapMaterial({ matcap: fallbackMatcap ?? undefined, color: props.color, transparent: true });
const mesh = new Mesh(geometry, material);

let disposed = false;
if (props.matcapUrl) {
  loadTexture(props.matcapUrl)
    .then((tex) => {
      if (disposed) return;
      material.matcap = tex;
      material.needsUpdate = true;
      mark(`matcap:${tag}`);
    })
    .catch(() => {}); // si falla, se queda con el provisional
}

const group = new Group();
group.position.set(...(props.position as [number, number, number]));
group.add(mesh);

/* ---------- Puntos de la explosión: se construyen cuando hay tiempo libre ---------- */
let points: Points | null = null;
let pointsGeometry: BufferGeometry | null = null;
let pointsMaterial: ShaderMaterial | null = null;

function buildPoints() {
  if (points || disposed) return;
  const sampler = new MeshSurfaceSampler(mesh).build();
  const samples = new Float32Array(props.count * 3);
  const v = new Vector3();
  for (let i = 0; i < props.count; i++) {
    sampler.sample(v);
    samples[i * 3] = v.x;
    samples[i * 3 + 1] = v.y;
    samples[i * 3 + 2] = v.z;
  }
  const center: [number, number, number] = [(bb.min.x + bb.max.x) / 2, (bb.min.y + bb.max.y) / 2, (bb.min.z + bb.max.z) / 2];
  const half: [number, number, number] = [(bb.max.x - bb.min.x) / 2, (bb.max.y - bb.min.y) / 2, (bb.max.z - bb.min.z) / 2];
  const attrs = buildParticleAttributes(samples, { center, half, spread: props.spread || props.size * 7 });

  pointsGeometry = new BufferGeometry();
  pointsGeometry.setAttribute("position", new BufferAttribute(samples, 3));
  pointsGeometry.setAttribute("aDir", new BufferAttribute(attrs.dir, 3));
  pointsGeometry.setAttribute("aSpeed", new BufferAttribute(attrs.speed, 1));
  pointsGeometry.setAttribute("aRand", new BufferAttribute(attrs.rand, 1));
  pointsMaterial = new ShaderMaterial({
    vertexShader,
    fragmentShader,
    uniforms: {
      uProgress: { value: 0 },
      uTime: { value: 0 },
      uSize: { value: props.pointSize },
      uPixelRatio: { value: Math.min(typeof window !== "undefined" ? window.devicePixelRatio || 1 : 1, 2) },
      uBoundsX: { value: new Vector2(bb.min.x, bb.max.x) },
      uColor: { value: new Vector3(...hexToRgb(props.pointColor)) },
    },
    transparent: true,
    depthWrite: false,
    blending: AdditiveBlending,
  });
  points = new Points(pointsGeometry, pointsMaterial);
  points.frustumCulled = false;
  points.visible = false;
  group.add(points);
  mark(`particles:${tag}`);
}
const cancelIdle = scheduleIdle(buildPoints, 1500);

/* ---------- Explosión: el progreso (0 = letras, 1 = todo disuelto) sigue a un objetivo ---------- */
let progress = 0;
let manualTarget = 0;
let lastElapsed = 0;
const smoothstep = (a: number, b: number, x: number) => {
  const t = Math.min(Math.max((x - a) / (b - a), 0), 1);
  return t * t * (3 - 2 * t);
};

// Funciones para trigger="manual" (llámalas con una ref: textRef.value.explode())
const explode = () => (manualTarget = 1);
const reform = () => (manualTarget = 0);
const toggle = () => (manualTarget = manualTarget > 0.5 ? 0 : 1);
defineExpose({ explode, reform, toggle });

const { onLoop } = useRenderLoop();
onLoop(({ delta, elapsed }: { delta?: number; elapsed: number }) => {
  const dt = delta ?? elapsed - lastElapsed;
  lastElapsed = elapsed;

  let target = manualTarget;
  if (props.trigger === "scroll") target = scrollProgress(window.scrollY, window.innerHeight);
  else if (props.trigger === "loop") target = loopTarget(elapsed, props.loopEvery);
  if (!points && target > 0.001) buildPoints(); // si ya hace falta la explosión, no esperar al tiempo libre
  progress = dampProgress(progress, target, dt);

  const meshOpacity = 1 - smoothstep(0, 0.12, progress);
  material.opacity = meshOpacity;
  mesh.visible = meshOpacity > 0.002;
  if (points && pointsMaterial) {
    pointsMaterial.uniforms.uProgress.value = progress;
    pointsMaterial.uniforms.uTime.value = elapsed;
    points.visible = progress > 0.0005;
  }
});

onBeforeUnmount(() => {
  disposed = true;
  cancelIdle();
  geometry.dispose();
  material.dispose();
  fallbackMatcap?.dispose();
  pointsGeometry?.dispose();
  pointsMaterial?.dispose();
});
</script>

<template>
  <primitive :object="group" />
</template>
