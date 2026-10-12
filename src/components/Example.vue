<script setup lang="ts">
import { TresCanvas, useRenderLoop } from "@tresjs/core";
import {
  AdditiveBlending,
  BufferAttribute,
  BufferGeometry,
  CanvasTexture,
  Color,
  NoToneMapping,
  Points,
  PointsMaterial,
  SRGBColorSpace,
} from "three";
import { OrbitControls, Stars } from "@tresjs/cientos";
import { onBeforeUnmount, shallowRef } from "vue";
import Text from "./Content.vue";
import { createCloudChamber, type RGB } from "../lib/cloudChamber";
import { useScrollAnimations } from "../composables/useScrollAnimations.ts";


// Mismo color que el inicio del degradado de la página (ver page-gradient.css: --bg-0)
const gl = {
  clearColor: "#0C050F",
  alpha: false,
  outputColorSpace: SRGBColorSpace,
  toneMapping: NoToneMapping,
};

useScrollAnimations();

/* ------------------------------------------------------------------ *
 *  CÁMARA DE NIEBLA: cada traza es un "disparo" de partícula que deja
 *  una cadena de gotitas y se desvanece. Ver lib/cloudChamber.ts para
 *  los tipos (alfa / beta / muón), ramas y tiempos.
 * ------------------------------------------------------------------ */

// Los mismos 9 puntos de anclaje donde nacen las trazas
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

const TRACKS = 180; // trazas simultáneas
const SPREAD = 100; // dispersión del origen alrededor del anclaje
const DROP_SIZE = 1.5; // tamaño de cada gotita (unidades del mundo)
const FLASH_SIZE = 10; // tamaño del destello del disparo / cabeza

const palette: RGB[] = ["#46FFF2", "#4de1ff", "#FFF600", "#A8EB12"].map((c) => {
  const k = new Color(c);
  return [k.r, k.g, k.b] as RGB;
});

const chamber = createCloudChamber({ tracks: TRACKS, anchors, palette, spread: SPREAD });

// Gotita redonda y suave (sin esto, los puntos serían cuadrados)
function makeDotTexture(): CanvasTexture | null {
  if (typeof document === "undefined") return null; // SSR
  const c = document.createElement("canvas");
  c.width = c.height = 64;
  const g = c.getContext("2d")!;
  const grad = g.createRadialGradient(32, 32, 0, 32, 32, 32);
  grad.addColorStop(0, "rgba(255,255,255,1)");
  grad.addColorStop(0.35, "rgba(255,255,255,0.55)");
  grad.addColorStop(1, "rgba(255,255,255,0)");
  g.fillStyle = grad;
  g.fillRect(0, 0, 64, 64);
  return new CanvasTexture(c);
}

function makeGeometry(positions: Float32Array, colors: Float32Array) {
  const geo = new BufferGeometry();
  geo.setAttribute("position", new BufferAttribute(positions, 3));
  geo.setAttribute("color", new BufferAttribute(colors, 3));
  return geo;
}

const dot = makeDotTexture();
// Con blending aditivo, oscurecer el color equivale a desvanecer
const makeMaterial = (size: number) =>
  new PointsMaterial({
    size,
    map: dot ?? undefined,
    vertexColors: true,
    transparent: true,
    blending: AdditiveBlending,
    depthWrite: false,
  });

const dropGeo = makeGeometry(chamber.dropPositions, chamber.dropColors);
const flashGeo = makeGeometry(chamber.flashPositions, chamber.flashColors);
const dropMat = makeMaterial(DROP_SIZE);
const flashMat = makeMaterial(FLASH_SIZE);
const drops = new Points(dropGeo, dropMat);
const flashes = new Points(flashGeo, flashMat);
drops.frustumCulled = false;
flashes.frustumCulled = false;

/* ------------------------------------------------------------------ *
 *  LATIDO de la esfera de estrellas: 1 pulso cada PULSE_PERIOD segundos.
 *  Sube rápido (como un latido) y luego se relaja despacio.
 * ------------------------------------------------------------------ */
const PULSE_PERIOD = 20; // segundos entre pulsos
const PULSE_AMP = 5; // cuánto crece la esfera en el pico (0.08 = +8 %)
const PULSE_ATTACK = 0.5; // fracción del ciclo que dura la subida

const starsGroup = shallowRef<any>(null);

// Devuelve 0..1: 0 = reposo, 1 = pico del pulso
function pulse(elapsed: number) {
  const t = (elapsed % PULSE_PERIOD) / PULSE_PERIOD;
  if (t < PULSE_ATTACK) {
    const a = t / PULSE_ATTACK;
    return a * a * (3 - 2 * a);
  }
  const r = 1 - (t - PULSE_ATTACK) / (1 - PULSE_ATTACK);
  return r * r * r;
}

const { onLoop } = useRenderLoop();

onLoop(({ elapsed }) => {
  if (starsGroup.value) {
    const sc = 1 + PULSE_AMP * pulse(elapsed);
    starsGroup.value.scale.set(sc, sc, sc);
  }

  chamber.update(elapsed);
  dropGeo.attributes.position.needsUpdate = true;
  dropGeo.attributes.color.needsUpdate = true;
  flashGeo.attributes.position.needsUpdate = true;
  flashGeo.attributes.color.needsUpdate = true;
});

onBeforeUnmount(() => {
  dropGeo.dispose();
  flashGeo.dispose();
  dropMat.dispose();
  flashMat.dispose();
  dot?.dispose();
});
</script>

<template>
  <!-- data-banner: lo usa useScrollAnimations para el parallax/fade al hacer scroll -->
  <div class="tres-container" data-banner>
    <TresCanvas v-bind="gl">
      <TresPerspectiveCamera :position="[250, 150, 320]" :look-at="[0, 0, 0]" />
      <OrbitControls />

      <TresGroup ref="starsGroup">
        <Stars :radius="10" :depth="80" :count="20000" :size="0.5" />
      </TresGroup>

      <primitive :object="drops" />
      <primitive :object="flashes" />

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
  margin-bottom: -55px;
  z-index: -1;
  width: 100%;
  height: 85vh;
  /* El borde inferior se funde con el degradado de la página: sin corte entre banner y About */
  -webkit-mask-image: linear-gradient(to bottom, #000 70%, transparent 100%);
  mask-image: linear-gradient(to bottom, #000 70%, transparent 100%);
  will-change: transform, opacity;
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
