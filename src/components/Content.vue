<script setup>
import { useTexture } from "@tresjs/core";
import { Text3D } from "@tresjs/cientos";

const matcapTextureTwo = await useTexture([
  "https://pics.craiyon.com/2024-03-08/jtxWZfoATNqpGb1p1si42Q.webp",
]);
</script>
<template>
  <Text3D
    :position="[-75, 0, 85]"
    :size="12"
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
    <TresMeshMatcapMaterial :matcap="matcapTextureTwo" />
  </Text3D>
  <Text3D
    :position="[-25, 45, -60]"
    :size="25"
    ref="textRef"
    font="https://raw.githubusercontent.com/Tresjs/assets/main/fonts/FiraCodeRegular.json"
  >
    3D web animations
    <TresMeshMatcapMaterial :matcap="matcapTextureTwo" />
  </Text3D>
  <Text3D
    :position="[-135, -80, -100]"
    :size="19"
    ref="textRef"
    font="https://raw.githubusercontent.com/Tresjs/assets/main/fonts/FiraCodeRegular.json"
  >
    UI Design
    <TresMeshMatcapMaterial :matcap="matcapTextureTwo" />
  </Text3D>
</template>
