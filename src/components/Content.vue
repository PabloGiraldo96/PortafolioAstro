<script setup>
import { useTexture } from '@tresjs/core'
import { Text3D } from '@tresjs/cientos'

const matcapTexture = await useTexture([
  'https://th.bing.com/th/id/R.682f15661deac23380d5fa523c36c905?rik=ed8u4mEr5ZMFJA&riu=http%3a%2f%2fjm-derochette.be%2fimages%2fConoscopie_biaxial%2fAccessory_plates%2fI_E2_45G_1L.jpg&ehk=1B%2bVyHtPx6PTmYkREca0ZFFgV2yHLvpB9hLIathCgl8%3d&risl=&pid=ImgRaw&r=0',
]);

const matcapTextureTwo = await useTexture([
    'https://th.bing.com/th/id/R.ae2a8ad06203281ecae14a8ba39f4acf?rik=Iq82Mj5zbTV9yw&riu=http%3a%2f%2fwww.solarsystemscope.com%2ftextures%2fpreviews%2fpreview_saturn_ring.jpg&ehk=XOaCh4bbqVj5tfcvSk1lK9%2feiiwAzSKCnQallE%2bZPt4%3d&risl=&pid=ImgRaw&r=0',
]);

const matcapTextureThree = await useTexture([
  'https://th.bing.com/th/id/R.98425c6121f31b77f1c79b6955411b9d?rik=W7riODblz4GOwQ&pid=ImgRaw&r=0',
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