<script setup>
import { useTexture } from "@tresjs/core";
import { Text3D } from "@tresjs/cientos";

const matcapTexture = await useTexture([
  "https://pics.craiyon.com/2024-03-08/jtxWZfoATNqpGb1p1si42Q.webp",
]);

const matcapTextureTwo = await useTexture([
  "https://pics.craiyon.com/2024-03-08/jtxWZfoATNqpGb1p1si42Q.webp",
]);

const matcapTextureThree = await useTexture([
  "https://europe1.discourse-cdn.com/standard21/uploads/nomadsculpt/optimized/2X/f/f5b97c898ac50e20a67d27ec8f613f91e91dde09_2_500x500.jpeg",
]);
</script>
<template>
  <Text3D
    :position="[-45, 0, 85]"
    :size="11"
    ref="textRef"
    font="https://raw.githubusercontent.com/Tresjs/assets/main/fonts/FiraCodeRegular.json"
  >
    Juan Pablo Giraldo
    <TresMeshMatcapMaterial :matcap="matcapTextureTwo" />
  </Text3D>
  <Text3D
    :position="[105, 10, 35]"
    :size="15"
    ref="textRef"
    font="https://raw.githubusercontent.com/Tresjs/assets/main/fonts/FiraCodeRegular.json"
  >
    Frontend
    <TresMeshMatcapMaterial :matcap="matcapTexture" />
  </Text3D>
  <Text3D
    :position="[-25, 45, -60]"
    :size="25"
    ref="textRef"
    font="https://raw.githubusercontent.com/Tresjs/assets/main/fonts/FiraCodeRegular.json"
  >
    3D web animations
    <TresMeshMatcapMaterial :matcap="matcapTextureThree" />
  </Text3D>
  <Text3D
    :position="[-135, -80, -100]"
    :size="19"
    ref="textRef"
    font="https://raw.githubusercontent.com/Tresjs/assets/main/fonts/FiraCodeRegular.json"
  >
    UI Design
    <TresMeshNormalMaterial />
  </Text3D>
</template>
