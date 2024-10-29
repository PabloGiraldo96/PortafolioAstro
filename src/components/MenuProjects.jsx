//import logo from "./assets/images/atropos-logo-en.svg";
//import "../node_modules/atropos/atropos.css";
import React from "react";
import { Pagination } from "swiper";
import "../styles/styles.css";
import Atropos from "atropos/react";
import bg from "../assets/images/atropos-bg.svg";
import forestBack from "../assets/images/atropos-forest-back.svg";
import forestFront from "../assets/images/atropos-forest-front.svg";
import forestMid from "../assets/images/atropos-forest-mid.svg";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.min.css";
import "swiper/swiper.min.css";

export default () => {
  return (
    <Swiper
      spaceBetween={30}
      slidesPerView={1}
      loop={true}
      pagination={{ clickable: true }}
      scrollbar={{ draggable: true }}
      onSlideChange={() => console.log("Slide Working")}
      className="h-74 bg-black z-0 hover:z-50"
    >
      <SwiperSlide className="cardsSwiper">
        <a
          href="https://study-room-chi.vercel.app/"
          aria-label="myRoom"
          target="_blank"
        >
          <div className="relative">
            <img
              src="https://scontent.feoh3-1.fna.fbcdn.net/v/t1.15752-9/453355921_3102014733268877_522087315941961482_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=9f807c&_nc_eui2=AeGBtznNQgzMIWVSbQBKHjTRgXWt7QqSkyyBda3tCpKTLLcXAkxxisnz5lHMjPlNj1vrtIlNdLb1eZomYScHG4y5&_nc_ohc=WKrQUZXijqYQ7kNvgF2gIUk&_nc_zt=23&_nc_ht=scontent.feoh3-1.fna&_nc_gid=AMSzbmJyn0GNqKcT1IrE2m8&oh=03_Q7cD1QGzlsEE3iu9ssuHNHO6G4JLq210ijzjMB6f2GSfrmQ94g&oe=6747A75F"
              alt="myRoom"
              className="mx-auto mt-6"
            />
            <div className="absolute mt-5 left-0 w-full h-full flex items-center justify-center text-white opacity-0 hover:opacity-100">
              <h2 className="secondTitle italic font-sans  text-8xl  z-40">
                3D Web Modeling
              </h2>{" "}
            </div>
          </div>
        </a>
      </SwiperSlide>
      <SwiperSlide className="cardsSwiper">
        <a
          href="https://car-world-nine.vercel.app/"
          aria-label="carScene"
          target="_blank"
        >
          <div className="relative">
            <img
              src="https://scontent.feoh3-1.fna.fbcdn.net/v/t1.15752-9/453707361_1257609718979204_5656136358129985642_n.jpg?_nc_cat=107&ccb=1-7&_nc_sid=9f807c&_nc_eui2=AeEVhHnxbXwj0Bo2WiGGmW8q6ULCObb0ga_pQsI5tvSBrw-Tba5VXhpr4Epzsx1Sb1-3AlCYkPsLhXfRaMMYy4F5&_nc_ohc=_y1S1vCXkQQQ7kNvgEJfIhB&_nc_ht=scontent.feoh3-1.fna&_nc_gid=AixYEu-2YjWHmmspew68SFS&oh=03_Q7cD1QEYAtIGsX0w6b7yN5oScj39xStrcu3dfZQo2PEkwV32lA&oe=6721B033"
              alt="carScene"
              className="mx-auto mt-6"
            />
            <div className="absolute mt-5 left-0 w-full h-full flex items-center justify-center text-white opacity-0 hover:opacity-100">
              <h2 className="secondTitle italic font-sans  text-8xl  z-40">
                3D Web Modeling
              </h2>{" "}
            </div>
          </div>
        </a>
      </SwiperSlide>
      <SwiperSlide className="cardsSwiper">
        <a
          href="https://cascos-landing.vercel.app/"
          aria-label="cascos"
          target="_blank"
        >
          <div className="relative">
            <img
              src="https://scontent.feoh3-1.fna.fbcdn.net/v/t1.15752-9/362432012_2923533341110987_7059030799891607228_n.png?_nc_cat=103&ccb=1-7&_nc_sid=9f807c&_nc_eui2=AeEY7E5hOmhBvBGgOejnfjF3NHC0Fg-KPI80cLQWD4o8j2sv3jcBp11O6TcbYg_iynfx515YTWIUBV7IP-Q0KZO4&_nc_ohc=iD14pDwbcVUQ7kNvgHPBgMs&_nc_ht=scontent.feoh3-1.fna&oh=03_Q7cD1QGqjZRNFOph5juXWlmt_4gE_z5li_Hik_UcfkHLDIZwwg&oe=6721A8CA"
              alt="cascos"
              className="mx-auto mt-8"
            />
            <div className="absolute mt-5 left-0 w-full h-full flex items-center justify-center text-white opacity-0 hover:opacity-100">
              <h2 className="Helmets text-8xl italic font-sans z-40">
                Animations
              </h2>{" "}
            </div>
          </div>
        </a>
      </SwiperSlide>

      <SwiperSlide className="cardsSwiper">
        <a
          href="https://atom-model.vercel.app/"
          aria-label="atomModel"
          target="_blank"
        >
          <img
            src="https://scontent.feoh3-1.fna.fbcdn.net/v/t1.15752-9/437608248_1398045690826142_6578900220504714493_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=9f807c&_nc_eui2=AeFuDkNxflhZ0TnQLPC9sekNE_JKhG7YyS4T8kqEbtjJLh2L2__opRZUzDBnWAIWDchoRCcxlUN56kQiFuxVOzrX&_nc_ohc=xGpRMObNyqAQ7kNvgHuVPwj&_nc_ht=scontent.feoh3-1.fna&oh=03_Q7cD1QF-1Vh-WE6CyiDviCCx1Qo4Kp4xDjFe4tDWA1403GEsNA&oe=6721AE2E"
            alt="atomModel"
            className="mx-auto mt-6"
          />
          <div className="absolute mt-5 left-0 w-full h-full flex items-center justify-center text-white opacity-0 hover:opacity-100">
            <h2 className="ThirdTitle italic font-sans  text-8xl  z-40">
              3D Web Modeling
            </h2>{" "}
          </div>
        </a>
      </SwiperSlide>
      <SwiperSlide className="cardsSwiper">
        <a
          href="https://lapland-zone.vercel.app/"
          aria-label="Lapland"
          target="_blank"
        >
          <img
            src="https://scontent.feoh3-1.fna.fbcdn.net/v/t1.15752-9/437316591_7473990932692285_5688287696450042769_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=9f807c&_nc_eui2=AeH387Ooo0uktVRaWgpkQ3ojA-aceQw0rYMD5px5DDStg8RUDUSnW7dsmSY1ybhHarhqdIVsgkXzSaGn3POfhGkH&_nc_ohc=qBZ83nmgyJ8Q7kNvgGHkSCE&_nc_ht=scontent.feoh3-1.fna&oh=03_Q7cD1QHYfgeN-F69qHQClJVQ_6gl8CwhzpA6U3vDQS4zJyY0QA&oe=67219E25"
            alt="lapland"
            className="mx-auto mt-8"
          />
          <div className="absolute mt-5 left-0 w-full h-full flex items-center justify-center text-white opacity-0 hover:opacity-100">
            <h2 className="Lapland italic font-sans  text-8xl  z-40">
              Web Development{" "}
            </h2>{" "}
          </div>
        </a>
      </SwiperSlide>
      <SwiperSlide className="cardsSwiper">
        <a
          href="https://scroll-animation-zeta.vercel.app/"
          aria-label="scrollAnimation"
          target="_blank"
        >
          <img
            src="https://scontent.feoh3-1.fna.fbcdn.net/v/t1.15752-9/449746215_691643916461095_5598000245293300920_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=9f807c&_nc_eui2=AeHV9vFTNIojh3HBj_Ms_ZD1Gw1IxVv02MEbDUjFW_TYwa_ILIzixT46tFVdv4U3I1d2iGptnbgqEVTAlTqahZyd&_nc_ohc=yBEcEMNejQUQ7kNvgHoVs3h&_nc_ht=scontent.feoh3-1.fna&oh=03_Q7cD1QHZ6ZPCvevU3teTQQrz6-BBouytyPzLY19XKtjUl3cHrw&oe=672189BC"
            alt="ScrollBlender"
            className="mx-auto mt-8"
          />
          <div className="absolute mt-5 left-0 w-full h-full flex items-center justify-center text-white opacity-0 hover:opacity-100">
            <h2 className="ThirdTitle italic font-sans  text-8xl  z-40">
              Blender x Web design
            </h2>{" "}
          </div>
        </a>
      </SwiperSlide>
      <SwiperSlide className="cardsSwiper">
        <a
          href="https://skybox-modeling.vercel.app/"
          aria-label="skybox"
          target="_blank"
        >
          <img
            src="https://scontent.feoh3-1.fna.fbcdn.net/v/t1.15752-9/434997285_1759516644539620_1668137813982040004_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=9f807c&_nc_eui2=AeHdMafy0Ck-Kh19w-0zHNas2cMU9t72C-nZwxT23vYL6ZsABA34oXsHKJWoJcxN2GgyxRfMa0PC4lG0B4mUIUPt&_nc_ohc=DorM5RpMYXMQ7kNvgGFFa_2&_nc_ht=scontent.feoh3-1.fna&oh=03_Q7cD1QEwK8bP2cJ9Rcdbe8OwrsDUVk2xUipDsyvPBf0ryApgiw&oe=67219036"
            alt="skyBox"
            className=" mx-auto mt-8"
          />
          <div className="absolute mt-5 left-0 w-full h-full flex items-center justify-center text-white opacity-0 hover:opacity-100">
            <h2 className="SkyBox italic font-sans  text-8xl  z-40">
              3D Web Modeling
            </h2>{" "}
          </div>
        </a>
      </SwiperSlide>
      <SwiperSlide className="cardsSwiper">
        <a
          href="https://sine-waves-texture.vercel.app/"
          aria-label="sineWaves"
          target="_blank"
        >
          <img
            src="https://scontent.feoh3-1.fna.fbcdn.net/v/t1.15752-9/434760537_751961530409367_6282908265636797803_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=9f807c&_nc_eui2=AeGtlK7fmBbGkUwDqdMFgNflFwdhYUEprV8XB2FhQSmtX8bdJshL_lR8suqOKqL5dmbsWdVIJlPU5AuR_EU7dVSt&_nc_ohc=DWgZe5OfOZ8Q7kNvgHxaBai&_nc_ht=scontent.feoh3-1.fna&oh=03_Q7cD1QEFVGV-Zj84GinfPIzxTbvb7ao8Tyl-lXYvarTxTkiWpg&oe=6721A5F5"
            alt="sineWaves"
            className="mx-auto mt-8"
          />
          <div className="absolute mt-5 left-0 w-full h-full flex items-center justify-center text-white opacity-0 hover:opacity-100">
            <h2 className="Waves italic font-sans  text-8xl  z-40">
              3D Web Modeling
            </h2>{" "}
          </div>
        </a>
      </SwiperSlide>
      <SwiperSlide className="cardsSwiper">
        <a
          href="https://light-spark.vercel.app/"
          aria-label="SparkLight"
          target="_blank"
        >
          <img
            src="https://scontent.feoh3-1.fna.fbcdn.net/v/t1.15752-9/449937181_1527427404558774_353074505124488073_n.png?_nc_cat=111&ccb=1-7&_nc_sid=9f807c&_nc_eui2=AeGDC06fQ-dkRErSsVd7--lSvQ7d8qfEYjW9Dt3yp8RiNZIJv8aK5dZrBA1FKxrdE8ASvDzdEwLR4kj4kfvoziWv&_nc_ohc=fFA7-1sSsuAQ7kNvgFftwp9&_nc_ht=scontent.feoh3-1.fna&oh=03_Q7cD1QFYd_e1-YUl34yuhHcvMzouXlb2eedY9JaElpafdWbWDA&oe=6721AD11"
            alt="sparkLight"
            className="mx-auto mt-8"
          />
          <div className="absolute mt-5 left-0 w-full h-full flex items-center justify-center text-white opacity-0 hover:opacity-100">
            <h2 className="ThirdTitle italic font-sans  text-8xl  z-40">
              3D Web Modeling
            </h2>{" "}
          </div>
        </a>
      </SwiperSlide>

      <SwiperSlide className="cardsSwiper">
        <a
          href="https://logitech-educational-landing.vercel.app/"
          aria-label="Logitech"
          target="_blank"
        >
          <img
            src="https://scontent.feoh3-1.fna.fbcdn.net/v/t1.15752-9/435013233_951767576622865_1901447388420134672_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=9f807c&_nc_eui2=AeFQtZVvZLFadEI8WYD0Es2N8kOInabNme_yQ4idps2Z71zwWX3csUBdcIdaUOpqfoOEaZFs1riQSj-nzZBvSFOo&_nc_ohc=Du3mmDjiJzwQ7kNvgE4Fdw_&_nc_ht=scontent.feoh3-1.fna&oh=03_Q7cD1QH9thxY8JWDgvyvlIV5E2H6TNKzkcP9DWP-oe7K5ItXRw&oe=6721A09B"
            alt="logitech"
            className="mx-auto mt-8"
          />
          <div className="absolute mt-5 left-0 w-full h-full flex items-center justify-center text-white opacity-0 hover:opacity-100">
            <h2 className="Logitech italic font-sans  text-8xl  z-40">
              Animations
            </h2>{" "}
          </div>
        </a>
      </SwiperSlide>
      <SwiperSlide className="cardsSwiper">
        <a
          href="https://sushi-landing-six.vercel.app/"
          aria-label="SushiAnimation"
          target="_blank"
        >
          <img
            src="https://scontent.feoh3-1.fna.fbcdn.net/v/t1.15752-9/450784490_813581444220556_5405473915107737496_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=9f807c&_nc_eui2=AeHEP10RCelg57wAn52B7CXcxmyNnhCPuCLGbI2eEI-4InWayHn4W5Z6Q70inM1YN4gN2_pMySWkyCit7aGbmJJQ&_nc_ohc=fSTs9mWIB90Q7kNvgHyVF85&_nc_ht=scontent.feoh3-1.fna&oh=03_Q7cD1QG1ODEC3ktfnjrKh3f73N4b3vQnYZKWw43eqF4mYDRIgQ&oe=6721A782"
            alt="SushiWorld"
            className="mx-auto mt-8"
          />
          <div className="absolute mt-5 left-0 w-full h-full flex items-center justify-center text-white opacity-0 hover:opacity-100">
            <h2 className="Sushi italic font-sans  text-8xl  z-40">
              Blender x Web design
            </h2>{" "}
          </div>
        </a>
      </SwiperSlide>
    </Swiper>
  );
};
