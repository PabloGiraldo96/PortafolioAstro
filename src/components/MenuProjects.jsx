import React from 'react'
import { Pagination } from 'swiper'
import '../styles/styles.css'
import { Swiper, SwiperSlide } from "swiper/react";
import 'swiper/swiper-bundle.min.css'
import 'swiper/swiper.min.css'


export default () => {
 return (
    <Swiper
      spaceBetween={30}
      slidesPerView={1}
      loop={true}
      pagination={{ clickable: true }}
      scrollbar={{ draggable: true }}
      onSwiper={(swiper) => console.log(swiper)}
      onSlideChange={() => console.log('slide change')}
       className='h-74 bg-black' 
>
      <SwiperSlide>
        <a href="https://cascos-landing.vercel.app/" aria-label="cascos" target="_blank">
          <img src="https://scontent.feoh3-1.fna.fbcdn.net/v/t1.15752-9/362432012_2923533341110987_7059030799891607228_n.png?_nc_cat=103&ccb=1-7&_nc_sid=5f2048&_nc_eui2=AeEY7E5hOmhBvBGgOejnfjF3NHC0Fg-KPI80cLQWD4o8j2sv3jcBp11O6TcbYg_iynfx515YTWIUBV7IP-Q0KZO4&_nc_ohc=qHWBWvxGVgcQ7kNvgHT3rsJ&_nc_ht=scontent.feoh3-1.fna&oh=03_Q7cD1QEwWxUOosF6bwd4o2uP9BHe54NFuZRV6xO-Mbgj11Ljig&oe=6676EE8A" alt="cascos" className="mx-auto mt-8"/>
        </a>
      </SwiperSlide>
      <SwiperSlide>
        <a href="https://atom-model.vercel.app/" aria-label="atomModel" target="_blank">
          <img src="https://scontent.feoh3-1.fna.fbcdn.net/v/t1.15752-9/437369950_802240571314030_4657425463135914279_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=5f2048&_nc_eui2=AeGctdLTaMtNvuGGIPVp9WlVdQNcope0CEZ1A1yil7QIRrbAdcIpXdCrMQcIX75XL4-WO8jKyIc8y23hh_-4tqzI&_nc_ohc=OTvZitXuctMQ7kNvgE3sr24&_nc_ht=scontent.feoh3-1.fna&oh=03_Q7cD1QGoV5rnTyv0R5ztMtH_MIQ_HPBCy1DKwhh-qSBxAFL-qQ&oe=6676C234" alt="atomModel" className="mx-auto mt-6" />
        </a>
      </SwiperSlide>
      <SwiperSlide>
        <a href="https://skybox-modeling.vercel.app/" aria-label="skybox" target="_blank">
          <img src="https://scontent.feoh3-1.fna.fbcdn.net/v/t1.15752-9/434997285_1759516644539620_1668137813982040004_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=5f2048&_nc_eui2=AeHdMafy0Ck-Kh19w-0zHNas2cMU9t72C-nZwxT23vYL6ZsABA34oXsHKJWoJcxN2GgyxRfMa0PC4lG0B4mUIUPt&_nc_ohc=k1ginYHqwDMQ7kNvgHYyYo5&_nc_ht=scontent.feoh3-1.fna&oh=03_Q7cD1QEnlZIfZc3BouvIQIFF5wvuuJops0ufvIBotIbjgtT4GA&oe=6676D5F6" alt="skyBox" className=" mx-auto mt-8" />
        </a>
      </SwiperSlide>
      <SwiperSlide>
        <a href="https://sine-waves-texture.vercel.app/" aria-label="sineWaves" target="_blank">
          <img src="https://scontent.feoh3-1.fna.fbcdn.net/v/t1.15752-9/434760537_751961530409367_6282908265636797803_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=5f2048&_nc_eui2=AeGtlK7fmBbGkUwDqdMFgNflFwdhYUEprV8XB2FhQSmtX8bdJshL_lR8suqOKqL5dmbsWdVIJlPU5AuR_EU7dVSt&_nc_ohc=xEFZQPnIBzMQ7kNvgF7tp15&_nc_ht=scontent.feoh3-1.fna&oh=03_Q7cD1QFITS3FVhZIcJDKtbZym00R6_XAJQ9QHqlzXYqYb0OH6A&oe=6676EBB5" alt="sineWaves" className="mx-auto mt-8" />
        </a>
      </SwiperSlide>
      <SwiperSlide>
        <a href="https://lapland-zone.vercel.app/" aria-label="cascos" target="_blank">
          <img src="https://scontent.feoh3-1.fna.fbcdn.net/v/t1.15752-9/356788891_800656961457839_8550209978705014080_n.png?_nc_cat=105&ccb=1-7&_nc_sid=5f2048&_nc_eui2=AeHA_Td8fQelcyqHhTj37XPucpJ-F9yGf8pykn4X3IZ_yiueANVhGrTQeAlJYSByTnII-esOiquVdcxACMF-RCd6&_nc_ohc=qeCPzR6R8AMQ7kNvgH4R1V7&_nc_ht=scontent.feoh3-1.fna&oh=03_Q7cD1QGL-ol18XaYdD2QZrSLPjYte6R7psOZBmdqQ9bB0Dk8Lw&oe=6676EFAA" alt="lapland" className="mx-auto mt-8" />
        </a>
      </SwiperSlide>
      <SwiperSlide>
        <a href="https://logitech-educational-landing.vercel.app/" aria-label="cascos" target="_blank">
          <img src="https://scontent.feoh3-1.fna.fbcdn.net/v/t1.15752-9/437527839_395907763249176_7168703913263305102_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=5f2048&_nc_eui2=AeE6kiC-690QF_ZxlLAqhjfBCSQNOMv4yIYJJA04y_jIhsoAeAFjCeA2MyQezsIqokDXJSrXa7NazwuMVj1Fnixb&_nc_ohc=Mji7v0l-4uoQ7kNvgFrkeMo&_nc_ht=scontent.feoh3-1.fna&oh=03_Q7cD1QHtQ2Jr7w-jHiQkLxw6QgAZzSJFBTxi_e8xUanWLOE4dQ&oe=6676C5E6" alt="logitech" className="mx-auto" />
        </a>
      </SwiperSlide>
      <SwiperSlide>
        <a href="https://og-house.vercel.app/" aria-label="cascos" target="_blank">
          <img src="https://scontent.feoh3-1.fna.fbcdn.net/v/t1.15752-9/436304716_3689605737989262_5930056808360364867_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=5f2048&_nc_eui2=AeGg5_20BMov8YWtPzi0bk9E_rm9d5Ik_cX-ub13kiT9xRu4X87c1XjRnlgpylAnvpL-lCyYZKuwDUMwEavkYS3T&_nc_ohc=twygCFyME2QQ7kNvgHHiqZn&_nc_ht=scontent.feoh3-1.fna&oh=03_Q7cD1QFxztSaNauwbtLLvHqEkS2X9UJtfztBZbWERlBLSIgV9A&oe=6676F603" alt="ogHouse" className="mx-auto mt-8" />
        </a>
      </SwiperSlide>
    </Swiper>
  )  
}