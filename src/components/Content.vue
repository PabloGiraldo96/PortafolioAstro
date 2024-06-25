<script setup>
import { useTexture } from '@tresjs/core'
import { Text3D } from '@tresjs/cientos'

const matcapTexture = await useTexture([
  'https://blenderartists.org/uploads/default/original/4X/0/e/4/0e431b4d369527b272509cf563fb6c164cd736e3.jpeg',
]);

const matcapTextureTwo = await useTexture([
    'https://3d.wlu.edu/v20/build/potree/resources/textures/matcap/skin.jpg',
]);

const matcapTextureThree = await useTexture([
  'https://europe1.discourse-cdn.com/standard21/uploads/nomadsculpt/optimized/2X/f/f5b97c898ac50e20a67d27ec8f613f91e91dde09_2_500x500.jpeg',
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
        <TresMeshMatcapMaterial :matcap="matcapTexture" />
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
        <TresMeshMatcapMaterial :matcap="matcapTextureThree" />
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
