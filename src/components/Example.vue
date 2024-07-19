<script setup lang="ts">
import { TresCanvas, useRenderLoop } from "@tresjs/core";
import { BasicShadowMap, SRGBColorSpace, NoToneMapping } from "three";
import { OrbitControls, Stars } from "@tresjs/cientos";
import { shallowRef, watchEffect } from "vue";
import Text from "./Content.vue";

const gl = {
  clearColor: "#0C050F",
  shadows: true,
  alpha: false,
  shadowMapType: BasicShadowMap,
  outputColorSpace: SRGBColorSpace,
  toneMapping: NoToneMapping,
};

const { onLoop } = useRenderLoop();

const radius = 5.4;
const speed = 0.009;

// ShallowRef de cada geometria, como cada geometria tiene diferentes animaciones, las voy a manejar por separado, 6 aproximadamente

const geometryRef = shallowRef();
const geometryRefTwo = shallowRef();
const geometryRefThree = shallowRef();
const geometryRefFour = shallowRef();
const geometryRefFive = shallowRef();
const geometryRefSix = shallowRef();
const geometryRefSeven = shallowRef();
const geometryRefEight = shallowRef();
const geometryRefNine = shallowRef();

onLoop(({ delta, elapsed }) => {
  if (
    geometryRef.value &&
    geometryRefTwo.value &&
    geometryRefThree.value &&
    geometryRefFour.value &&
    geometryRefFive.value &&
    geometryRefSix.value &&
    geometryRefSeven.value &&
    geometryRefEight.value &&
    geometryRefNine.value
  ) {
    geometryRef.value.position.set(45, 25, -50);
    geometryRef.value.rotation.y += 0.005;
    geometryRef.value.rotation.x += radius * speed * 2;
    geometryRef.value.rotation.z = 0.004;
    geometryRef.value.scale.set(
      Math.sin(elapsed) * 0.18 - 0.1,
      Math.tan(elapsed) * 0.015 - 0.1,
      Math.sin(elapsed) * 0.14 - 0.1
    );

    // Segunda geometria
    geometryRefTwo.value.position.set(-100, 45, 75);
    geometryRefTwo.value.rotation.y += 0.003;
    geometryRefTwo.value.rotation.x += (radius * speed * 1) / 2;
    geometryRefTwo.value.rotation.z = elapsed;
    geometryRefTwo.value.scale.set(
      Math.tan(elapsed) * 0.015 - 0.1,
      Math.sin(elapsed) * 0.15 - 0.1,
      Math.sin(delta) * 0.15 - 0.1
    );

    // Tercer geometria

    geometryRefThree.value.rotation.y += 0.005;
    geometryRefThree.value.rotation.x += radius * speed * 2;
    geometryRefThree.value.rotation.z = 0.004;
    geometryRefThree.value.position.set(100, 55, 95);
    geometryRefThree.value.scale.set(
      Math.sin(elapsed) * 0.15 - 0.1,
      Math.tan(elapsed) * 0.015 - 0.1,
      Math.sin(elapsed) * 0.15 - 0.1
    );

    // Cuarta geometria

    geometryRefFour.value.position.set(
      -50,
      -50,
      Math.sin(elapsed * 1.15) * 0.75
    );
    geometryRefFour.value.rotation.y += 0.005;
    geometryRefFour.value.rotation.x += -radius * speed * 2.5;
    geometryRefFour.value.rotation.z = 0.004;
    geometryRefFour.value.scale.set(
      Math.tan(elapsed) * 0.015 - 0.1,
      Math.sin(elapsed) * 0.15 - 0.1,
      Math.sin(elapsed) * 0.15 - 0.1
    );

    // Quinta geometria

    geometryRefFive.value.position.set(
      100,
      55,
      Math.sin(elapsed * 1.15) * 0.75
    );
    geometryRefFive.value.rotation.y += 0.005;
    geometryRefFive.value.rotation.x += radius * speed * 2.8;
    geometryRefFive.value.rotation.z = 0.004;
    geometryRefFive.value.scale.set(
      Math.sin(elapsed) * 0.15 - 0.1,
      Math.tan(elapsed) * 0.015 - 0.1,
      Math.sin(elapsed) * 0.15 - 0.1
    );

    // Sexta geometria

    geometryRefSix.value.position.set(
      -92,
      -50,
      Math.sin(elapsed * 1.15) * 0.75
    );
    geometryRefSix.value.rotation.y += 0.005;
    geometryRefSix.value.rotation.x += -radius * speed * 2.4;
    geometryRefSix.value.rotation.z = 0.004;
    geometryRefSix.value.scale.set(
      Math.sin(elapsed) * 0.15 - 0.1,
      Math.tan(elapsed) * 0.015 - 0.1,
      Math.sin(elapsed) * 0.15 - 0.1
    );

    // Septima geometria

    geometryRefSeven.value.position.set(
      -30,
      8,
      Math.sin(elapsed * 1.15) * 0.75
    );
    geometryRefSeven.value.rotation.y += 0.01;
    geometryRefSeven.value.rotation.x += radius * speed * 2.4;
    geometryRefSeven.value.rotation.z = 0.004;
    geometryRefSeven.value.scale.set(
      Math.tan(elapsed) * 0.15 - 0.1,
      Math.sin(elapsed) * 0.15 - 0.1,
      Math.sin(elapsed) * 0.15 - 0.1
    );

    // Octava geometria

    geometryRefEight.value.position.set(
      25,
      75,
      Math.sin(elapsed * 1.15) * 0.75
    );
    geometryRefEight.value.rotation.y += 0.005;
    geometryRefEight.value.rotation.x += radius * speed * 2.4;
    geometryRefEight.value.rotation.z = 0.004;
    geometryRefEight.value.scale.set(
      Math.tan(elapsed) * 0.015 - 0.1,
      Math.sin(elapsed) * 0.15 - 0.1,
      Math.sin(elapsed) * 0.15 - 0.1
    );

    // Novena geometria

    geometryRefNine.value.position.set(
      -45,
      30,
      Math.sin(elapsed * 1.15) * 0.75
    );
    geometryRefNine.value.rotation.y += 0.005;
    geometryRefNine.value.rotation.x += radius * speed * 2.4;
    geometryRefNine.value.rotation.z = 0.004;
    geometryRefNine.value.scale.set(
      Math.tan(elapsed) * 0.015 - 0.1,
      Math.sin(elapsed) * 0.15 - 0.1,
      Math.sin(elapsed) * 0.15 - 0.1
    );
  }
});
</script>
<template>
  <div class="tres-container">
    <TresCanvas v-bind="gl">
      <TresPerspectiveCamera
        :position="[-150, -10, 380]"
        :look-at="[0, 0, 0]"
        class="cameraP ease-in duration-300 hover:scale-110"
      />
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
      <Suspense>
        <TresMesh ref="geometryRefSeven">
          <TresBoxGeometry :args="[50, 50, 50, 50]" />
          <TresMeshNormalMaterial />
        </TresMesh>
      </Suspense>
      <Suspense>
        <TresMesh ref="geometryRefEight">
          <TresBoxGeometry :args="[50, 50, 50, 50]" />
          <TresMeshNormalMaterial />
        </TresMesh>
      </Suspense>
      <Suspense>
        <TresMesh ref="geometryRefNine">
          <TresBoxGeometry :args="[50, 50, 50, 50]" />
          <TresMeshNormalMaterial />
        </TresMesh>
      </Suspense>
      <TresAmbientLight :intensity="1" />
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
  margin-bottom: -75px;
  z-index: 1;
  width: 100%;
  height: 60vh;
}

@media only screen and (max-width: 1440px) {
  .tres-container {
    height: 65rem;
    flex-direction: column;
    margin-bottom: -650px;
  }
}

@media only screen and (max-width: 1024px) {
  .tres-container {
    height: 58rem;
    flex-direction: column;
    margin-bottom: -450px;
  }
}

@media only screen and (max-width: 445px) {
  .tres-container {
    height: 48rem;
    flex-direction: column;
    margin-bottom: -450px;
  }
}

@media only screen and (max-width: 414px) {
  .tres-container {
    height: 73rem;
    flex-direction: column;
    margin-bottom: -480px;
  }
}

@media only screen and (max-width: 425px) {
  .tres-container {
    height: 62rem;
    flex-direction: column;
    margin-bottom: -480px;
  }
}

@media only screen and (max-width: 410px) {
  .tres-container {
    height: 68rem;
    flex-direction: column;
    margin-bottom: -420px;
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
