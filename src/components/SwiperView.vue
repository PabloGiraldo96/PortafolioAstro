<template>
  <swiper :options="swiperOptions"
      class="swiper"
      :modules="modules"
      :pagination="true"
      :effect="'coverflow'"
      :grab-cursor="true"
      :centered-slides="true"
      :slides-per-view="'auto'"
      :coverflow-effect="{
        rotate: 50,
        stretch: 0,
        depth: 100,
        modifier: 1,
        slideShadows: true
      }">
    <swiper-slide  v-for="(image, index) in images" :key="index" class="slide">
      <a :href="links[index]"target="_blank" rel="noopener noreferrer">
        <img :src="image" alt="Slider Image" />
      </a>
    </swiper-slide>
  </swiper>
</template>

<script lang="ts">

  import { defineComponent } from 'vue'
  import { Swiper, SwiperSlide } from 'swiper/vue'
  import SwiperCore, { Pagination, Navigation, EffectFade } from 'swiper/core';
  import 'swiper/swiper-bundle.css';

SwiperCore.use([Pagination, Navigation]);

export default {
  components: {
    Swiper,
    SwiperSlide,
  },
  data() {
    return {
      images: [
        'https://scontent.feoh3-1.fna.fbcdn.net/v/t1.15752-9/356788891_800656961457839_8550209978705014080_n.png?_nc_cat=105&ccb=1-7&_nc_sid=5f2048&_nc_eui2=AeHA_Td8fQelcyqHhTj37XPucpJ-F9yGf8pykn4X3IZ_yiueANVhGrTQeAlJYSByTnII-esOiquVdcxACMF-RCd6&_nc_ohc=tnXHc033X8cAb7XdbwO&_nc_ht=scontent.feoh3-1.fna&oh=03_AdVrrpDMNyomIj0ktsbRWlpkQfpyOAkICUrj93v0Jo7djA&oe=6644D6AA',
        'https://scontent.feoh3-1.fna.fbcdn.net/v/t1.15752-9/362432012_2923533341110987_7059030799891607228_n.png?_nc_cat=103&ccb=1-7&_nc_sid=5f2048&_nc_eui2=AeEY7E5hOmhBvBGgOejnfjF3NHC0Fg-KPI80cLQWD4o8j2sv3jcBp11O6TcbYg_iynfx515YTWIUBV7IP-Q0KZO4&_nc_ohc=Z6pZZfDaMZkAb6k8OSo&_nc_ht=scontent.feoh3-1.fna&oh=03_Q7cD1QFCDWwccl9awrvS34djYJgN_JMtLcojtGe1mxk_oKyzKA&oe=66450DCA',
        'https://scontent.feoh3-1.fna.fbcdn.net/v/t1.15752-9/434018498_7436255553137568_1164563642258093913_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=5f2048&_nc_eui2=AeFk-Yi3tOfodUi_MhIeWj6eJeuiCqH5njkl66IKofmeOftekbq9CrGYNyrjMxETbklSUUWdQaxMrAAuSkXpt2Wt&_nc_ohc=jSKmXQlnzkoAb4g1MQT&_nc_ht=scontent.feoh3-1.fna&oh=03_Q7cD1QF_w9F2VQq4b4eVBghuXHO7MOGjimr4igUzi7TEGiB0xA&oe=66450770',
        'https://scontent.feoh3-1.fna.fbcdn.net/v/t1.15752-9/436029318_1000804931475560_7398463215958508647_n.jpg?_nc_cat=107&ccb=1-7&_nc_sid=5f2048&_nc_eui2=AeFwo3madeA_CDcoqAfBY_lwKiv5ZYiFc6wqK_lliIVzrDYV2rMfuASiwN19hkDEK7yKqFCATKA8B26m3hhkwGtU&_nc_ohc=KBcAd5VllwMAb4zxCj8&_nc_ht=scontent.feoh3-1.fna&oh=03_Q7cD1QEd6Bfjyl_j8-5kiV7zPTBNOLbfVNO42_ynPTLk1-Qmgw&oe=6644EFBB',
        'https://scontent.feoh3-1.fna.fbcdn.net/v/t1.15752-9/436304716_3689605737989262_5930056808360364867_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=5f2048&_nc_eui2=AeGg5_20BMov8YWtPzi0bk9E_rm9d5Ik_cX-ub13kiT9xRu4X87c1XjRnlgpylAnvpL-lCyYZKuwDUMwEavkYS3T&_nc_ohc=aI9M6w75pJEAb5WSOa5&_nc_ht=scontent.feoh3-1.fna&oh=03_AdUaG4yjg_zXBBQOxZxmXwi_Z1pZdpZGeVrBJwAJM9898Q&oe=6644A4C3',
        // Agrega más imágenes según sea necesario

      ],
      links: [
        'https://lapland-zone.vercel.app/',
        'https://og-house.vercel.app/',
        'https://atom-model.vercel.app/',
        'https://sine-waves-texture.vercel.app/',
        'https://cascos-landing.vercel.app/',
        // Agrega los enlaces correspondientes a cada imagen
      ],
      swiperOptions: {
        // Configuración de Swiper (opcional)
        // Consulta la documentación de Swiper para ver todas las opciones disponibles
      },
    };
  },
};
</script>

<style>
      img {
        display: block;
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
</style>
