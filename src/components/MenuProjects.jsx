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
              src="https://scontent.feoh3-1.fna.fbcdn.net/v/t1.15752-9/453355921_3102014733268877_522087315941961482_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=9f807c&_nc_eui2=AeGBtznNQgzMIWVSbQBKHjTRgXWt7QqSkyyBda3tCpKTLLcXAkxxisnz5lHMjPlNj1vrtIlNdLb1eZomYScHG4y5&_nc_ohc=PMhwiLOvpOMQ7kNvgELMWg-&_nc_ht=scontent.feoh3-1.fna&_nc_gid=AjiEiJeSmO_BNKcLTbtd-IN&oh=03_Q7cD1QFvuVrFtBlT_IiXmZ3lkX8vkAfCXiur_3KK-NBoidPPyg&oe=670D6D1F"
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
              src="https://scontent.feoh3-1.fna.fbcdn.net/v/t1.15752-9/453707361_1257609718979204_5656136358129985642_n.jpg?_nc_cat=107&ccb=1-7&_nc_sid=9f807c&_nc_ohc=0bkUF31CAjYQ7kNvgF3pCTG&_nc_ht=scontent.feoh3-1.fna&oh=03_Q7cD1QHHBiXZtgoSkECfLdxw0bFb4S7t4qPHe9gXU5PltPlHRQ&oe=66F69F33"
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
              src="https://scontent.feoh3-1.fna.fbcdn.net/v/t1.15752-9/362432012_2923533341110987_7059030799891607228_n.png?_nc_cat=103&ccb=1-7&_nc_sid=9f807c&_nc_ohc=lemwqK4AmTQQ7kNvgFuRIJQ&_nc_ht=scontent.feoh3-1.fna&oh=03_Q7cD1QFHCRsWRFqfFwvaUaGGwG2DRctsmecYFsEC9pc2q9Hc0w&oe=66F6D00A"
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
            src="https://scontent.feoh3-1.fna.fbcdn.net/v/t1.15752-9/437608248_1398045690826142_6578900220504714493_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=9f807c&_nc_ohc=k9Ei8hitZdEQ7kNvgEIOJz7&_nc_ht=scontent.feoh3-1.fna&oh=03_Q7cD1QFPtWBUZOOfexUiFL3RXz7nFWAxmrv9weURLhtP7oX5OQ&oe=66F69D2E"
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
            src="https://scontent.feoh3-1.fna.fbcdn.net/v/t1.15752-9/437316591_7473990932692285_5688287696450042769_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=9f807c&_nc_ohc=pnX17Wg74hoQ7kNvgEd1Sjq&_nc_ht=scontent.feoh3-1.fna&oh=03_Q7cD1QEj1htLzN-1Ha5pNqDnkV57s3cgwYAHUHbVsETq-Se93w&oe=66F6C565"
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
            src="https://scontent.feoh3-1.fna.fbcdn.net/v/t1.15752-9/449746215_691643916461095_5598000245293300920_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=9f807c&_nc_ohc=SnGeAH5YjxUQ7kNvgEhrf4x&_nc_ht=scontent.feoh3-1.fna&oh=03_Q7cD1QH8ynHJ-A2mEjutCL-9k3fJiJUO0RwwMizeD66oyTsXSQ&oe=66F6B0FC"
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
            src="https://scontent.feoh3-1.fna.fbcdn.net/v/t1.15752-9/434997285_1759516644539620_1668137813982040004_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=9f807c&_nc_ohc=4gNzOZRKEp4Q7kNvgEF195H&_nc_ht=scontent.feoh3-1.fna&oh=03_Q7cD1QGCiSwKvskOl8DDTekTH6PNUHAVbppUv69GPAr9uj418w&oe=66F6B776"
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
            src="https://scontent.feoh3-1.fna.fbcdn.net/v/t1.15752-9/435381914_965643411517912_2049324314017588983_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=9f807c&_nc_ohc=gfWdEdIa4-UQ7kNvgHjvG6U&_nc_ht=scontent.feoh3-1.fna&oh=03_Q7cD1QHTcf9Zml_cWwPHdvNUUxszAsjxyHhBxQk2axO5hv9jRg&oe=66F6A023"
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
            src="https://scontent.feoh3-1.fna.fbcdn.net/v/t1.15752-9/449937181_1527427404558774_353074505124488073_n.png?_nc_cat=111&ccb=1-7&_nc_sid=9f807c&_nc_ohc=w_2FLgA8dWcQ7kNvgHJVUo-&_nc_ht=scontent.feoh3-1.fna&oh=03_Q7cD1QGeuxyjgh_WYr7MT4bxkwfTI-qtsr88SeZPO_CFbp5V5Q&oe=66F69C11"
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
            src="https://scontent.feoh3-1.fna.fbcdn.net/v/t1.15752-9/435226448_423415883608756_1321386835087166257_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=9f807c&_nc_ohc=jPB5U7Hp-Y0Q7kNvgFFv5jt&_nc_ht=scontent.feoh3-1.fna&oh=03_Q7cD1QFh8tI-znKDnofz_xn7oJF4kMjOrz80XF1YZxBWijgdpQ&oe=66F6CE01"
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
            src="https://scontent.feoh3-1.fna.fbcdn.net/v/t1.15752-9/450784490_813581444220556_5405473915107737496_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=9f807c&_nc_ohc=Ke8TqhTXJysQ7kNvgHrfgTY&_nc_ht=scontent.feoh3-1.fna&oh=03_Q7cD1QF_T2s9sx1PEN4KHZQUzdSQdba9GsgMweCeWH-vMcky6Q&oe=66F6CEC2"
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
