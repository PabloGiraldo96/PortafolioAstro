<script setup lang="ts">
import { TresCanvas, useRenderLoop } from "@tresjs/core";
import { SRGBColorSpace, NoToneMapping } from "three";
import {
  BufferAttribute,
  BufferGeometry,
  Color,
  LineBasicMaterial,
  LineSegments,
  AdditiveBlending,
} from "three";
import { OrbitControls, Stars } from "@tresjs/cientos";
import { onBeforeUnmount, shallowRef } from "vue";
import Text from "./Content.vue";

const gl = {
  clearColor: "#0C050F",
  alpha: false,
  outputColorSpace: SRGBColorSpace,
  toneMapping: NoToneMapping,
};

/* ------------------------------------------------------------------ *
 *  LÍNEAS VOLADORAS: cada línea es una curva (onda senoidal o hélice)
 *  que nace en un origen, avanza dejando una estela que se desvanece
 *  y desaparece. Al terminar renace en otro lugar con otra forma.
 * ------------------------------------------------------------------ */

// Los mismos 9 puntos de anclaje donde antes estaban los rectángulos
const anchors: [number, number, number][] = [
  [45, 25, -50],
  [-100, 45, 75],
  [100, 55, 95],
  [-50, -50, 0],
  [100, 55, 0],
  [-92, -50, 0],
  [-30, 8, 0],
  [25, 75, 0],
  [-45, 30, 0],
];

const TRAILS = 20; // cantidad de líneas simultáneas
const SEG = 28; // puntos por línea (más = curva más suave)
const ARROW_LEN = 7; // largo de las aletas de la punta de flecha
const ARROW_W = 3; // apertura de las aletas
const VERTS = SEG + 4; // vértices por línea: la curva + 4 aletas de la flecha
const SPREAD = 10; // dispersión del origen alrededor del anclaje
const MIN_DIST = 70; // distancia mínima que recorre
const MAX_DIST = 190; // distancia máxima que recorre
const MIN_LIFE = 3; // segundos de vida
const MAX_LIFE = 6.5;

// Onda senoidal: y = AMP * sin(FREQ * d + fase)
// Para que TODAS sean idénticas, pon MIN = MAX.
const AMP_MIN = 0.25; // amplitud (altura de la onda, en unidades del mundo)
const AMP_MAX = 12;
const FREQ_MIN = 0.25; // frecuencia (rad por unidad): ciclos = FREQ * dist / 2π
const FREQ_MAX = 0.04;
const RANDOM_PHASE = false; // false = todas arrancan con la misma fase

const palette = [ "#46FFF2", "#4de1ff", "#FFF600", "#A8EB12"].map(
  (c) => new Color(c)
);

// Estado por línea
const origin = new Float32Array(TRAILS * 3);
const dir = new Float32Array(TRAILS * 3);
const uAxis = new Float32Array(TRAILS * 3); // eje lateral 1 (perpendicular a dir)
const vAxis = new Float32Array(TRAILS * 3); // eje lateral 2
const base = new Float32Array(TRAILS * 3); // color base
const dist = new Float32Array(TRAILS);
const life = new Float32Array(TRAILS);
const birth = new Float32Array(TRAILS);
const amp = new Float32Array(TRAILS); // amplitud de la onda
const freq = new Float32Array(TRAILS); // frecuencia de la onda
const phase = new Float32Array(TRAILS);
const helix = new Uint8Array(TRAILS); // 1 = hélice, 0 = onda plana

function spawn(i: number, now: number) {
  const a = anchors[Math.floor(Math.random() * anchors.length)];
  const j = i * 3;

  origin[j] = a[0] + (Math.random() * 2 - 1) * SPREAD;
  origin[j + 1] = a[1] + (Math.random() * 2 - 1) * SPREAD;
  origin[j + 2] = a[2] + (Math.random() * 2 - 1) * SPREAD;

  // dirección unitaria aleatoria uniforme en la esfera
  const z = Math.random() * 2 - 1;
  const t = Math.random() * Math.PI * 2;
  const r = Math.sqrt(1 - z * z);
  const dx = r * Math.cos(t), dy = z, dz = r * Math.sin(t);
  dir[j] = dx; dir[j + 1] = dy; dir[j + 2] = dz;

  // base ortonormal: u = normalize(dir x ejeAuxiliar), v = dir x u
  const [ax, ay, az] = Math.abs(dy) < 0.9 ? [0, 1, 0] : [1, 0, 0];
  let ux = dy * az - dz * ay, uy = dz * ax - dx * az, uz = dx * ay - dy * ax;
  const ul = Math.hypot(ux, uy, uz) || 1;
  ux /= ul; uy /= ul; uz /= ul;
  uAxis[j] = ux; uAxis[j + 1] = uy; uAxis[j + 2] = uz;
  vAxis[j] = dy * uz - dz * uy;
  vAxis[j + 1] = dz * ux - dx * uz;
  vAxis[j + 2] = dx * uy - dy * ux;

  dist[i] = MIN_DIST + Math.random() * (MAX_DIST - MIN_DIST);
  life[i] = MIN_LIFE + Math.random() * (MAX_LIFE - MIN_LIFE);
  birth[i] = now;
  amp[i] = AMP_MIN + Math.random() * (AMP_MAX - AMP_MIN);
  freq[i] = FREQ_MIN + Math.random() * (FREQ_MAX - FREQ_MIN);
  phase[i] = RANDOM_PHASE ? Math.random() * Math.PI * 2 : 0;
  helix[i] = 0; // solo ondas senoidales, sin hélices

  const c = palette[Math.floor(Math.random() * palette.length)];
  base[j] = c.r; base[j + 1] = c.g; base[j + 2] = c.b;
}

// Arranque escalonado: cada línea empieza en un punto distinto de su ciclo
for (let i = 0; i < TRAILS; i++) {
  spawn(i, 0);
  birth[i] = -Math.random() * life[i];
}

// Geometría de las estelas (segmentos indexados entre puntos consecutivos)
// + 4 aletas por línea que forman la punta de flecha (cono) en la cabeza
const positions = new Float32Array(TRAILS * VERTS * 3);
const colors = new Float32Array(TRAILS * VERTS * 3);
const index = new Uint16Array(TRAILS * (SEG - 1 + 4) * 2);
let k = 0;
for (let i = 0; i < TRAILS; i++) {
  for (let s = 0; s < SEG - 1; s++) {
    index[k++] = i * VERTS + s;
    index[k++] = i * VERTS + s + 1;
  }
  for (let m = 0; m < 4; m++) {
    index[k++] = i * VERTS + SEG - 1; // cabeza
    index[k++] = i * VERTS + SEG + m; // extremo de la aleta
  }
}
const trailGeo = new BufferGeometry();
trailGeo.setAttribute("position", new BufferAttribute(positions, 3));
trailGeo.setAttribute("color", new BufferAttribute(colors, 3));
trailGeo.setIndex(new BufferAttribute(index, 1));

// Con blending aditivo, oscurecer el color equivale a desvanecer
const lineMaterial = new LineBasicMaterial({
  vertexColors: true,
  transparent: true,
  blending: AdditiveBlending,
  depthWrite: false,
});
const lines = new LineSegments(trailGeo, lineMaterial);
lines.frustumCulled = false;

/* ------------------------------------------------------------------ *
 *  LATIDO de la esfera de estrellas: 1 pulso cada PULSE_PERIOD segundos.
 *  Sube rápido (como un latido) y luego se relaja despacio.
 * ------------------------------------------------------------------ */
const PULSE_PERIOD = 20; // segundos entre pulsos
const PULSE_AMP = 5; // cuánto crece la esfera en el pico (0.08 = +8 %)
const PULSE_ATTACK = 0.50; // fracción del ciclo que dura la subida

const starsGroup = shallowRef<any>(null);

// Devuelve 0..1: 0 = reposo, 1 = pico del pulso
function pulse(elapsed: number) {
  const t = (elapsed % PULSE_PERIOD) / PULSE_PERIOD; // 0..1 dentro del ciclo
  if (t < PULSE_ATTACK) {
    const a = t / PULSE_ATTACK;
    return a * a * (3 - 2 * a); // subida rápida y suave
  }
  const r = 1 - (t - PULSE_ATTACK) / (1 - PULSE_ATTACK); // 1 -> 0
  return r * r * r; // bajada lenta
}

const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);
const easeInQuad = (t: number) => t * t;

const { onLoop } = useRenderLoop();

onLoop(({ elapsed }) => {
  // Latido de la esfera de estrellas
  if (starsGroup.value) {
    const sc = 1 + PULSE_AMP * pulse(elapsed);
    starsGroup.value.scale.set(sc, sc, sc);
  }

  for (let i = 0; i < TRAILS; i++) {
    let age = elapsed - birth[i];
    if (age > life[i]) {
      spawn(i, elapsed);
      age = 0;
    }
    const u = age / life[i]; // 0..1

    // La cabeza sale rápido y frena; la cola arranca tarde y la alcanza.
    // Al final cola = cabeza y la línea desaparece "volando".
    const head = dist[i] * easeOutCubic(Math.min(1, u / 0.7));
    const tail = Math.min(
      head,
      dist[i] * easeInQuad(Math.max(0, (u - 0.3) / 0.7))
    );
    const fade = Math.min(1, (1 - u) * 2.5);

    const j = i * 3;
    for (let s = 0; s < SEG; s++) {
      const f = s / (SEG - 1); // 0 = cola, 1 = cabeza
      const d = tail + (head - tail) * f; // distancia recorrida en este punto
      const env = Math.min(1, d / 18); // la onda crece suave desde el origen
      const ang = freq[i] * d + phase[i];
      const l1 = amp[i] * Math.sin(ang) * env;
      const l2 = helix[i] ? amp[i] * Math.cos(ang) * env : 0;

      const p = (i * VERTS + s) * 3;
      positions[p] = origin[j] + dir[j] * d + uAxis[j] * l1 + vAxis[j] * l2;
      positions[p + 1] =
        origin[j + 1] + dir[j + 1] * d + uAxis[j + 1] * l1 + vAxis[j + 1] * l2;
      positions[p + 2] =
        origin[j + 2] + dir[j + 2] * d + uAxis[j + 2] * l1 + vAxis[j + 2] * l2;

      // brillo: la cola es oscura, la cabeza brillante
      const b = Math.pow(f, 1.6) * fade;
      colors[p] = base[j] * b;
      colors[p + 1] = base[j + 1] * b;
      colors[p + 2] = base[j + 2] * b;
    }

    // Punta de flecha: 4 aletas hacia atrás, alrededor de la tangente de la curva
    const hI = (i * VERTS + SEG - 1) * 3;
    const pI = (i * VERTS + SEG - 2) * 3;
    let tx = positions[hI] - positions[pI];
    let ty = positions[hI + 1] - positions[pI + 1];
    let tz = positions[hI + 2] - positions[pI + 2];
    let tl = Math.hypot(tx, ty, tz);
    if (tl < 1e-6) {
      tx = dir[j]; ty = dir[j + 1]; tz = dir[j + 2]; tl = 1;
    }
    tx /= tl; ty /= tl; tz /= tl;
    // la flecha crece al nacer y se encoge al desaparecer
    const sc = Math.max(0, Math.min(1, (head - tail) / 14));

    for (let m = 0; m < 4; m++) {
      const ax = m < 2 ? uAxis : vAxis;
      const sg = m % 2 ? -1 : 1;
      let wx = ax[j] * sg, wy = ax[j + 1] * sg, wz = ax[j + 2] * sg;
      const dp = wx * tx + wy * ty + wz * tz; // quitar la parte paralela a la tangente
      wx -= dp * tx; wy -= dp * ty; wz -= dp * tz;
      const wl = Math.hypot(wx, wy, wz) || 1;

      const q = (i * VERTS + SEG + m) * 3;
      positions[q] = positions[hI] - tx * ARROW_LEN * sc + (wx / wl) * ARROW_W * sc;
      positions[q + 1] = positions[hI + 1] - ty * ARROW_LEN * sc + (wy / wl) * ARROW_W * sc;
      positions[q + 2] = positions[hI + 2] - tz * ARROW_LEN * sc + (wz / wl) * ARROW_W * sc;
      colors[q] = base[j] * fade * 0.85;
      colors[q + 1] = base[j + 1] * fade * 0.85;
      colors[q + 2] = base[j + 2] * fade * 0.85;
    }
  }
  trailGeo.attributes.position.needsUpdate = true;
  trailGeo.attributes.color.needsUpdate = true;
});

onBeforeUnmount(() => {
  trailGeo.dispose();
  lineMaterial.dispose();
});
</script>

<template>
  <div class="tres-container">
    <TresCanvas v-bind="gl">
      <TresPerspectiveCamera :position="[200, 100, 260]" :look-at="[0, 0, 0]" />
      <OrbitControls />

      <!-- Esfera de estrellas más densa: sube count / size para más brillo -->
      <TresGroup ref="starsGroup">
        <Stars :radius="10" :depth="80" :count="20000" :size="0.5" />
      </TresGroup>

      <primitive :object="lines" />

      <Suspense>
        <Text />
      </Suspense>
    </TresCanvas>
  </div>
</template>

<style>
.tres-container {
  overflow-x: hidden;
  display: flex;
  margin-bottom: -75px;
  z-index: 1;
  width: 100%;
  height: 60vh;
}

@media only screen and (max-width: 1440px) {
  .tres-container {
    height: 65rem;
    flex-direction: column;
    margin-bottom: -650px;
  }
}

@media only screen and (max-width: 1024px) {
  .tres-container {
    height: 58rem;
    flex-direction: column;
    margin-bottom: -450px;
  }
}

@media only screen and (max-width: 445px) {
  .tres-container {
    height: 48rem;
    flex-direction: column;
    margin-bottom: -450px;
  }
}

@media only screen and (max-width: 414px) {
  .tres-container {
    height: 73rem;
    flex-direction: column;
    margin-bottom: -480px;
  }
}

@media only screen and (max-width: 425px) {
  .tres-container {
    height: 62rem;
    flex-direction: column;
    margin-bottom: -480px;
  }
}

@media only screen and (max-width: 410px) {
  .tres-container {
    height: 68rem;
    flex-direction: column;
    margin-bottom: -420px;
  }
}

@media only screen and (max-width: 375px) {
  .tres-container {
    height: 120vh;
    flex-direction: column;
    margin-bottom: -420px;
  }
}

@media only screen and (max-width: 320px) {
  .tres-container {
    height: 120vh;
    flex-direction: column;
    margin-bottom: -350px;
  }
}
</style>