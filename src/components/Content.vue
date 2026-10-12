<script setup>
import ExplodingText from "./ExplodingText.vue";

// Ya no hay `await` aquí: los textos aparecen en cuanto está la fuente (que se pide al cargar el módulo).
// La textura matcap llega después y se cambia sola. Para que llegue casi al instante, usa una versión chica:
//   · 256×256 es más que suficiente para un matcap (el archivo de 1024×1024 pesa varias veces más)
//   · si es Uploadcare, puedes pedirla ya redimensionada y en webp añadiendo a la URL la ruta
//     /-/resize/256x256/-/format/webp/   (compruébalo en tu panel; no pude probarlo desde aquí)
const MATCAP_URL =
  "https://2aslefu7xi.ucarecd.net/ebcb63cd-37d6-40de-b4bd-d3469cda6500/-/preview/1000x1000/";
</script>

<template>
  <!-- trigger="scroll": las letras se deshacen en puntos mientras el banner sale de pantalla (y se rehacen al volver).
       Otras opciones: trigger="loop" (cada loopEvery s) o trigger="manual" con una ref: textRef.value.explode() / reform() / toggle() -->
  <ExplodingText
    text="Juan Pablo Jaramillo Giraldo"
    :position="[-5, 0, 85]"
    :size="11"
    :matcap-url="MATCAP_URL"
    color="#FFD166"
    point-color="#FFD166"
    :thickness="1.2"
    :count="14000"
  />
  <ExplodingText
    text="3D Web Animations"
    :position="[-215, 45, -60]"
    :size="25"
    :matcap-url="MATCAP_URL"
    point-color="#4de1ff"
    :thickness="1"
    :count="20000"
  />
</template>


