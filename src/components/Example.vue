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

const radius = 3.4;
const speed = 0.00750; 

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
		geometryRef.value.rotation.y += 0.005
		geometryRef.value.rotation.x += radius * speed * 2
		geometryRef.value.rotation.z = 0.004
		geometryRef.value.scale.set(
			Math.sin(elapsed) * .18 -0.1,
			Math.sin(elapsed) * .20 -0.1,
			Math.sin(elapsed) * .14 -0.1,)

// Segunda geometria
    geometryRefTwo.value.position.set(-100, 45, 75);
		geometryRefTwo.value.rotation.y += 0.003
		geometryRefTwo.value.rotation.x += radius * speed * 1/2
		geometryRefTwo.value.rotation.z = elapsed
		geometryRefTwo.value.scale.set(
			Math.sin(elapsed) * .15 -0.1,
			Math.sin(elapsed) * .15 -0.1,
			Math.sin(delta) * .15 -0.1)

// Tercer geometria 

		geometryRefThree.value.rotation.y += 0.005
		geometryRefThree.value.rotation.x += radius * speed * 2
		geometryRefThree.value.rotation.z = 0.004
    geometryRefThree.value.position.set(100, 55, 95);
		geometryRefThree.value.scale.set(
			Math.sin(elapsed) * .15 -0.1,
			Math.sin(elapsed) * .15 -0.1,
			Math.sin(elapsed) * .15 -0.1)

// Cuarta geometria 

	geometryRefFour.value.position.set(-50,-50, Math.sin(elapsed * 1.15) * 0.75);
		geometryRefFour.value.rotation.y += 0.005
		geometryRefFour.value.rotation.x += -radius * speed * 2
		geometryRefFour.value.rotation.z = 0.004
		geometryRefFour.value.scale.set(
			Math.sin(elapsed) * .15 -0.1,
			Math.sin(elapsed) * .15 -0.1,
			Math.sin(elapsed) * .15 -0.1)

  // Quinta geometria

	geometryRefFive.value.position.set(10, 40, Math.sin(elapsed * 1.15) * 0.75);
		geometryRefFive.value.rotation.y += 0.005
		geometryRefFive.value.rotation.x += radius * speed * 3
		geometryRefFive.value.rotation.z = 0.004
		geometryRefFive.value.scale.set(
			Math.sin(elapsed) * .15 -0.1,
			Math.sin(elapsed) * .15 -0.1,
			Math.sin(elapsed) * .15 -0.1)

// Sexta geometria

	  geometryRefSix.value.position.set(-1, 0, Math.sin(elapsed * 1.15) * 0.75);
		geometryRefSix.value.rotation.y += 0.005
		geometryRefSix.value.rotation.x += -radius * speed * 2.4
		geometryRefSix.value.rotation.z = 0.004
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
    <TresPerspectiveCamera :position="[100,108,250]" :look-at="[0,0,0]" class="cameraP ease-in duration-300 hover:scale-110" />
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
  overflow-x: hidden;
  display: flex;
  margin-bottom:-75px;
  z-index: 1;
  width: 100%;
  height: 67vh;
}

 @media only screen and (max-width: 445px) {
    .tres-container {
      height: 55rem; 
      flex-direction: column;
      margin-bottom: -450px; 
    }
  }

 @media only screen and (max-width: 414px) {
    .tres-container {
      height: 58rem;
      flex-direction: column;
      margin-bottom:-450px; 
    }
  }

 @media only screen and (max-width: 420px) {
    .tres-container {
      flex-direction: column;
      margin-bottom: -100px; 
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