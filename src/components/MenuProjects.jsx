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
       className='h-74' 
>
      <SwiperSlide>
        <a href="https://cascos-landing.vercel.app/" aria-label="cascos" target="_blank">
          <img src="https://scontent.feoh3-1.fna.fbcdn.net/v/t1.15752-9/362432012_2923533341110987_7059030799891607228_n.png?_nc_cat=103&ccb=1-7&_nc_sid=5f2048&_nc_eui2=AeEY7E5hOmhBvBGgOejnfjF3NHC0Fg-KPI80cLQWD4o8j2sv3jcBp11O6TcbYg_iynfx515YTWIUBV7IP-Q0KZO4&_nc_ohc=UxY9qug7RWUAb6U_T8C&_nc_ht=scontent.feoh3-1.fna&oh=03_Q7cD1QF1GkulVbvRHQSxxmZyC-1pLy9RDbYjC82Fw_j6woUb4g&oe=6647E90A" alt="cascos" className='mt-6'/>
        </a>
      </SwiperSlide>
      <SwiperSlide>
        <a href="https://atom-model.vercel.app/" aria-label="atomModel" target="_blank">
          <img src="https://scontent.feoh3-1.fna.fbcdn.net/v/t1.15752-9/434644206_399144172924608_7255756708533822728_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=5f2048&_nc_eui2=AeEGTjhnHSO9u3P1OWQgf8PdJYZdVcUInhclhl1VxQieF9GnrhqG_2FZIajRxTCyCh2xxFiBmwMCIkR_Qe8H6UrR&_nc_ohc=6fsbLtVpkMcAb6EHg83&_nc_ht=scontent.feoh3-1.fna&oh=03_Q7cD1QHgPsSdMbT6wo94520wtSJJ1macN_kfmOyLcWBK4xOLJA&oe=6647CFCC" alt="cascos" className="h-100 mt-6 mb-55" />
        </a>
      </SwiperSlide>
      <SwiperSlide>
        <a href="https://skybox-modeling.vercel.app/" aria-label="skybox" target="_blank">
          <img src="https://scontent.feoh3-1.fna.fbcdn.net/v/t1.15752-9/434997285_1759516644539620_1668137813982040004_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=5f2048&_nc_eui2=AeHdMafy0Ck-Kh19w-0zHNas2cMU9t72C-nZwxT23vYL6ZsABA34oXsHKJWoJcxN2GgyxRfMa0PC4lG0B4mUIUPt&_nc_ohc=eSyedeo_sKcAb4A_v8n&_nc_ht=scontent.feoh3-1.fna&oh=03_Q7cD1QF6_NGJ6zCUxXCxI5Z2fV2cqXEXM7rQNu5Anj3r6GUdVA&oe=6647D076" alt="cascos" className=" mt-6" />
        </a>
      </SwiperSlide>
      <SwiperSlide>
        <a href="https://sine-waves-texture.vercel.app/" aria-label="sineWaves" target="_blank">
          <img src="https://scontent.feoh3-1.fna.fbcdn.net/v/t1.15752-9/434760537_751961530409367_6282908265636797803_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=5f2048&_nc_eui2=AeGtlK7fmBbGkUwDqdMFgNflFwdhYUEprV8XB2FhQSmtX8bdJshL_lR8suqOKqL5dmbsWdVIJlPU5AuR_EU7dVSt&_nc_ohc=WCiBtXOImr8Ab5N2E1r&_nc_ht=scontent.feoh3-1.fna&oh=03_Q7cD1QED7N-9cEzZ8cfOgcWmI1BDEjd4r2MMIWkoMxax_peLhw&oe=6647E635" alt="cascos" className="mt-6" />
        </a>
      </SwiperSlide>
      <SwiperSlide>
        <a href="https://lapland-zone.vercel.app/" aria-label="cascos" target="_blank">
          <img src="https://scontent.feoh3-1.fna.fbcdn.net/v/t1.15752-9/437316591_7473990932692285_5688287696450042769_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=5f2048&_nc_eui2=AeH387Ooo0uktVRaWgpkQ3ojA-aceQw0rYMD5px5DDStg8RUDUSnW7dsmSY1ybhHarhqdIVsgkXzSaGn3POfhGkH&_nc_ohc=F_-AtrsU-ZIAb5xocKw&_nc_ht=scontent.feoh3-1.fna&oh=03_Q7cD1QGzaafZRc03FtHp7zbSiNqKpprEh188heetVWMIYlGw_g&oe=6647DE65" alt="cascos" className="mt-6 " />
        </a>
      </SwiperSlide>
      <SwiperSlide>
        <a href="https://logitech-educational-landing.vercel.app/" aria-label="cascos" target="_blank">
          <img src="https://scontent.feoh3-1.fna.fbcdn.net/v/t1.15752-9/435013233_951767576622865_1901447388420134672_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=5f2048&_nc_eui2=AeFQtZVvZLFadEI8WYD0Es2N8kOInabNme_yQ4idps2Z71zwWX3csUBdcIdaUOpqfoOEaZFs1riQSj-nzZBvSFOo&_nc_ohc=tUQPF7DbKvUAb7Ti6wo&_nc_ht=scontent.feoh3-1.fna&oh=03_Q7cD1QGjT8_PIUCBweeuUEO8NqqzYeP3yLsO8jSc_Nx2Ov2fxA&oe=6647E0DB" alt="cascos" className=" mt-6" />
        </a>
      </SwiperSlide>
    </Swiper>
) 

}
