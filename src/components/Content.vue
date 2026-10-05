<script setup>
import { useTexture } from "@tresjs/core";
import { Text3D } from "@tresjs/cientos";

const matcapTextureTwo = await useTexture([
  "https://imgs.search.brave.com/zA1iPh9oxiKVxzpe0-qCb2n_k5y9K7FLkOhoETFDy0M/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pLnBp/bmltZy5jb20vb3Jp/Z2luYWxzLzIzL2I5/L2E3LzIzYjlhN2Jk/NzcwNmU0Nzg5Zjgz/YWEwYWE2ODk3MGYx/LmpwZw",
]);
</script>
<template>
  <Text3D
    :position="[-5, 0, 85]"
    :size="11"
    ref="textRef"
    font="https://raw.githubusercontent.com/Tresjs/assets/main/fonts/FiraCodeRegular.json"
  >
    Juan Pablo Jaramillo Giraldo
    <TresMeshMatcapMaterial :matcap="matcapTextureTwo" color="#FFD166"/>
  </Text3D>
  <Text3D
    :position="[-215, 45, -60]"
    :size="25"
    ref="textRef"
    font="https://raw.githubusercontent.com/Tresjs/assets/main/fonts/FiraCodeRegular.json"
  >
    3D Web Animations
    <TresMeshMatcapMaterial :matcap="matcapTextureTwo"/>
  </Text3D>

</template>
