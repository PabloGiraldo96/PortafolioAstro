<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from "vue";
import {
  BufferAttribute,
  BufferGeometry,
  EdgesGeometry,
  Group,
  IcosahedronGeometry,
  LineBasicMaterial,
  LineSegments,
  OrthographicCamera,
  Points,
  PointsMaterial,
  Scene,
  WebGLRenderer,
} from "three";

/* ------------------------------------------------------------------ *
 *  Bacteriófago wireframe que camina de lado a lado de su contenedor.
 *  Uso:  <Phage client:visible />  dentro de un elemento `relative`.
 * ------------------------------------------------------------------ */

const props = withDefaults(
  defineProps<{
    surface?: "left" | "right" | "floor"; // por dónde camina: pared izquierda/derecha o suelo
    height?: number; // alto del carril en px (solo si surface = "floor")
    scale?: number; // tamaño del fago (1 = ~140px de alto)
    speed?: number; // velocidad en px/s
    margin?: number; // margen a cada lado en px
    offset?: number; // separación de la superficie en px
    headColor?: string;
    bodyColor?: string;
    legColor?: string;
  }>(),
  {
    surface: "floor",
    height: 180,
    scale: 1,
    speed: 45,
    margin: 24,
    offset: 0,
    headColor: "#ff4694",
    bodyColor: "#776fff",
    legColor: "#4de1ff",
  }
);

const root = ref<HTMLDivElement>();
const canvas = ref<HTMLCanvasElement>();

// ---- Dimensiones del fago (unidades del mundo) ----
const LEGS = 6;
const HIP_Y = 30; // altura de la placa base
const R_H = 12; // radio de la placa base (donde nacen las patas)
const R_F = 54; // radio al que se apoyan los pies
const L1 = 34; // hueso superior de la pata
const L2 = 40; // hueso inferior
const STRIDE = 16; // longitud de paso
const LIFT = 14; // altura que sube el pie al avanzar
const ELEV = 0.28; // inclinación 3/4 para que se vea la profundidad (rad)

// Tipos de marcha: trípode (patas alternas 0,2,4 / 1,3,5)
const angle = (k: number) => (k * Math.PI) / 3;

let cleanup = () => {};

onMounted(() => {
  const rootEl = root.value!;
  const canvasEl = canvas.value!;
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const renderer = new WebGLRenderer({ canvas: canvasEl, alpha: true, antialias: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setClearColor(0x000000, 0);

  const scene = new Scene();
  const camera = new OrthographicCamera(-1, 1, 1, -1, -2000, 2000);

  // ---------- Partes estáticas (dentro de `body`, que se traslada) ----------
  const rig = new Group(); // se coloca y se gira según la superficie
  const tilt = new Group(); // inclinación 3/4 alrededor del eje de caminata
  tilt.rotation.x = ELEV;
  rig.add(tilt);
  scene.add(rig);
  const body = new Group();
  const headGroup = new Group(); // gira lento sobre su eje
  body.add(headGroup);
  tilt.add(body);

  const lineMat = (color: string, opacity = 0.95) =>
    new LineBasicMaterial({ color, transparent: true, opacity });
  const pointMat = (color: string, size: number) =>
    new PointsMaterial({ color, size, sizeAttenuation: false, transparent: true });

  const disposables: { dispose(): void }[] = [];
  const track = <T extends { dispose(): void }>(o: T) => (disposables.push(o), o);

  // Cabeza: icosaedro alargado con un vértice (eje de 5) apuntando a la cola
  const T = (1 + Math.sqrt(5)) / 2;
  const headGeo = track(new IcosahedronGeometry(24, 0));
  headGeo.rotateX(-Math.atan(T)); // un vértice queda sobre el eje Y
  headGeo.scale(1, 1.3, 1); // cápside alargada
  headGeo.translate(0, 108, 0);
  const headEdges = track(new EdgesGeometry(headGeo));
  headGroup.add(new LineSegments(headEdges, track(lineMat(props.headColor))));

  // Vértices de la cabeza como puntos brillantes (sin duplicados)
  const hp = headGeo.attributes.position;
  const seen = new Set<string>();
  const hv: number[] = [];
  for (let i = 0; i < hp.count; i++) {
    const key = [hp.getX(i), hp.getY(i), hp.getZ(i)].map((n) => n.toFixed(2)).join();
    if (!seen.has(key)) {
      seen.add(key);
      hv.push(hp.getX(i), hp.getY(i), hp.getZ(i));
    }
  }
  const headPts = track(new BufferGeometry());
  headPts.setAttribute("position", new BufferAttribute(new Float32Array(hv), 3));
  headGroup.add(new Points(headPts, track(pointMat(props.headColor, 4))));

  // Collar, vaina de la cola (anillos + aristas) y placa base hexagonal
  const hex = (y: number, r: number, i: number) => [
    r * Math.cos(angle(i)),
    y,
    r * Math.sin(angle(i)),
  ];
  const seg: number[] = [];
  const ring = (y: number, r: number) => {
    for (let i = 0; i < 6; i++) seg.push(...hex(y, r, i), ...hex(y, r, (i + 1) % 6));
  };
  const SHEATH_TOP = 76;
  const RINGS = 9;
  for (let j = 0; j < RINGS; j++) ring(HIP_Y + ((SHEATH_TOP - HIP_Y) * j) / (RINGS - 1), 6);
  for (let i = 0; i < 6; i++) seg.push(...hex(HIP_Y, 6, i), ...hex(SHEATH_TOP, 6, i));
  ring(SHEATH_TOP, 10); // collar
  ring(SHEATH_TOP + 2, 10);
  ring(HIP_Y, R_H); // placa base
  for (let i = 0; i < 6; i++) seg.push(0, HIP_Y, 0, ...hex(HIP_Y, R_H, i)); // radios
  const sheathGeo = track(new BufferGeometry());
  sheathGeo.setAttribute("position", new BufferAttribute(new Float32Array(seg), 3));
  body.add(new LineSegments(sheathGeo, track(lineMat(props.bodyColor))));

  // ---------- Patas (dinámicas, en coordenadas del mundo) ----------
  const legPos = new Float32Array(LEGS * 4 * 3); // [cadera, rodilla, rodilla, pie] x 6
  const legGeo = track(new BufferGeometry());
  legGeo.setAttribute("position", new BufferAttribute(legPos, 3));
  const legs = new LineSegments(legGeo, track(lineMat(props.legColor)));
  legs.frustumCulled = false;
  tilt.add(legs);

  const jointPos = new Float32Array(LEGS * 2 * 3); // rodilla + pie por pata
  const jointGeo = track(new BufferGeometry());
  jointGeo.setAttribute("position", new BufferAttribute(jointPos, 3));
  const joints = new Points(jointGeo, track(pointMat(props.legColor, 4)));
  joints.frustumCulled = false;
  tilt.add(joints);

  // IK de 2 huesos: rodilla doblada hacia arriba y hacia afuera
  function ik(
    hx: number, hy: number, hz: number,
    fx: number, fy: number, fz: number,
    th: number, o: number
  ) {
    const dx = fx - hx, dy = fy - hy, dz = fz - hz;
    const d = Math.hypot(dx, dy, dz) || 1e-6;
    const nx = dx / d, ny = dy / d, nz = dz / d;
    const dc = Math.min(L1 + L2 - 0.01, Math.max(Math.abs(L1 - L2) + 0.01, d));
    const a = (L1 * L1 - L2 * L2 + dc * dc) / (2 * dc);
    const hh = Math.sqrt(Math.max(0, L1 * L1 - a * a));

    let px = Math.cos(th) * 0.6, py = 1, pz = Math.sin(th) * 0.6; // polo
    const dot = px * nx + py * ny + pz * nz;
    px -= dot * nx; py -= dot * ny; pz -= dot * nz;
    const pl = Math.hypot(px, py, pz) || 1;

    const kx = hx + nx * a + (px / pl) * hh;
    const ky = hy + ny * a + (py / pl) * hh;
    const kz = hz + nz * a + (pz / pl) * hh;
    const ex = hx + nx * dc, ey = hy + ny * dc, ez = hz + nz * dc; // pie alcanzable

    legPos.set([hx, hy, hz, kx, ky, kz, kx, ky, kz, ex, ey, ez], o);
    return [kx, ky, kz, ex, ey, ez];
  }

  // ---------- Estado de la caminata ----------
  // bodyX = posición a lo largo del eje de caminata (en pared = vertical)
  let bodyX = 0, dir = 1, h = 1;
  let xmax = 120;

  const smooth = (t: number) => t * t * (3 - 2 * t);

  function step(dt: number) {
    const sw = props.speed / props.scale; // velocidad en unidades del mundo
    if (bodyX >= xmax) dir = -1;
    else if (bodyX <= -xmax) dir = 1;

    // h va de +1 a -1 suavemente: el fago frena y retrocede (es simétrico, no necesita girar)
    h += (dir - h) * Math.min(1, dt * 2.2);
    bodyX = Math.max(-xmax, Math.min(xmax, bodyX + sw * h * dt));

    // La fase del paso depende SOLO de la posición: los pies quedan clavados al
    // suelo siempre, sin deslizarse, tanto al avanzar como al retroceder.
    const cycle = bodyX / (2 * STRIDE);
    const ah = Math.abs(h);
    const bob = Math.sin(cycle * Math.PI * 4) * 1.5 * ah;

    body.position.set(bodyX, bob, 0);
    headGroup.rotation.y += dt * 0.5;

    for (let k = 0; k < LEGS; k++) {
      const th = angle(k);
      // fase de la pata: trípode (pares e impares en contrafase)
      const phi = (((cycle + (k % 2) * 0.5) % 1) + 1) % 1;
      let off: number, lift = 0;
      if (phi < 0.5) {
        // apoyo: el pie se queda fijo en el suelo (se mueve hacia atrás respecto al cuerpo)
        off = STRIDE / 2 - (phi / 0.5) * STRIDE;
      } else {
        // balanceo: el pie sube y avanza al siguiente punto de apoyo
        const q = (phi - 0.5) / 0.5;
        off = -STRIDE / 2 + smooth(q) * STRIDE;
        lift = Math.sin(Math.PI * q) * LIFT * ah;
      }

      const hx = bodyX + R_H * Math.cos(th);
      const hy = HIP_Y + bob;
      const hz = R_H * Math.sin(th);
      const fx = bodyX + R_F * Math.cos(th) + off;
      const fz = R_F * Math.sin(th);

      const [kx, ky, kz, ex, ey, ez] = ik(hx, hy, hz, fx, lift, fz, th, k * 12);
      jointPos.set([kx, ky, kz, ex, ey, ez], k * 6);
    }
    legGeo.attributes.position.needsUpdate = true;
    jointGeo.attributes.position.needsUpdate = true;
  }

  // ---------- Tamaño y superficie ----------
  function resize() {
    const k = props.scale;
    const floor = props.surface === "floor";
    const w = rootEl.clientWidth || 300;
    const H = floor ? props.height : rootEl.clientHeight || 300;
    renderer.setSize(w, H, false);

    const halfW = w / (2 * k);
    const halfH = H / (2 * k);
    camera.left = -halfW;
    camera.right = halfW;
    camera.top = halfH;
    camera.bottom = -halfH;
    camera.updateProjectionMatrix();
    camera.position.set(0, 0, 600);

    // El eje local x es la dirección de caminata y el local y es "arriba"
    // (hacia fuera de la superficie). Se gira todo el conjunto para pegarlo a la superficie.
    const gap = (6 + props.offset) / k;
    let walkHalf: number;
    if (floor) {
      rig.rotation.z = 0;
      rig.position.set(0, -halfH + gap, 0);
      walkHalf = halfW;
    } else if (props.surface === "right") {
      rig.rotation.z = Math.PI / 2; // arriba = hacia la izquierda
      rig.position.set(halfW - gap, 0, 0);
      walkHalf = halfH;
    } else {
      rig.rotation.z = -Math.PI / 2; // arriba = hacia la derecha
      rig.position.set(-halfW + gap, 0, 0);
      walkHalf = halfH;
    }

    xmax = Math.max(0, walkHalf - props.margin / k - R_F);
    bodyX = Math.max(-xmax, Math.min(xmax, bodyX));
    if (reduced) {
      step(0);
      renderer.render(scene, camera);
    }
  }

  const ro = new ResizeObserver(resize);
  ro.observe(rootEl);
  resize();

  // Solo anima cuando el componente es visible (ahorra GPU/batería)
  let visible = true;
  const io = new IntersectionObserver(([e]) => (visible = e.isIntersecting));
  io.observe(rootEl);

  let raf = 0;
  let last = performance.now();
  const loop = (t: number) => {
    raf = requestAnimationFrame(loop);
    const dt = Math.min(0.05, (t - last) / 1000);
    last = t;
    if (!visible) return;
    step(dt);
    renderer.render(scene, camera);
  };
  if (!reduced) raf = requestAnimationFrame(loop);

  cleanup = () => {
    cancelAnimationFrame(raf);
    ro.disconnect();
    io.disconnect();
    disposables.forEach((d) => d.dispose());
    renderer.dispose();
  };
});

onBeforeUnmount(() => cleanup());
</script>

<template>
  <div ref="root" class="phage-layer" aria-hidden="true">
    <canvas
      ref="canvas"
      class="phage-canvas"
      :style="surface === 'floor' ? { height: height + 'px', bottom: '0px' } : { top: '0px', height: '100%' }"
    />
  </div>
</template>

<style>
.phage-layer {
  position: absolute;
  inset: 0;
  overflow: hidden;
  pointer-events: none; /* no bloquea clics ni texto */
  z-index: -5;
}
.phage-canvas {
  position: absolute;
  left: 0;
  width: 100%;
  display: block;
}
</style>