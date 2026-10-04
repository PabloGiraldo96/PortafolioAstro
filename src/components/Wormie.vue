<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from "vue";
import {
  BufferAttribute,
  BufferGeometry,
  CanvasTexture,
  Color,
  DynamicDrawUsage,
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
 *  Wormie: gusano rectangular (cinta con peldaños) que reptan por una
 *  trayectoria cosenoidal. Sale de un agujero en un punto aleatorio de
 *  la página, avanza y se sumerge en otro agujero. Luego repite.
 *  Uso:  <Wormie client:visible />  dentro de un elemento `relative`.
 * ------------------------------------------------------------------ */

const props = withDefaults(
  defineProps<{
    scale?: number; // tamaño general
    speed?: number; // velocidad en px/s
    margin?: number; // margen a los bordes en px
    length?: number; // largo del gusano (unidades del mundo)
    width?: number; // ancho del gusano
    amplitude?: number; // amplitud de la onda cosenoidal del recorrido
    wavelength?: number; // longitud de onda del recorrido
    respectReducedMotion?: boolean; // true = se queda quieto si el sistema tiene "reducir movimiento"
    tailColor?: string; // color de la cola
    headColor?: string; // color de la cabeza
  }>(),
  {
    scale: 1.5,
    speed: 90,
    margin: 20,
    length: 170,
    width: 14,
    amplitude: 16,
    wavelength: 130,
    respectReducedMotion: false,
    tailColor: "#F7FF9F", 
    headColor: "#000000",
  }
);

const root = ref<HTMLDivElement>();
const canvas = ref<HTMLCanvasElement>();

const N = 56; // muestras a lo largo del cuerpo (más = más suave)
const FADE = 28; // distancia en la que el cuerpo se afina al entrar/salir del agujero
const RING_SEGS = 24;
const PERISTALSIS = 55; // longitud de onda de la ondulación del grosor

let cleanup = () => {};

onMounted(() => {
  const rootEl = root.value!;
  const canvasEl = canvas.value!;
  // Por defecto NO se congela con "reducir movimiento" (en muchos celulares está activo
  // por ahorro de batería). Pon respectReducedMotion si prefieres respetarlo.
  const reduced =
    props.respectReducedMotion &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const renderer = new WebGLRenderer({ canvas: canvasEl, alpha: true, antialias: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setClearColor(0x000000, 0);

  const scene = new Scene();
  const camera = new OrthographicCamera(-1, 1, 1, -1, -2000, 2000);
  camera.position.set(0, 0, 600);

  const disposables: { dispose(): void }[] = [];
  const track = <T extends { dispose(): void }>(o: T) => (disposables.push(o), o);

  // ---------- Geometría del cuerpo ----------
  // Cada muestra i tiene 2 vértices: borde izquierdo (2i) y borde derecho (2i+1).
  // Se dibujan los dos bordes + peldaños transversales => estructura rectangular.
  const posArr = new Float32Array(N * 2 * 3);
  const colArr = new Float32Array(N * 2 * 3);
  const posAttr = new BufferAttribute(posArr, 3);
  const colAttr = new BufferAttribute(colArr, 3);
  posAttr.setUsage(DynamicDrawUsage);
  colAttr.setUsage(DynamicDrawUsage);

  const idxArr = new Uint16Array(N * 6);
  const idxAttr = new BufferAttribute(idxArr, 1);
  idxAttr.setUsage(DynamicDrawUsage);

  const lineGeo = track(new BufferGeometry());
  lineGeo.setAttribute("position", posAttr);
  lineGeo.setAttribute("color", colAttr);
  lineGeo.setIndex(idxAttr);
  lineGeo.setDrawRange(0, 0);
  const lineMat = track(new LineBasicMaterial({ vertexColors: true }));
  const body = new LineSegments(lineGeo, lineMat);
  body.frustumCulled = false;
  scene.add(body);

  // Puntos esféricos en los extremos de cada peldaño (comparte los mismos buffers)
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

  const ptsGeo = track(new BufferGeometry());
  ptsGeo.setAttribute("position", posAttr);
  ptsGeo.setAttribute("color", colAttr);
  ptsGeo.setDrawRange(0, 0);
  const ptsMat = track(
    new PointsMaterial({
      size: 5,
      map: sphereTex,
      alphaTest: 0.5,
      sizeAttenuation: false,
      vertexColors: true,
    })
  );
  const pts = new Points(ptsGeo, ptsMat);
  pts.frustumCulled = false;
  scene.add(pts);

  // Agujeros: dos anillos elípticos (salida y entrada) que se abren y cierran
  const ringArr = new Float32Array(2 * RING_SEGS * 2 * 3);
  const ringAttr = new BufferAttribute(ringArr, 3);
  ringAttr.setUsage(DynamicDrawUsage);
  const ringGeo = track(new BufferGeometry());
  ringGeo.setAttribute("position", ringAttr);
  const ringMat = track(
    new LineBasicMaterial({ color: props.tailColor, transparent: true, opacity: 0.9 })
  );
  const rings = new LineSegments(ringGeo, ringMat);
  rings.frustumCulled = false;
  scene.add(rings);

  function setRing(idx: number, cx: number, cy: number, r: number) {
    for (let j = 0; j < RING_SEGS; j++) {
      const a0 = (j / RING_SEGS) * Math.PI * 2;
      const a1 = ((j + 1) / RING_SEGS) * Math.PI * 2;
      ringArr.set(
        [
          cx + Math.cos(a0) * r, cy + Math.sin(a0) * r * 0.25, 0,
          cx + Math.cos(a1) * r, cy + Math.sin(a1) * r * 0.25, 0,
        ],
        (idx * RING_SEGS + j) * 6
      );
    }
  }

  const cTail = new Color(props.tailColor);
  const cHead = new Color(props.headColor);
  const tmp = new Color();

  // ---------- Estado: la trayectoria actual ----------
  let k = props.scale; // escala efectiva (se reduce sola en contenedores pequeños)
  let halfW = 300, halfH = 200;
  let ax = 0, ay = 0; // punto de salida (agujero A)
  let dx = 2, dy = 0, nx = 0, ny = 1; // dirección A->B y su normal
  let D = 900; // distancia entre A y B
  let phi = 3.14; // fase de la onda cosenoidal
  let sH = 3; // posición de la cabeza a lo largo del recorrido
  let time = 0;
  let placed = false;

  const smooth = (t: number) => t * t * (3 - 2 * t);
  const clamp01 = (t: number) => Math.max(0, Math.min(1, t));

  // Punto de la trayectoria a distancia s de A: recta A->B + onda cosenoidal.
  // La onda se anula en los agujeros para que el gusano salga y entre exactamente en ellos.
  let px = 0, py = 0;
  function posAt(s: number) {
    const e = smooth(clamp01(Math.min(s, D - s) / 30));
    const off = props.amplitude * Math.cos(((Math.PI * 2) / props.wavelength) * s + phi) * e;
    px = ax + dx * s + nx * off;
    py = ay + dy * s + ny * off;
  }

  // Elige dos puntos aleatorios de la página: por uno sale, por el otro se sumerge
  function newPath() {
    const pad = props.margin / k + props.amplitude + props.width;
    const mx = Math.max(10, halfW - pad);
    const my = Math.max(10, halfH - pad);
    const minD = Math.max(120, Math.min(mx, my) * 1.2);

    let best = { x0: 0, y0: 0, x1: 0, y1: 0, d: 0 };
    for (let t = 0; t < 12; t++) {
      const x0 = (Math.random() * 2 - 1) * mx;
      const y0 = (Math.random() * 2 - 1) * my;
      const x1 = (Math.random() * 2 - 1) * mx;
      const y1 = (Math.random() * 2 - 1) * my;
      const d = Math.hypot(x1 - x0, y1 - y0);
      if (d > best.d) best = { x0, y0, x1, y1, d };
      if (d >= minD) break;
    }
    D = Math.max(60, best.d);
    ax = best.x0;
    ay = best.y0;
    dx = (best.x1 - best.x0) / (best.d || 1);
    dy = (best.y1 - best.y0) / (best.d || 1);
    nx = -dy;
    ny = dx;
    phi = Math.random() * Math.PI * 2;

    // Pausa aleatoria antes de volver a salir
    const wait = 0.3 + Math.random() * 1.1;
    sH = reduced ? (D + props.length) / 2 : -(props.speed / k) * wait;
  }

  function step(dt: number) {
    time += dt;
    const L = props.length;
    const W = props.width;
    const sw = props.speed / k;

    // Avanza con un pulso (como un gusano que se contrae y se estira)
    sH += sw * (1 + 0.35 * Math.cos(time * 4.5)) * dt;
    if (sH - L > D + FADE) newPath();

    let i0 = -1, i1 = -1;
    for (let i = 0; i < N; i++) {
      const l = i / (N - 1); // 0 = cola, 1 = cabeza
      const s = sH - L * (1 - l); // posición de esta muestra en el recorrido
      if (s >= 0 && s <= D) {
        if (i0 < 0) i0 = i;
        i1 = i;
      }

      // El cuerpo se afina hasta cero en los agujeros: así "se hunde" en la página
      const taper = smooth(clamp01(Math.max(0, Math.min(s, D - s)) / FADE));
      const hw = (W / 2) * taper * (1 + 0.22 * Math.cos(((Math.PI * 2) / PERISTALSIS) * (l * L) - time * 6));

      const sc = Math.max(0, Math.min(D, s));
      posAt(sc - 0.5);
      const x0 = px, y0 = py;
      posAt(sc + 0.5);
      let tx = px - x0, ty = py - y0;
      const tl = Math.hypot(tx, ty) || 1;
      tx /= tl;
      ty /= tl;
      posAt(sc);
      const cx = px, cy = py;
      const wx = -ty * hw, wy = tx * hw; // normal del cuerpo * medio ancho

      const p = i * 6;
      posArr[p] = cx + wx;
      posArr[p + 1] = cy + wy;
      posArr[p + 2] = 0;
      posArr[p + 3] = cx - wx;
      posArr[p + 4] = cy - wy;
      posArr[p + 5] = 0;

      tmp.copy(cTail).lerp(cHead, l);
      const shade = 0.6 + 0.4 * l;
      colArr[p] = colArr[p + 3] = tmp.r * shade;
      colArr[p + 1] = colArr[p + 4] = tmp.g * shade;
      colArr[p + 2] = colArr[p + 5] = tmp.b * shade;
    }

    // Índices: solo las muestras visibles (la parte que ya salió y aún no se hunde)
    let n = 0;
    if (i0 >= 0 && i1 > i0) {
      for (let i = i0; i < i1; i++) {
        idxArr[n++] = 2 * i; // borde izquierdo
        idxArr[n++] = 2 * i + 2;
        idxArr[n++] = 2 * i + 1; // borde derecho
        idxArr[n++] = 2 * i + 3;
      }
      for (let i = i0; i <= i1; i++) {
        if ((i - i0) % 2 === 0 || i === i1) {
          idxArr[n++] = 2 * i; // peldaño transversal
          idxArr[n++] = 2 * i + 1;
        }
      }
      ptsGeo.setDrawRange(2 * i0, 2 * (i1 - i0 + 1));
    } else {
      ptsGeo.setDrawRange(0, 0);
    }
    lineGeo.setDrawRange(0, n);
    idxAttr.needsUpdate = true;
    posAttr.needsUpdate = true;
    colAttr.needsUpdate = true;

    // Agujeros: el de salida se abre al emerger y se cierra cuando sale la cola;
    // el de entrada se abre al acercarse la cabeza y se cierra cuando entra la cola.
    const R0 = (W * 0.9 + 4) * (1 + 0.08 * Math.sin(time * 6));
    const rA = smooth(clamp01((sH + 60) / 60)) * (1 - smooth(clamp01((sH - L) / FADE)));
    const rB =
      smooth(clamp01((sH - (D - 60)) / 60)) * (1 - smooth(clamp01((sH - L - D) / FADE)));
    setRing(0, ax, ay, R0 * rA);
    setRing(1, ax + dx * D, ay + dy * D, R0 * rB);
    ringAttr.needsUpdate = true;
  }

  // ---------- Tamaño ----------
  function resize() {
    const w = rootEl.clientWidth || 300;
    const H = rootEl.clientHeight || 300;

    // En contenedores pequeños el gusano se encoge para que siempre tenga espacio
    const kFit = Math.min(w, H) / (props.length + 80);
    k = Math.max(0.4, Math.min(props.scale, kFit));
    renderer.setSize(w, H, false);

    halfW = w / (2 * k);
    halfH = H / (2 * k);
    camera.left = -halfW;
    camera.right = halfW;
    camera.top = halfH;
    camera.bottom = -halfH;
    camera.updateProjectionMatrix();
    ptsMat.size = 5 * k;

    // Si el recorrido actual quedó fuera de la página, se elige otro
    const bx = ax + dx * D, by = ay + dy * D;
    const out =
      Math.abs(ax) > halfW || Math.abs(ay) > halfH || Math.abs(bx) > halfW || Math.abs(by) > halfH;
    if (!placed || out) {
      newPath();
      placed = true;
    }

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
  <div ref="root" class="wormie-layer" aria-hidden="true">
    <canvas ref="canvas" class="wormie-canvas" />
  </div>
</template>

<style>
.wormie-layer {
  position: absolute;
  inset: 0;
  overflow: hidden;
  pointer-events: none; /* no bloquea clics ni texto */
  z-index: -5;
}
.wormie-canvas {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  display: block;
}
</style>