<script setup>
import { useTexture } from '@tresjs/core'
import { Text3D } from '@tresjs/cientos'

const matcapTexture = await useTexture([
  'https://th.bing.com/th/id/OIP.7rd_bvr-joYRQkMm4yqmEAHaGe?w=549&h=480&rs=1&pid=ImgDetMain',
]);

const matcapTextureTwo = await useTexture([
  'https://i1.wp.com/motionsquared.net/wp-content/uploads/2019/01/cinema-4d-marble-materials-pack_085.jpg?ssl=1',
]);

const matcapTextureThree = await useTexture([
  'https://th.bing.com/th/id/R.ae2a8ad06203281ecae14a8ba39f4acf?rik=Iq82Mj5zbTV9yw&riu=http%3a%2f%2fwww.solarsystemscope.com%2ftextures%2fpreviews%2fpreview_saturn_ring.jpg&ehk=XOaCh4bbqVj5tfcvSk1lK9%2feiiwAzSKCnQallE%2bZPt4%3d&risl=&pid=ImgRaw&r=0',
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
        <TresMeshMatcapMaterial :matcap="matcapTextureThree" />
    </Text3D>
</template>