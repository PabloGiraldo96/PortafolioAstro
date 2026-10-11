<script setup lang="ts">
// Texto 3D grueso (con extrusión y bisel) que se deshace en puntos que salen volando.
// Reemplaza a <Text3D>: aquí controlamos la geometría para poder engrosarla y muestrear su superficie.
import { onBeforeUnmount } from "vue";
import { useRenderLoop } from "@tresjs/core";
import { AdditiveBlending, BufferAttribute, BufferGeometry, Group, Mesh, MeshMatcapMaterial, Points, ShaderMaterial, Vector2, Vector3 } from "three";
import { FontLoader } from "three/examples/jsm/loaders/FontLoader.js";
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

const props = defineProps({
  text: { type: String, required: true },
  position: { type: Array, default: () => [0, 0, 0] },
  size: { type: Number, default: 10 },
  font: { type: String, default: "https://raw.githubusercontent.com/Tresjs/assets/main/fonts/FiraCodeRegular.json" },
  matcap: { type: Object, required: true }, // textura matcap ya cargada
  color: { type: String, default: "#ffffff" }, // tinte de la letra
  pointColor: { type: String, default: "#ffffff" }, // color de los puntos al explotar
  thickness: { type: Number, default: 1 }, // 0 = casi plana · 1 = gruesa · 1.5+ = muy gruesa
  count: { type: Number, default: 16000 }, // cantidad de puntos
  pointSize: { type: Number, default: 2 },
  spread: { type: Number, default: 0 }, // hasta dónde llegan los puntos (0 = size × 7)
  trigger: { type: String, default: "scroll" }, // 'scroll' | 'loop' | 'manual'
  loopEvery: { type: Number, default: 14 }, // s, solo para trigger="loop"
});

/* ---------- Letras gruesas ----------
   · depth  = fondo de la extrusión
   · bevel* = el bisel crece hacia afuera, así que además engrosa el trazo (~2 × bevelSize) */
const font = await new FontLoader().loadAsync(props.font);
const { depth, bevelSize, bevelThickness } = thicknessParams(props.size, props.thickness);
const geometry = new TextGeometry(props.text, {
  font,
  size: props.size,
  depth, // three ≥ r163
  height: depth, // three anterior (se ignora si no aplica)
  curveSegments: 10,
  bevelEnabled: true,
  bevelThickness,
  bevelSize,
  bevelOffset: 0,
  bevelSegments: 4,
} as any);
geometry.computeBoundingBox();
const bb = geometry.boundingBox!;

const material = new MeshMatcapMaterial({ matcap: props.matcap as any, color: props.color, transparent: true });
const mesh = new Mesh(geometry, material);

/* ---------- Puntos repartidos sobre la superficie de las letras ---------- */
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

const pointsGeometry = new BufferGeometry();
pointsGeometry.setAttribute("position", new BufferAttribute(samples, 3));
pointsGeometry.setAttribute("aDir", new BufferAttribute(attrs.dir, 3));
pointsGeometry.setAttribute("aSpeed", new BufferAttribute(attrs.speed, 1));
pointsGeometry.setAttribute("aRand", new BufferAttribute(attrs.rand, 1));

const pointsMaterial = new ShaderMaterial({
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
const points = new Points(pointsGeometry, pointsMaterial);
points.frustumCulled = false;
points.visible = false;

const group = new Group();
group.position.set(...(props.position as [number, number, number]));
group.add(mesh, points);

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
  progress = dampProgress(progress, target, dt);

  // la malla se desvanece al empezar; los puntos nacen justo sobre las letras
  const meshOpacity = 1 - smoothstep(0, 0.12, progress);
  material.opacity = meshOpacity;
  mesh.visible = meshOpacity > 0.002;
  pointsMaterial.uniforms.uProgress.value = progress;
  pointsMaterial.uniforms.uTime.value = elapsed;
  points.visible = progress > 0.0005;
});

onBeforeUnmount(() => {
  geometry.dispose();
  material.dispose();
  pointsGeometry.dispose();
  pointsMaterial.dispose();
});
</script>

<template>
  <primitive :object="group" />
</template>
