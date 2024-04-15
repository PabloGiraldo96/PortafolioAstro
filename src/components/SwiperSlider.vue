<script>
  import SwiperClass, { Pagination } from 'Swiper'
  import { Swiper, SwiperSlide } from 'vue-awesome-swiper'
  import VueAwesomeSwiper from 'vue-awesome-swiper'
  // import swiper module styles
  import 'swiper/css'
  import 'swiper/css/pagination'
  // more module style...

// Use swiper modules
SwiperClass.use([Pagination])

  export default {
    components: {
      Swiper,
      SwiperSlide
    },
    setup() {
      return {
        modules: [Pagination]
      }
    }
  }
</script>

<style>
</style>