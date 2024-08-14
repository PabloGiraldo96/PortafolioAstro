import React from "react";
import { Pagination } from "swiper";
import "../styles/styles.css";
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
              src="https://scontent.feoh3-1.fna.fbcdn.net/v/t1.15752-9/453355921_3102014733268877_522087315941961482_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=9f807c&_nc_eui2=AeGBtznNQgzMIWVSbQBKHjTRgXWt7QqSkyyBda3tCpKTLLcXAkxxisnz5lHMjPlNj1vrtIlNdLb1eZomYScHG4y5&_nc_ohc=bE-5Nghe-08Q7kNvgGAU20W&_nc_ht=scontent.feoh3-1.fna&oh=03_Q7cD1QEOJl3qUFGtgOJ0VKLT9qXPwOEVNp5uFrg5DzZX24rQGA&oe=66E3755F"
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
          href="https://cascos-landing.vercel.app/"
          aria-label="cascos"
          target="_blank"
        >
          <div className="relative">
            <img
              src="https://scontent.feoh3-1.fna.fbcdn.net/v/t1.15752-9/362432012_2923533341110987_7059030799891607228_n.png?_nc_cat=103&ccb=1-7&_nc_sid=9f807c&_nc_eui2=AeEY7E5hOmhBvBGgOejnfjF3NHC0Fg-KPI80cLQWD4o8j2sv3jcBp11O6TcbYg_iynfx515YTWIUBV7IP-Q0KZO4&_nc_ohc=bGjyURom1o8Q7kNvgGWJ3cp&_nc_ht=scontent.feoh3-1.fna&oh=03_Q7cD1QHklC4b_BxkTwQq-rBieb5lkdad4em_iecnDIFI74AwpQ&oe=66CA6D8A"
              alt="cascos"
              className="mx-auto mt-8"
            />
            <div className="absolute mt-5 left-0 w-full h-full flex items-center justify-center text-white opacity-0 hover:opacity-100">
              <h2 className="text-8xl italic font-sans z-40">Animations</h2>{" "}
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
            src="https://scontent.feoh3-1.fna.fbcdn.net/v/t1.15752-9/437608248_1398045690826142_6578900220504714493_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=9f807c&_nc_eui2=AeFuDkNxflhZ0TnQLPC9sekNE_JKhG7YyS4T8kqEbtjJLh2L2__opRZUzDBnWAIWDchoRCcxlUN56kQiFuxVOzrX&_nc_ohc=PYBccBjW9n0Q7kNvgEzHAUA&_nc_ht=scontent.feoh3-1.fna&oh=03_Q7cD1QFzGFIxadlMVfnWf8-TujQSQ7YoyDOVmpdLG0b603pAGw&oe=66CA72EE"
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
            src="https://scontent.feoh3-1.fna.fbcdn.net/v/t1.15752-9/437316591_7473990932692285_5688287696450042769_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=9f807c&_nc_eui2=AeH387Ooo0uktVRaWgpkQ3ojA-aceQw0rYMD5px5DDStg8RUDUSnW7dsmSY1ybhHarhqdIVsgkXzSaGn3POfhGkH&_nc_ohc=U5s4vB4-29EQ7kNvgFffaCZ&_nc_ht=scontent.feoh3-1.fna&oh=03_Q7cD1QECHX1Emoq-BElIRXXl6Ralwr4S-DyDPVCknotTjTFNvw&oe=66CA62E5"
            alt="lapland"
            className="mx-auto mt-8"
          />
          <div className="absolute mt-5 left-0 w-full h-full flex items-center justify-center text-white opacity-0 hover:opacity-100">
            <h2 className="secondTitle italic font-sans  text-8xl  z-40">
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
            src="https://scontent.feoh3-1.fna.fbcdn.net/v/t1.15752-9/449746215_691643916461095_5598000245293300920_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=9f807c&_nc_eui2=AeHV9vFTNIojh3HBj_Ms_ZD1Gw1IxVv02MEbDUjFW_TYwa_ILIzixT46tFVdv4U3I1d2iGptnbgqEVTAlTqahZyd&_nc_ohc=6S_dnjGAiv0Q7kNvgFq8Nga&_nc_ht=scontent.feoh3-1.fna&oh=03_Q7cD1QG1MFZLxY3AX7hu6Gth0wHYgsscLQOTVqI0bPHTg7eTgg&oe=66CA86BC"
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
            src="https://scontent.feoh3-1.fna.fbcdn.net/v/t1.15752-9/434997285_1759516644539620_1668137813982040004_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=9f807c&_nc_eui2=AeHdMafy0Ck-Kh19w-0zHNas2cMU9t72C-nZwxT23vYL6ZsABA34oXsHKJWoJcxN2GgyxRfMa0PC4lG0B4mUIUPt&_nc_ohc=3xMQiHUN3d4Q7kNvgEia9nt&_nc_ht=scontent.feoh3-1.fna&oh=03_Q7cD1QHtJxWX-5v80u-aTp9U8Ko2sCbYF8rEk_cvUVJvaRTpZA&oe=66CA54F6"
            alt="skyBox"
            className=" mx-auto mt-8"
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
          href="https://sine-waves-texture.vercel.app/"
          aria-label="sineWaves"
          target="_blank"
        >
          <img
            src="https://scontent.feoh3-1.fna.fbcdn.net/v/t1.15752-9/434760537_751961530409367_6282908265636797803_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=9f807c&_nc_eui2=AeGtlK7fmBbGkUwDqdMFgNflFwdhYUEprV8XB2FhQSmtX8bdJshL_lR8suqOKqL5dmbsWdVIJlPU5AuR_EU7dVSt&_nc_ohc=LZdWkTrMbJAQ7kNvgHzNhNS&_nc_ht=scontent.feoh3-1.fna&oh=03_Q7cD1QEP3Zu4nhttfNAjsa6tMnUYP37BVQJJlj5YFBtQALcNTw&oe=66CA6AB5"
            alt="sineWaves"
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
          href="https://light-spark.vercel.app/"
          aria-label="SparkLight"
          target="_blank"
        >
          <img
            src="https://scontent.feoh3-1.fna.fbcdn.net/v/t1.15752-9/449937181_1527427404558774_353074505124488073_n.png?_nc_cat=111&ccb=1-7&_nc_sid=9f807c&_nc_eui2=AeGDC06fQ-dkRErSsVd7--lSvQ7d8qfEYjW9Dt3yp8RiNZIJv8aK5dZrBA1FKxrdE8ASvDzdEwLR4kj4kfvoziWv&_nc_ohc=u414KQ0bIE0Q7kNvgFSwSC4&_nc_ht=scontent.feoh3-1.fna&oh=03_Q7cD1QHJo-6YTBtHt0hetZvBQtM3vqakHYMlyVlO-o410R_3dw&oe=66CA71D1"
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
            src="https://scontent.feoh3-1.fna.fbcdn.net/v/t1.15752-9/437527839_395907763249176_7168703913263305102_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=9f807c&_nc_eui2=AeE6kiC-690QF_ZxlLAqhjfBCSQNOMv4yIYJJA04y_jIhsoAeAFjCeA2MyQezsIqokDXJSrXa7NazwuMVj1Fnixb&_nc_ohc=ziPLu6shGTAQ7kNvgHkJHbQ&_nc_ht=scontent.feoh3-1.fna&oh=03_Q7cD1QFyvt2m8EJZUYzs-z9UUtVGUfk_-ykjhqBLXkFwtsVwiw&oe=66CA7D26"
            alt="logitech"
            className="mx-auto"
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
            src="https://scontent.feoh3-1.fna.fbcdn.net/v/t1.15752-9/450784490_813581444220556_5405473915107737496_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=9f807c&_nc_eui2=AeHEP10RCelg57wAn52B7CXcxmyNnhCPuCLGbI2eEI-4InWayHn4W5Z6Q70inM1YN4gN2_pMySWkyCit7aGbmJJQ&_nc_ohc=jJaiAjFqalIQ7kNvgHyBp-C&_nc_ht=scontent.feoh3-1.fna&oh=03_Q7cD1QHjF4qFQaC72l6ThQOwL7pNDXrxuN_K2cB_-OsaZ9IBrA&oe=66CA6C42"
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
