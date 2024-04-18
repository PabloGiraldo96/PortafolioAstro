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
          <img src="https://scontent.feoh3-1.fna.fbcdn.net/v/t1.15752-9/362432012_2923533341110987_7059030799891607228_n.png?_nc_cat=103&ccb=1-7&_nc_sid=5f2048&_nc_eui2=AeEY7E5hOmhBvBGgOejnfjF3NHC0Fg-KPI80cLQWD4o8j2sv3jcBp11O6TcbYg_iynfx515YTWIUBV7IP-Q0KZO4&_nc_ohc=UxY9qug7RWUAb6U_T8C&_nc_ht=scontent.feoh3-1.fna&oh=03_Q7cD1QF1GkulVbvRHQSxxmZyC-1pLy9RDbYjC82Fw_j6woUb4g&oe=6647E90A" alt="cascos" className='mt-6'/>
        </a>
      </SwiperSlide>
      <SwiperSlide>
        <a href="https://atom-model.vercel.app/" aria-label="atomModel" target="_blank">
          <img src="https://scontent.feoh3-1.fna.fbcdn.net/v/t1.15752-9/437608248_1398045690826142_6578900220504714493_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=5f2048&_nc_eui2=AeFuDkNxflhZ0TnQLPC9sekNE_JKhG7YyS4T8kqEbtjJLh2L2__opRZUzDBnWAIWDchoRCcxlUN56kQiFuxVOzrX&_nc_ohc=RZWOxla8CB0Ab7s9pOD&_nc_ht=scontent.feoh3-1.fna&oh=03_Q7cD1QFMQz4Tuqf-DfCszOJ0QeNITaHFNOMG2nJiMiCUL_z7fQ&oe=6647EE6E" alt="cascos" className="h-100 mt-6 mb-55" />
        </a>
      </SwiperSlide>
      <SwiperSlide>
        <a href="https://skybox-modeling.vercel.app/" aria-label="skybox" target="_blank">
          <img src="https://scontent.feoh3-1.fna.fbcdn.net/v/t1.15752-9/434997285_1759516644539620_1668137813982040004_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=5f2048&_nc_eui2=AeHdMafy0Ck-Kh19w-0zHNas2cMU9t72C-nZwxT23vYL6ZsABA34oXsHKJWoJcxN2GgyxRfMa0PC4lG0B4mUIUPt&_nc_ohc=eSyedeo_sKcAb4A_v8n&_nc_ht=scontent.feoh3-1.fna&oh=03_Q7cD1QF6_NGJ6zCUxXCxI5Z2fV2cqXEXM7rQNu5Anj3r6GUdVA&oe=6647D076" alt="cascos" className=" mt-6" />
        </a>
      </SwiperSlide>
      <SwiperSlide>
        <a href="https://sine-waves-texture.vercel.app/" aria-label="sineWaves" target="_blank">
          <img src="https://scontent.feoh3-1.fna.fbcdn.net/v/t1.15752-9/435381914_965643411517912_2049324314017588983_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=5f2048&_nc_eui2=AeG20_OBYQDBMKbUs8-ZIYin3tbK54pjguDe1srnimOC4FrMEmYwkkH_Yy9J2Yx9MaIu2B4HShNrP21MUMnx21R9&_nc_ohc=Ld3zfYqcjF8Ab5ZEXYJ&_nc_ht=scontent.feoh3-1.fna&oh=03_Q7cD1QE569qdBp-A7SKnRUH6rhi178ybCiQAP3iTRMAxGIeilA&oe=66489A23" alt="cascos" className="mt-6" />
        </a>
      </SwiperSlide>
      <SwiperSlide>
        <a href="https://lapland-zone.vercel.app/" aria-label="cascos" target="_blank">
          <img src="https://scontent.feoh3-1.fna.fbcdn.net/v/t1.15752-9/437316591_7473990932692285_5688287696450042769_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=5f2048&_nc_eui2=AeH387Ooo0uktVRaWgpkQ3ojA-aceQw0rYMD5px5DDStg8RUDUSnW7dsmSY1ybhHarhqdIVsgkXzSaGn3POfhGkH&_nc_ohc=F_-AtrsU-ZIAb5xocKw&_nc_ht=scontent.feoh3-1.fna&oh=03_Q7cD1QGzaafZRc03FtHp7zbSiNqKpprEh188heetVWMIYlGw_g&oe=6647DE65" alt="cascos" className="mt-6 " />
        </a>
      </SwiperSlide>
      <SwiperSlide>
        <a href="https://logitech-educational-landing.vercel.app/" aria-label="cascos" target="_blank">
          <img src="https://scontent.feoh3-1.fna.fbcdn.net/v/t1.15752-9/437527839_395907763249176_7168703913263305102_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=5f2048&_nc_eui2=AeE6kiC-690QF_ZxlLAqhjfBCSQNOMv4yIYJJA04y_jIhsoAeAFjCeA2MyQezsIqokDXJSrXa7NazwuMVj1Fnixb&_nc_ohc=vOUgmwnJZAAAb5R8PHh&_nc_ht=scontent.feoh3-1.fna&oh=03_Q7cD1QFRAgl31xjuGCJ8SePteFjt84ByuuxAjpCOrA32ceD26g&oe=6647F8A6" alt="cascos" className=" mt-6 mb-5" />
        </a>
      </SwiperSlide>
      <SwiperSlide>
        <a href="https://og-house.vercel.app/" aria-label="cascos" target="_blank">
          <img src="https://scontent.feoh3-1.fna.fbcdn.net/v/t1.15752-9/436304716_3689605737989262_5930056808360364867_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=5f2048&_nc_eui2=AeGg5_20BMov8YWtPzi0bk9E_rm9d5Ik_cX-ub13kiT9xRu4X87c1XjRnlgpylAnvpL-lCyYZKuwDUMwEavkYS3T&_nc_ohc=XxB7NvEqlT4Ab7L5GLZ&_nc_ht=scontent.feoh3-1.fna&oh=03_Q7cD1QGteOhj-gj7V4vqr2_GJz3Sy5S8h-RSjPIvXrhVmyR-uA&oe=6647F083" alt="cascos" className=" mt-6" />
        </a>
      </SwiperSlide>
    </Swiper>
) 

}
