<script setup lang="ts">

import { TresCanvas, useRenderLoop } from '@tresjs/core'
import { BasicShadowMap, SRGBColorSpace, NoToneMapping } from 'three'
import { OrbitControls, Stars } from '@tresjs/cientos'
import { shallowRef, watchEffect } from 'vue';
import Text from './Content.vue'


const gl = {
  clearColor: '#09070D',
  shadows: true,
  alpha: false,
  shadowMapType: BasicShadowMap,
  outputColorSpace: SRGBColorSpace,
  toneMapping: NoToneMapping,
}


const {onLoop} = useRenderLoop()

// ShallowRef de cada geometria, como cada geometria tiene diferentes animaciones, las voy a manejar por separado, 6 aproximadamente

const geometryRef = shallowRef()
const geometryRefTwo = shallowRef()
const geometryRefThree = shallowRef()
const geometryRefFour = shallowRef()
const geometryRefFive = shallowRef()
const geometryRefSix = shallowRef()

onLoop(({delta, elapsed}) => {
	if(geometryRef.value && geometryRefTwo.value && geometryRefThree.value && geometryRefFour.value&&geometryRefFive.value&&geometryRefSix.value){
		geometryRef.value.position.set(22, 25, -50);
		geometryRef.value.position.x = Math.sin(elapsed * 0.1) * 1
		geometryRef.value.scale.set(
			Math.sin(elapsed) * .18 -0.1,
			Math.sin(elapsed) * .20 -0.1,
			Math.sin(elapsed) * .14 -0.1,)

// Segunda geometria

		geometryRefTwo.value.rotation.y += 0.003
		geometryRefTwo.value.rotation.x += 0.004
		geometryRefTwo.value.rotation.z = elapsed
		geometryRefTwo.value.position.y = Math.sin(-elapsed * 1.5) * 1
		geometryRefTwo.value.position.x = Math.cos(elapsed * 0.1) * 1
		geometryRefTwo.value.position.z = Math.sin(elapsed * 0.3) * 1
		geometryRefTwo.value.scale.set(
			Math.sin(elapsed) * .15 -0.1,
			Math.sin(elapsed) * .15 -0.1,
			Math.sin(elapsed) * .15 -0.1)

// Tercer geometria 

		geometryRefThree.value.rotation.y += 0.003
		geometryRefThree.value.rotation.x += 0.004
		geometryRefThree.value.rotation.z = elapsed
		geometryRefThree.value.position.y = Math.sin(elapsed * -1.5) * -1
		geometryRefThree.value.position.x = Math.cos(-elapsed * 0.1) * -1
		geometryRefThree.value.position.z = Math.sin(elapsed * 0.3) * -1
		geometryRefThree.value.scale.set(
			Math.sin(elapsed) * .15 -0.1,
			Math.sin(elapsed) * .15 -0.1,
			Math.sin(elapsed) * .15 -0.1)

// Cuarta geometria 

	geometryRefFour.value.position.set(0, 0, Math.sin(elapsed * 1.15) * 0.75);
		geometryRefFour.value.scale.set(
			Math.sin(elapsed) * .15 -0.1,
			Math.sin(elapsed) * .15 -0.1,
			Math.sin(elapsed) * .15 -0.1)

  // Quinta geometria

	geometryRefFive.value.position.set(1, 0, Math.sin(elapsed * 1.15) * 0.75);
		geometryRefFive.value.scale.set(
			Math.sin(elapsed) * .15 -0.1,
			Math.sin(elapsed) * .15 -0.1,
			Math.sin(elapsed) * .15 -0.1)

// Sexta geometria

	geometryRefSix.value.position.set(-1, 0, Math.sin(elapsed * 1.15) * 0.75);
		geometryRefSix.value.scale.set(
			Math.sin(elapsed) * .15 -0.1,
			Math.sin(elapsed) * .15 -0.1,
			Math.sin(elapsed) * .15 -0.1)

	}
})

</script>
<template>
    <div class="tres-container">
    <TresCanvas v-bind="gl">
    <TresPerspectiveCamera :position="[55,78,250]" :look-at="[0,0,0]" class="cameraP"/>
    <OrbitControls />
    <Stars />
    <Suspense>
      <TresMesh ref="geometryRef" transition:animate="slide">
		  <TresBoxGeometry :args="[50, 50, 50, 50]" />  
          <TresMeshNormalMaterial />     
      </TresMesh>
    </Suspense>
    <Suspense>
    <TresMesh ref="geometryRefTwo">
      <TresBoxGeometry :args="[50, 50, 50, 50]" />
      <TresMeshNormalMaterial />
    </TresMesh>
    </Suspense>
    <Suspense>
    <TresMesh ref="geometryRefThree">
      <TresBoxGeometry :args="[50, 50, 50, 50]" />
      <TresMeshNormalMaterial />
    </TresMesh>
    </Suspense>
    <Suspense>
    <TresMesh ref="geometryRefFour">
      <TresBoxGeometry :args="[50, 50, 50, 50]" />
      <TresMeshNormalMaterial />
    </TresMesh>
    </Suspense>
    <Suspense>
     <Text />
    </Suspense>
    <Suspense>
    <TresMesh ref="geometryRefFive">
      <TresBoxGeometry :args="[50, 50, 50, 50]" />
      <TresMeshNormalMaterial />
    </TresMesh>
    </Suspense>
    <Suspense>
    <TresMesh ref="geometryRefSix">
      <TresBoxGeometry :args="[50, 50, 50, 50]" />
      <TresMeshNormalMaterial />
    </TresMesh>
    </Suspense>
    <TresAmbientLight :intensity="2" />
    <TresDirectionalLight
      :position="[-4, -2, 2]"
      :intensity="1"
      cast-shadow
      color="#fff"
    />
    <TresDirectionalLight
      :position="[4, 6, 4]"
      :intensity="2"
      cast-shadow
      color="white"
    />
  </TresCanvas>
  </div>
</template>

<style>
.tres-container {
  display: flex;
  margin-bottom:-270px;
  z-index: 1;
  width: 100%;
  height: 55vh;
}

 @media only screen and (max-width: 390px) {
    .tres-container {
      /* Modifica los estilos según tus necesidades para una mejor visualización en dispositivos móviles */
      height: 100vh; /* Ajusta la altura para ocupar toda la pantalla */
      margin-bottom: -430px; /* Elimina el margen inferior */
    }
  }
</style>