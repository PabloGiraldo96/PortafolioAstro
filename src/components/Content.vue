<script setup>
import { useTexture } from "@tresjs/core";
import ExplodingText from "./ExplodingText.vue";

const FONT = "https://raw.githubusercontent.com/Tresjs/assets/main/fonts/FiraCodeRegular.json";

const loaded = await useTexture([
  "https://imgs.search.brave.com/zA1iPh9oxiKVxzpe0-qCb2n_k5y9K7FLkOhoETFDy0M/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pLnBp/bmltZy5jb20vb3Jp/Z2luYWxzLzIzL2I5/L2E3LzIzYjlhN2Jk/NzcwNmU0Nzg5Zjgz/YWEwYWE2ODk3MGYx/LmpwZw",
]);
const matcap = Array.isArray(loaded) ? loaded[0] : loaded;
</script>

<template>
  <!-- trigger="scroll": las letras se deshacen en puntos mientras el banner sale de pantalla (y se rehacen al volver).
       Otras opciones: trigger="loop" (cada loopEvery s) o trigger="manual" con una ref: textRef.value.explode() / reform() / toggle() -->
  <ExplodingText
    text="Juan Pablo Jaramillo Giraldo"
    :position="[-5, 0, 85]"
    :size="11"
    :font="FONT"
    :matcap="matcap"
    color="#FFD166"
    point-color="#FFD166"
    :thickness="1.2"
    :count="14000"
  />
  <ExplodingText
    text="3D Web Animations"
    :position="[-215, 45, -60]"
    :size="25"
    :font="FONT"
    :matcap="matcap"
    point-color="#4de1ff"
    :thickness="1"
    :count="20000"
  />
</template>
