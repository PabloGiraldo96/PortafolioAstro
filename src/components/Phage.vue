<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from "vue";
import {
  BufferAttribute,
  BufferGeometry,
  CanvasTexture,
  Color,
  DynamicDrawUsage,
  Group,
  LineBasicMaterial,
  LineSegments,
  Mesh,
  MeshBasicMaterial,
  OrthographicCamera,
  PlaneGeometry,
  Points,
  PointsMaterial,
  SRGBColorSpace,
  Scene,
  WebGLRenderer,
} from "three";

/* ------------------------------------------------------------------ *
 *  Phage (vista cenital): cuerpo rectangular rosa con un punto naranja,
 *  10 patas largas de 3 segmentos con articulaciones azules y una
 *  antena naranja. Deambula por TODO el contenedor y camina de verdad:
 *  cada pie se clava en el suelo y da un paso cuando se queda atrás.
 *  Uso:  <Phage client:visible />  dentro de un elemento `relative`.
 * ------------------------------------------------------------------ */

const props = withDefaults(
  defineProps<{
    scale?: number; // tamaño general (1 = cuerpo de 70px)
    speed?: number; // velocidad en px/s
    margin?: number; // margen a los bordes en px
    respectReducedMotion?: boolean; // true = se queda quieto si el sistema tiene "reducir movimiento"
    bodyColor?: string; // borde del cuerpo
    fillColor?: string; // relleno del cuerpo
    legColor?: string; // patas y articulaciones
    dotColor?: string; // punto y antena
  }>(),
  {
    scale: 1,
    speed: 55,
    margin: 10,
    respectReducedMotion: false,
    bodyColor: "#ff4694",
    fillColor: "#06030a",
    legColor: "#4a46ff",
    dotColor: "#ffa21a",
  }
);

const root = ref<HTMLDivElement>();
const canvas = ref<HTMLCanvasElement>();

// ---- Dimensiones (unidades del mundo) ----
const BODY_L = 64; // largo del cuerpo
const BODY_W = 4; // ancho del cuerpo
const PER_SIDE = 3; // patas por lado (10 en total)
const L1 = 24, L2 = 56, L3 = 34; // los 3 segmentos de cada pata
const LT = L1 + L2 + L3;
const R_HOME = 60; // distancia a la que cada pie "quiere" apoyarse
const STEP_DIST = 30; // si el pie se queda más atrás que esto, da un paso
const SWING = 0.22; // duración de un paso (s)
const ANT_LEN = 35; // largo de la antena
const LEG_PX = 1.6; // espaciado de las líneas paralelas que simulan grosor (px)

type Leg = {
  hu: number; hv: number; // cadera en el marco del cuerpo
  hxl: number; hyl: number; // pie "casa" en el marco del cuerpo
  group: number; // grupo de marcha (alternan)
  zig: number; // sentido del zigzag
};
const legsDef: Leg[] = [];
for (const side of [1, -1]) {
  for (let j = 0; j < PER_SIDE; j++) {
    const u = (j - (PER_SIDE - 1) / 2) / ((PER_SIDE - 1) / 2); // -1 (atrás) .. 1 (adelante)
    const hu = u * BODY_L * 0.38;
    const hv = side * (BODY_W / 2);
    const a = side * (Math.PI / 2 - u * 0.6); // las patas delanteras se inclinan hacia adelante
    legsDef.push({
      hu,
      hv,
      hxl: hu + R_HOME * Math.cos(a),
      hyl: hv + R_HOME * Math.sin(a),
      group: (j + (side > 0 ? 0 : 1)) % 2,
      zig: -side,
    });
  }
}
const LEGS = legsDef.length;

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

  // Textura de punto redondo
  const c = document.createElement("canvas");
  c.width = c.height = 64;
  const g = c.getContext("2d")!;
  const gr = g.createRadialGradient(26, 24, 4, 32, 32, 30);
  gr.addColorStop(0, "#ffffff");
  gr.addColorStop(1, "#b5b5b5");
  g.fillStyle = gr;
  g.beginPath();
  g.arc(32, 32, 30, 0, Math.PI * 2);
  g.fill();
  const dotTex = track(new CanvasTexture(c));
  dotTex.colorSpace = SRGBColorSpace;

  const pointMat = (size: number) =>
    track(
      new PointsMaterial({
        size,
        map: dotTex,
        alphaTest: 0.5,
        sizeAttenuation: false,
        vertexColors: true,
        depthTest: false,
      })
    );

  // ---------- Patas: 3 segmentos x 3 líneas paralelas (grosor) por pata ----------
  const legArr = new Float32Array(LEGS * 3 * 3 * 2 * 3);
  const legGeo = track(new BufferGeometry());
  legGeo.setAttribute("position", new BufferAttribute(legArr, 3));
 
  const legMat = track(new LineBasicMaterial({ color: props.legColor, depthTest: false }));
  const legLines = new LineSegments(legGeo, legMat);
  legLines.frustumCulled = false;
  legLines.renderOrder = 0;
  scene.add(legLines);

  // Articulaciones y pies: 3 puntos por pata (rodilla 1, rodilla 2, pie)
  const jointArr = new Float32Array(LEGS * 3 * 3);
  const jointCol = new Float32Array(LEGS * 3 * 3);
  const jointGeo = track(new BufferGeometry());
  jointGeo.setAttribute("position", new BufferAttribute(jointArr, 3));
  jointGeo.setAttribute("color", new BufferAttribute(jointCol, 3));
  const jointMat = pointMat(8);
  const joints = new Points(jointGeo, jointMat);
  joints.frustumCulled = false;
  joints.renderOrder = 1;
  scene.add(joints);

  const cLeg = new Color(props.legColor);
  const cLegLift = new Color(props.legColor).lerp(new Color("#ffffff"), 0.55); // pie en el aire

  // ---------- Cuerpo (grupo que se mueve y rota) ----------
  const bodyGroup = new Group();
  scene.add(bodyGroup);

  const planeGeo = track(new PlaneGeometry(BODY_L, BODY_W));
  const outer = new Mesh(
    planeGeo,
    track(new MeshBasicMaterial({ color: props.bodyColor, depthTest: false }))
  );
  outer.renderOrder = 2;
  bodyGroup.add(outer);
  const inner = new Mesh(
    planeGeo,
    track(new MeshBasicMaterial({ color: props.fillColor, depthTest: false }))
  );
  inner.renderOrder = 3;
  bodyGroup.add(inner);

  // Punto naranja (cerca de la cabeza)
  const dotArr = new Float32Array([BODY_L * 0.3, 0, 0]);
  const dotColArr = new Float32Array([1, 1, 1]);
  const dotGeo = track(new BufferGeometry());
  dotGeo.setAttribute("position", new BufferAttribute(dotArr, 3));
  dotGeo.setAttribute("color", new BufferAttribute(dotColArr, 3));
  const dotColor = new Color(props.dotColor);
  dotColArr.set([dotColor.r, dotColor.g, dotColor.b]);
  const dotMat = pointMat(11);
  const dot = new Points(dotGeo, dotMat);
  dot.renderOrder = 5;
  bodyGroup.add(dot);

  // Antena naranja: sale del punto hacia adelante, 2 segmentos x 3 líneas paralelas
  const antArr = new Float32Array(2 * 3 * 2 * 3);
  const antGeo = track(new BufferGeometry());
  antGeo.setAttribute("position", new BufferAttribute(antArr, 3));
  const ant = new LineSegments(
    antGeo,
    track(new LineBasicMaterial({ color: props.dotColor, depthTest: false }))
  );
  ant.frustumCulled = false;
  ant.renderOrder = 4;
  bodyGroup.add(ant);

  // ---------- Estado ----------
  let k = props.scale; // escala efectiva (se reduce sola en contenedores pequeños)
  let halfW = 300, halfH = 200;
  let bx = 0, by = 0, theta = 0; // posición y orientación del cuerpo
  let tgx = 0, tgy = 0; // destino actual (deambula entre puntos aleatorios)
  let time = 0;
  let placed = false;
  let speedNow = 0;

  // Estado de cada pie
  const footX = new Float64Array(LEGS), footY = new Float64Array(LEGS);
  const swingOn = new Uint8Array(LEGS);
  const sx = new Float64Array(LEGS), sy = new Float64Array(LEGS);
  const tx = new Float64Array(LEGS), ty = new Float64Array(LEGS);
  const st = new Float64Array(LEGS);

  const smooth = (t: number) => t * t * (3 - 2 * t);
  const wrap = (a: number) => ((((a + Math.PI) % (Math.PI * 2)) + Math.PI * 2) % (Math.PI * 2)) - Math.PI;

  function bounds() {
    const pad = props.margin / k + 36;
    return [Math.max(0, halfW - pad), Math.max(0, halfH - pad)];
  }

  function pickTarget() {
    const [mx, my] = bounds();
    const minD = Math.max(80, Math.min(mx, my) * 0.9);
    for (let i = 0; i < 8; i++) {
      tgx = (Math.random() * 2 - 1) * mx;
      tgy = (Math.random() * 2 - 1) * my;
      if (Math.hypot(tgx - bx, tgy - by) >= minD) break;
    }
  }

  // Pie "casa" de la pata i en coordenadas del mundo
  function worldX(u: number, v: number, c: number, s: number) { return bx + u * c - v * s; }
  function worldY(u: number, v: number, c: number, s: number) { return by + u * s + v * c; }

  function placeAll() {
    const [mx, my] = bounds();
    bx = (Math.random() * 2 - 1) * mx;
    by = (Math.random() * 2 - 1) * my;
    theta = Math.random() * Math.PI * 2;
    pickTarget();
    const c = Math.cos(theta), s = Math.sin(theta);
    for (let i = 0; i < LEGS; i++) {
      footX[i] = worldX(legsDef[i].hxl, legsDef[i].hyl, c, s);
      footY[i] = worldY(legsDef[i].hxl, legsDef[i].hyl, c, s);
      swingOn[i] = 0;
    }
  }

  // IK de 3 segmentos (FABRIK) partiendo de un zigzag, para que quede estable
  const PX = new Float64Array(4), PY = new Float64Array(4);
  let rx = 0, ry = 0;
  function place(ax: number, ay: number, bxp: number, byp: number, len: number) {
    // punto a distancia `len` de (ax,ay) en dirección a (bxp,byp)
    const dx = bxp - ax, dy = byp - ay;
    const d = Math.hypot(dx, dy) || 1e-6;
    rx = ax + (dx / d) * len;
    ry = ay + (dy / d) * len;
  }
  function solveLeg(hx: number, hy: number, fx: number, fy: number, zig: number) {
    const dx = fx - hx, dy = fy - hy;
    const d = Math.hypot(dx, dy) || 1e-6;
    const ux = dx / d, uy = dy / d, nx = -uy, ny = ux;
    PX[0] = hx; PY[0] = hy;
    if (d >= LT - 0.01) {
      PX[1] = hx + ux * L1; PY[1] = hy + uy * L1;
      PX[2] = hx + ux * (L1 + L2); PY[2] = hy + uy * (L1 + L2);
      PX[3] = hx + ux * LT; PY[3] = hy + uy * LT;
      return;
    }
    const z = (LT - d) * 0.5 + 3;
    PX[1] = hx + ux * d * 0.3 + nx * z * zig;
    PY[1] = hy + uy * d * 0.3 + ny * z * zig;
    PX[2] = hx + ux * d * 0.7 - nx * z * zig * 0.8;
    PY[2] = hy + uy * d * 0.7 - ny * z * zig * 0.8;
    PX[3] = fx; PY[3] = fy;
    for (let it = 0; it < 6; it++) {
      // hacia atrás: desde el pie
      PX[3] = fx; PY[3] = fy;
      place(PX[3], PY[3], PX[2], PY[2], L3); PX[2] = rx; PY[2] = ry;
      place(PX[2], PY[2], PX[1], PY[1], L2); PX[1] = rx; PY[1] = ry;
      place(PX[1], PY[1], PX[0], PY[0], L1); PX[0] = rx; PY[0] = ry;
      // hacia adelante: desde la cadera
      PX[0] = hx; PY[0] = hy;
      place(PX[0], PY[0], PX[1], PY[1], L1); PX[1] = rx; PY[1] = ry;
      place(PX[1], PY[1], PX[2], PY[2], L2); PX[2] = rx; PY[2] = ry;
      place(PX[2], PY[2], PX[3], PY[3], L3); PX[3] = rx; PY[3] = ry;
    }
  }

  // 3 líneas paralelas por segmento (simulan grosor, WebGL solo dibuja 1px)
  function writeSeg(arr: Float32Array, o: number, ax: number, ay: number, bxp: number, byp: number, th: number) {
    const dx = bxp - ax, dy = byp - ay;
    const l = Math.hypot(dx, dy) || 1;
    const nx = -dy / l, ny = dx / l;
    for (let q = -1; q <= 1; q++) {
      const off = q * th;
      arr[o++] = ax + nx * off; arr[o++] = ay + ny * off; arr[o++] = 0;
      arr[o++] = bxp + nx * off; arr[o++] = byp + ny * off; arr[o++] = 0;
    }
    return o;
  }

  function step(dt: number) {
    time += dt;
    const sw = props.speed / k;

    // --- Deambular: gira hacia el destino y avanza (más lento si el giro es cerrado) ---
    const desired = Math.atan2(tgy - by, tgx - bx);
    const err = wrap(desired - theta);
    const maxTurn = 2.2 * dt;
    theta += Math.max(-maxTurn, Math.min(maxTurn, err));
    speedNow = sw * (0.35 + 0.65 * Math.max(0, Math.cos(err)));
    bx += Math.cos(theta) * speedNow * dt;
    by += Math.sin(theta) * speedNow * dt;
    const [mx, my] = bounds();
    bx = Math.max(-mx, Math.min(mx, bx));
    by = Math.max(-my, Math.min(my, by));
    if (Math.hypot(tgx - bx, tgy - by) < 28) pickTarget();

    const c = Math.cos(theta), s = Math.sin(theta);
    const th = (LEG_PX / 2) / k;

    // --- Marcha: un pie da un paso cuando se queda atrás (grupos alternados) ---
    const cnt = [0, 0];
    for (let i = 0; i < LEGS; i++) if (swingOn[i]) cnt[legsDef[i].group]++;

    let lo = 0;
    for (let i = 0; i < LEGS; i++) {
      const leg = legsDef[i];
      const hx = worldX(leg.hu, leg.hv, c, s);
      const hy = worldY(leg.hu, leg.hv, c, s);
      const homeX = worldX(leg.hxl, leg.hyl, c, s);
      const homeY = worldY(leg.hxl, leg.hyl, c, s);

      if (swingOn[i]) {
        st[i] += dt / SWING;
        if (st[i] >= 1) {
          swingOn[i] = 0;
          cnt[leg.group]--;
          footX[i] = tx[i];
          footY[i] = ty[i];
        } else {
          const e = smooth(st[i]);
          footX[i] = sx[i] + (tx[i] - sx[i]) * e;
          footY[i] = sy[i] + (ty[i] - sy[i]) * e;
        }
      } else {
        const dist = Math.hypot(footX[i] - homeX, footY[i] - homeY);
        const dHip = Math.hypot(footX[i] - hx, footY[i] - hy);
        const hard = dHip > LT * 0.97; // a punto de no alcanzar: paso obligatorio
        if ((dist > STEP_DIST && cnt[1 - leg.group] === 0) || hard) {
          // destino: un poco por delante del pie "casa", en el sentido de avance
          const lead = STEP_DIST * 1.1 * Math.min(1, speedNow / (sw || 1));
          let ttx = homeX + Math.cos(theta) * lead;
          let tty = homeY + Math.sin(theta) * lead;
          const dh = Math.hypot(ttx - hx, tty - hy);
          if (dh > LT * 0.92) {
            ttx = hx + ((ttx - hx) / dh) * LT * 0.92;
            tty = hy + ((tty - hy) / dh) * LT * 0.92;
          }
          swingOn[i] = 1;
          st[i] = 0;
          sx[i] = footX[i]; sy[i] = footY[i];
          tx[i] = ttx; ty[i] = tty;
          cnt[leg.group]++;
        }
      }

      solveLeg(hx, hy, footX[i], footY[i], leg.zig);
      lo = writeSeg(legArr, lo, PX[0], PY[0], PX[1], PY[1], th);
      lo = writeSeg(legArr, lo, PX[1], PY[1], PX[2], PY[2], th);
      lo = writeSeg(legArr, lo, PX[2], PY[2], PX[3], PY[3], th);

      const j = i * 9;
      jointArr[j] = PX[1]; jointArr[j + 1] = PY[1]; jointArr[j + 2] = 0;
      jointArr[j + 3] = PX[2]; jointArr[j + 4] = PY[2]; jointArr[j + 5] = 0;
      jointArr[j + 6] = PX[3]; jointArr[j + 7] = PY[3]; jointArr[j + 8] = 0;
      const fc = swingOn[i] ? cLegLift : cLeg;
      jointCol.set([cLeg.r, cLeg.g, cLeg.b, cLeg.r, cLeg.g, cLeg.b, fc.r, fc.g, fc.b], j);
    }
    legGeo.attributes.position.needsUpdate = true;
    jointGeo.attributes.position.needsUpdate = true;
    jointGeo.attributes.color.needsUpdate = true;

    // --- Cuerpo y antena ---
    bodyGroup.position.set(bx, by, 0);
    bodyGroup.rotation.z = theta;

    const a0x = BODY_L * 0.3;
    const sway1 = Math.sin(time * 2.2) * 6;
    const sway2 = Math.sin(time * 2.2 + 0.8) * 16;
    const thA = (1.1) / k;
    let ao = 0;
    ao = writeSeg(antArr, ao, a0x, 0, a0x + ANT_LEN * 0.5, sway1, thA);
    writeSeg(antArr, ao, a0x + ANT_LEN * 0.5, sway1, a0x + ANT_LEN, sway2, thA);
    antGeo.attributes.position.needsUpdate = true;
  }

  // ---------- Tamaño ----------
  function resize() {
    const w = rootEl.clientWidth || 300;
    const H = rootEl.clientHeight || 300;

    // En contenedores pequeños se encoge para que siempre tenga espacio de recorrido
    const kFit = Math.min(w, H) / 300;
    k = Math.max(0.4, Math.min(props.scale, kFit));
    renderer.setSize(w, H, false);

    halfW = w / (2 * k);
    halfH = H / (2 * k);
    camera.left = -halfW;
    camera.right = halfW;
    camera.top = halfH;
    camera.bottom = -halfH;
    camera.updateProjectionMatrix();

    jointMat.size = 8 * k;
    dotMat.size = 11 * k;
    // borde rosa del cuerpo: ~2.5px sea cual sea la escala
    const t = 5 / k;
    outer.scale.set((BODY_L + t) / BODY_L, (BODY_W + t) / BODY_W, 1);

    const [mx, my] = bounds();
    if (!placed || Math.abs(bx) > mx + 40 || Math.abs(by) > my + 40) {
      placeAll();
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
  <div ref="root" class="phage-layer" aria-hidden="true">
    <canvas ref="canvas" class="phage-canvas" />
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
  inset: 0;
  width: 100%;
  height: 100%;
  display: block;
}
</style>