<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from "vue";
import {
  BufferAttribute,
  BufferGeometry,
  CanvasTexture,
  Color,
  EdgesGeometry,
  Group,
  IcosahedronGeometry,
  LineBasicMaterial,
  LineSegments,
  OrthographicCamera,
  Points,
  PointsMaterial,
  SRGBColorSpace,
  Scene,
  WebGLRenderer,
} from "three";

/* ------------------------------------------------------------------ *
 *  Adenovirus: cápside icosaédrica hecha de esferas + 12 fibras con
 *  un botón en la punta. Flota rebotando por TODO el contenedor
 *  (vertical, horizontal y diagonal) mientras rota en 3D.
 *  Uso:  <Adenovirus client:visible />  dentro de un elemento `relative`.
 * ------------------------------------------------------------------ */

const props = withDefaults(
  defineProps<{
    scale?: number; // tamaño (1 ≈ 150px de diámetro con fibras)
    speed?: number; // velocidad en px/s
    margin?: number; // margen a los bordes en px
    respectReducedMotion?: boolean; // true = se queda quieto si el sistema tiene "reducir movimiento"
    wander?: number; // cuánto curva su trayectoria (rad/s). 0 = rebote recto
    density?: number; // esferas por arista de cada cara (más = cápside más densa)
    capsidColor?: string;
    fiberColor?: string;
    knobColor?: string;
  }>(),
  {
    scale: 1.5,
    speed: 100,
    margin: 8,
    respectReducedMotion: false,
    wander: 0.35,
    density: 20,
    capsidColor: "#3D0023",
    fiberColor: "#42B65E",
    knobColor: "#f2b01e",
  }
);

const root = ref<HTMLDivElement>();
const canvas = ref<HTMLCanvasElement>();

// ---- Dimensiones del virus (unidades del mundo) ----
const R = 40; // radio del icosaedro
const FL = 34; // largo de las fibras
const EXTENT = R + FL + 8; // radio total aprox. (para rebotar en los bordes)

let cleanup = () => {};

onMounted(() => {
  const rootEl = root.value!;
  const canvasEl = canvas.value!;
  // Por defecto NO se congela con "reducir movimiento" (en muchos celulares está activo
  // por ahorro de batería y dejaba al virus quieto). Pon respectReducedMotion si lo prefieres.
  const reduced =
    props.respectReducedMotion &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const renderer = new WebGLRenderer({ canvas: canvasEl, alpha: true, antialias: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setClearColor(0x000000, 0);

  const scene = new Scene();
  const camera = new OrthographicCamera(-1, 1, 1, -1, -2000, 2000);
  camera.position.set(0, 0, 600);

  const virus = new Group();
  scene.add(virus);

  const disposables: { dispose(): void }[] = [];
  const track = <T extends { dispose(): void }>(o: T) => (disposables.push(o), o);

  // Textura de esfera: círculo con degradado (da volumen a cada punto)
  const c = document.createElement("canvas");
  c.width = c.height = 64;
  const g = c.getContext("2d")!;
  const gr = g.createRadialGradient(24, 22, 4, 32, 32, 30);
  gr.addColorStop(0, "#ffffff");
  gr.addColorStop(1, "#8a8a8a");
  g.fillStyle = gr;
  g.beginPath();
  g.arc(32, 32, 30, 0, Math.PI * 2);
  g.fill();
  const sphereTex = track(new CanvasTexture(c));
  sphereTex.colorSpace = SRGBColorSpace;

  const sphereMat = (size: number) =>
    track(
      new PointsMaterial({
        size,
        map: sphereTex,
        alphaTest: 0.5,
        sizeAttenuation: false,
        vertexColors: true,
      })
    );
  const matCapsid = sphereMat(6);
  const matPenton = sphereMat(10);
  const matKnob = sphereMat(14);
  const sizes: [PointsMaterial, number][] = [
    [matCapsid, 6],
    [matPenton, 10],
    [matKnob, 14],
  ];

  // ---------- Cápside: esferas sobre las 20 caras del icosaedro ----------
  const ico = track(new IcosahedronGeometry(R, 0));
  const ip = ico.attributes.position;
  const n = Math.max(2, Math.round(props.density));
  const key = (x: number, y: number, z: number) =>
    `${x.toFixed(2)},${y.toFixed(2)},${z.toFixed(2)}`;

  const capSet = new Map<string, number[]>();
  const vertSet = new Map<string, number[]>();
  for (let f = 0; f < ip.count; f += 3) {
    const A = [ip.getX(f), ip.getY(f), ip.getZ(f)];
    const B = [ip.getX(f + 1), ip.getY(f + 1), ip.getZ(f + 1)];
    const C = [ip.getX(f + 2), ip.getY(f + 2), ip.getZ(f + 2)];
    [A, B, C].forEach((p) => vertSet.set(key(p[0], p[1], p[2]), p));
    for (let i = 0; i <= n; i++) {
      for (let j = 0; j <= n - i; j++) {
        const p = [
          A[0] + ((B[0] - A[0]) * i) / n + ((C[0] - A[0]) * j) / n,
          A[1] + ((B[1] - A[1]) * i) / n + ((C[1] - A[1]) * j) / n,
          A[2] + ((B[2] - A[2]) * i) / n + ((C[2] - A[2]) * j) / n,
        ];
        capSet.set(key(p[0], p[1], p[2]), p);
      }
    }
  }
  const capPos = new Float32Array([...capSet.values()].flat());
  const capCol = new Float32Array(capPos.length);
  const pentPos = new Float32Array([...vertSet.values()].flat()); // 12 vértices
  const pentCol = new Float32Array(pentPos.length);

  const mkPoints = (pos: Float32Array, col: Float32Array, mat: PointsMaterial) => {
    const geo = track(new BufferGeometry());
    geo.setAttribute("position", new BufferAttribute(pos, 3));
    geo.setAttribute("color", new BufferAttribute(col, 3));
    const pts = new Points(geo, mat);
    pts.frustumCulled = false;
    virus.add(pts);
    return geo;
  };
  const capGeo = mkPoints(capPos, capCol, matCapsid);
  const pentGeo = mkPoints(pentPos, pentCol, matPenton);

  // Aristas del icosaedro, muy tenues, para marcar la forma
  const edgeMat = track(
    new LineBasicMaterial({ color: props.capsidColor, transparent: true, opacity: 0.22 })
  );
  virus.add(new LineSegments(track(new EdgesGeometry(ico)), edgeMat));

  // ---------- Fibras: una por vértice, con botón en la punta ----------
  const FIBERS = pentPos.length / 3; // 12
  const dirs = new Float32Array(FIBERS * 3);
  const t1 = new Float32Array(FIBERS * 3);
  const t2 = new Float32Array(FIBERS * 3);
  const phase = new Float32Array(FIBERS);
  for (let f = 0; f < FIBERS; f++) {
    const x = pentPos[f * 3] / R, y = pentPos[f * 3 + 1] / R, z = pentPos[f * 3 + 2] / R;
    dirs.set([x, y, z], f * 3);
    // base ortonormal para el vaivén lateral de la fibra
    const [ax, ay, az] = Math.abs(y) < 0.9 ? [0, 1, 0] : [1, 0, 0];
    let ux = y * az - z * ay, uy = z * ax - x * az, uz = x * ay - y * ax;
    const ul = Math.hypot(ux, uy, uz) || 1;
    ux /= ul; uy /= ul; uz /= ul;
    t1.set([ux, uy, uz], f * 3);
    t2.set([y * uz - z * uy, z * ux - x * uz, x * uy - y * ux], f * 3);
    phase[f] = Math.random() * Math.PI * 2;
  }

  const fiberPos = new Float32Array(FIBERS * 4 * 3); // [base, medio, medio, punta]
  const fiberCol = new Float32Array(fiberPos.length);
  const fiberGeo = track(new BufferGeometry());
  fiberGeo.setAttribute("position", new BufferAttribute(fiberPos, 3));
  fiberGeo.setAttribute("color", new BufferAttribute(fiberCol, 3));
  const fiberMat = track(new LineBasicMaterial({ vertexColors: true }));
  const fibers = new LineSegments(fiberGeo, fiberMat);
  fibers.frustumCulled = false;
  virus.add(fibers);

  const knobPos = new Float32Array(FIBERS * 3);
  const knobCol = new Float32Array(knobPos.length);
  const knobGeo = mkPoints(knobPos, knobCol, matKnob);

  const cCapsid = new Color(props.capsidColor);
  const cFiber = new Color(props.fiberColor);
  const cKnob = new Color(props.knobColor);

  // Oscurece lo que está al fondo y aclara lo que está al frente
  function shade(pos: Float32Array, base: Color, out: Float32Array, e: number[]) {
    for (let i = 0; i < pos.length; i += 3) {
      const z = e[2] * pos[i] + e[6] * pos[i + 1] + e[10] * pos[i + 2];
      const t = 0.4 + 0.6 * Math.max(0, Math.min(1, (z / (R + FL)) * 0.5 + 0.5));
      out[i] = base.r * t;
      out[i + 1] = base.g * t;
      out[i + 2] = base.b * t;
    }
  }

  // ---------- Estado del movimiento ----------
  let x = 0, y = 0, vx = 1, vy = 1;
  let wx = 0.4, wy = 0.6, wz = 0.2;
  let halfW = 300, halfH = 200, xmax = 100, ymax = 100;
  let time = 0;
  let placed = false;
  let k = props.scale; // escala efectiva (se reduce sola en contenedores pequeños)

  // Dirección inicial: diagonal aleatoria
  {
    const a = Math.PI / 4 + (Math.floor(Math.random() * 4) * Math.PI) / 2 + (Math.random() - 0.5) * 0.5;
    vx = Math.cos(a);
    vy = Math.sin(a);
    wx *= Math.random() < 0.5 ? -1 : 1;
    wy *= Math.random() < 0.5 ? -1 : 1;
    wz *= Math.random() < 0.5 ? -1 : 1;
    virus.rotation.set(Math.random() * 6, Math.random() * 6, Math.random() * 6);
  }

  function step(dt: number) {
    time += dt;
    const sp = props.speed / k; // unidades del mundo por segundo

    // La trayectoria curva suavemente (no solo rebotes rectos)
    const da = Math.sin(time * 0.35) * props.wander * dt;
    const cs = Math.cos(da), sn = Math.sin(da);
    const nvx = vx * cs - vy * sn;
    const nvy = vx * sn + vy * cs;
    const m = Math.hypot(nvx, nvy) || 1;
    vx = nvx / m;
    vy = nvy / m;

    x += vx * sp * dt;
    y += vy * sp * dt;

    // Rebote en los cuatro bordes
    if (x > xmax) { x = xmax; vx = -Math.abs(vx); }
    else if (x < -xmax) { x = -xmax; vx = Math.abs(vx); }
    if (y > ymax) { y = ymax; vy = -Math.abs(vy); }
    else if (y < -ymax) { y = -ymax; vy = Math.abs(vy); }

    virus.position.set(x, y, 0);
    virus.rotation.x += wx * dt;
    virus.rotation.y += wy * dt;
    virus.rotation.z += wz * dt;
    virus.updateMatrix();

    // Fibras: vaivén lateral y ligera respiración en el largo
    for (let f = 0; f < FIBERS; f++) {
      const j = f * 3;
      const ph = phase[f];
      const a = Math.sin(time * 1.6 + ph) * 3.5;
      const b = Math.cos(time * 1.3 + ph * 1.7) * 3.5;
      const len = FL * (1 + 0.05 * Math.sin(time * 2 + ph));
      const lx = t1[j] * a + t2[j] * b;
      const ly = t1[j + 1] * a + t2[j + 1] * b;
      const lz = t1[j + 2] * a + t2[j + 2] * b;
      const dx = dirs[j], dy = dirs[j + 1], dz = dirs[j + 2];

      const bx = dx * R, by = dy * R, bz = dz * R;
      const mx = dx * (R + len * 0.5) + lx * 0.35;
      const my = dy * (R + len * 0.5) + ly * 0.35;
      const mz = dz * (R + len * 0.5) + lz * 0.35;
      const kx = dx * (R + len) + lx;
      const ky = dy * (R + len) + ly;
      const kz = dz * (R + len) + lz;

      fiberPos.set([bx, by, bz, mx, my, mz, mx, my, mz, kx, ky, kz], f * 12);
      knobPos.set([kx, ky, kz], j);
    }

    const e = virus.matrix.elements;
    shade(capPos, cCapsid, capCol, e);
    shade(pentPos, cCapsid, pentCol, e);
    shade(fiberPos, cFiber, fiberCol, e);
    shade(knobPos, cKnob, knobCol, e);

    fiberGeo.attributes.position.needsUpdate = true;
    fiberGeo.attributes.color.needsUpdate = true;
    knobGeo.attributes.position.needsUpdate = true;
    knobGeo.attributes.color.needsUpdate = true;
    capGeo.attributes.color.needsUpdate = true;
    pentGeo.attributes.color.needsUpdate = true;
  }

  // ---------- Tamaño ----------
  function resize() {
    const w = rootEl.clientWidth || 300;
    const H = rootEl.clientHeight || 300;
    // Si el contenedor es pequeño (celular), el virus se encoge para poder moverse siempre
    const kFit = Math.min(w, H) / (EXTENT * 2 * 1.8);
    k = Math.max(0.35, Math.min(props.scale, kFit));
    renderer.setSize(w, H, false);

    halfW = w / (2 * k);
    halfH = H / (2 * k);
    camera.left = -halfW;
    camera.right = halfW;
    camera.top = halfH;
    camera.bottom = -halfH;
    camera.updateProjectionMatrix();

    const mg = props.margin / k;
    xmax = Math.max(0, halfW - EXTENT - mg);
    ymax = Math.max(0, halfH - EXTENT - mg);

    if (!placed) {
      // posición inicial aleatoria dentro de los límites
      x = (Math.random() * 2 - 1) * xmax;
      y = (Math.random() * 2 - 1) * ymax;
      placed = true;
    }
    x = Math.max(-xmax, Math.min(xmax, x));
    y = Math.max(-ymax, Math.min(ymax, y));

    sizes.forEach(([mat, base]) => (mat.size = base * k));

    if (reduced) {
      step(0);
      renderer.render(scene, camera);
    }
  }

  const ro = new ResizeObserver(resize);
  ro.observe(rootEl);
  resize();

  // Solo anima cuando es visible
  let visible = true;
  const io = new IntersectionObserver(([en]) => (visible = en.isIntersecting));
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
  <div ref="root" class="adeno-layer" aria-hidden="true">
    <canvas ref="canvas" class="adeno-canvas" />
  </div>
</template>

<style>
.adeno-layer {
  position: absolute;
  inset: 0;
  overflow: hidden;
  pointer-events: none; /* no bloquea clics ni texto */
  z-index: -5;
}
.adeno-canvas {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  display: block;
}
</style>