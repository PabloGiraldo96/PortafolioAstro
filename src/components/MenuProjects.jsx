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
              src="https://scontent.feoh3-1.fna.fbcdn.net/v/t1.15752-9/453355921_3102014733268877_522087315941961482_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=9f807c&_nc_ohc=mkZ--YLAnNEQ7kNvgHo2JWq&_nc_oc=Adibcecuyzz_Bf7PSxQAR1_yY4TSiXgyfFCsOLJ5o5NoYbtTj7-JNpf3FgLUM2j1ViqiucutgN81GvfdwQkd2I1M&_nc_zt=23&_nc_ht=scontent.feoh3-1.fna&oh=03_Q7cD1gGrOFpt43ghYvlHpex9qp64_gXn8K7j_9T3ozV-DtqkRQ&oe=67B2E15F"
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
              src="https://scontent.feoh3-1.fna.fbcdn.net/v/t1.15752-9/453707361_1257609718979204_5656136358129985642_n.jpg?_nc_cat=107&ccb=1-7&_nc_sid=9f807c&_nc_ohc=TL_CI2KAM4MQ7kNvgHaLhU8&_nc_oc=AdjgCn4r9v0KDKUURDd21WZ0qwLrpnJKSgBlyfwcSb9bEG10tBrnEor7Pnf3AB3XAhQPUEEN_mx18jrQ2Mk24oWD&_nc_zt=23&_nc_ht=scontent.feoh3-1.fna&oh=03_Q7cD1gHNjreCR4zkAS-TLwJVEsthIYSavGRQy9IfHbq4V6_KRw&oe=67B2ED73"
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
              src="https://scontent.feoh3-1.fna.fbcdn.net/v/t1.15752-9/362432012_2923533341110987_7059030799891607228_n.png?_nc_cat=103&ccb=1-7&_nc_sid=9f807c&_nc_ohc=yAYw25Cqn7gQ7kNvgFuoLIQ&_nc_oc=AdhzqZ4j_4otIw1EjBYyXOxEJ93q7jEPAQ8CWjFnMNSHImlOnNJBeD0GRtECD0LbIfeLBdXCB8vb5ItThBgn4wlV&_nc_zt=23&_nc_ht=scontent.feoh3-1.fna&oh=03_Q7cD1gEh4gi6ps4-W-Y-C49bMD7DrzPlI05tV0TcGn1Ad52z9w&oe=67B2E60A"
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
            src="https://scontent.feoh3-1.fna.fbcdn.net/v/t1.15752-9/434644206_399144172924608_7255756708533822728_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=9f807c&_nc_ohc=puSWccVbvScQ7kNvgFdtSvh&_nc_oc=Adjv0GF9HbkA0E_AnHe3x0vVzqqpVRkqV079HIzDf3vOpxWcYBh3ZBGi1EigsWTUZhrohZ9Q-buZdk2RzvxtA_aU&_nc_zt=23&_nc_ht=scontent.feoh3-1.fna&oh=03_Q7cD1gGMcDLey4vm20C_sM7ZswnpmPG5SIHMCEIbfLVNCNidBA&oe=67B3050C"
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
            src="https://scontent.feoh3-1.fna.fbcdn.net/v/t1.15752-9/356788891_800656961457839_8550209978705014080_n.png?_nc_cat=105&ccb=1-7&_nc_sid=9f807c&_nc_ohc=Bkn5IbZffN4Q7kNvgHT3T-I&_nc_oc=Adj9QkkJU0JdE2gGgWrNzopKA_kLwvkaKmANqyVlNnvvurq-x4iNkNZqj__JK7PLWNaPCHvgs5xb2g3KVcH36sGB&_nc_zt=23&_nc_ht=scontent.feoh3-1.fna&oh=03_Q7cD1gGOJDRwglkJmwm-INZ4tIql3UGVAfiaE9SDl0g-OQDmTA&oe=67B2E72A"
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
            src="https://scontent.feoh3-1.fna.fbcdn.net/v/t1.15752-9/449746215_691643916461095_5598000245293300920_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=9f807c&_nc_ohc=ZAkeawRZyOMQ7kNvgHwBmA3&_nc_oc=Adg9TeMHIMPVF-AcQe9GZsyTqCI75EltXP_a4Pz-va7ij_NpyU9DOthGVn2asqGadUQVhUsNEEkrIroU5PjbhfIe&_nc_zt=23&_nc_ht=scontent.feoh3-1.fna&oh=03_Q7cD1gHaSaYzrMwB6YIGD4maQkaPWOCjD9moFD1Rf-FdHpH7Gg&oe=67B2FF3C"
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
            src="https://scontent.feoh3-1.fna.fbcdn.net/v/t1.15752-9/434997285_1759516644539620_1668137813982040004_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=9f807c&_nc_ohc=wia1b4CxfjUQ7kNvgGDjmpw&_nc_oc=Adgc_30S3gA2vDfh6Z_cphNuM4JXHgy4T_vS6GFIpySqnlvQjwCgdfxpeGtWjBd0pWX4PR9blXA-yTAuHCoOWrP-&_nc_zt=23&_nc_ht=scontent.feoh3-1.fna&oh=03_Q7cD1gF1FSQx_z2WPQAJwq4NyXSLUOR88yHaRFWcLFf89rRPkQ&oe=67B305B6"
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
            src="https://scontent.feoh3-1.fna.fbcdn.net/v/t1.15752-9/435381914_965643411517912_2049324314017588983_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=9f807c&_nc_ohc=axhrRawWazwQ7kNvgFWAplh&_nc_oc=AdiEwBEm0J2uzrDOQFG7AcfVqEFozYamxhhSTsEBsPsPsFWLevifV7LdvRF1N_I85gamq2dUB-r74ADlUehSzdi4&_nc_zt=23&_nc_ht=scontent.feoh3-1.fna&oh=03_Q7cD1gGMkelDWu4B0MbknITLe0c0WMmVpxOSYPDYU49Le1x-Aw&oe=67B2EE63"
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
            src="https://scontent.feoh3-1.fna.fbcdn.net/v/t1.15752-9/449937181_1527427404558774_353074505124488073_n.png?_nc_cat=111&ccb=1-7&_nc_sid=9f807c&_nc_ohc=XdyQkD2ClR8Q7kNvgFBAkWL&_nc_oc=AdjTZh0altcCDDEzBWAyYuwkFFb1hFepRBiUruSl0uueZ2zQPs43eq0relUxqe8hLrX8ZhhWoJFtvLtdMRpRN12P&_nc_zt=23&_nc_ht=scontent.feoh3-1.fna&oh=03_Q7cD1gHGtRxq3MWtx3C41VH6qOkk9-udUlpErsbYRXp9mPZaOQ&oe=67B2EA51"
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
            src="https://scontent.feoh3-1.fna.fbcdn.net/v/t1.15752-9/437527839_395907763249176_7168703913263305102_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=9f807c&_nc_ohc=v_xnj9PDSGAQ7kNvgGaWHlt&_nc_oc=Adj5H1EJA_OisitWtdMDznySna1U2GgQKJ0pv-sZE6Xyk26zX6k3j1CpZrwSHo4iTC7duDVC8d0o6Ioerscl1lKY&_nc_zt=23&_nc_ht=scontent.feoh3-1.fna&oh=03_Q7cD1gGZLzrNKAT6MVq1T2KFJ5nsHh1L0R4xkQUYjMKdI1rBAA&oe=67B2F5A6"
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
            src="https://scontent.feoh3-1.fna.fbcdn.net/v/t1.15752-9/450784490_813581444220556_5405473915107737496_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=9f807c&_nc_ohc=JQbG5y0Uv7MQ7kNvgHEFGfn&_nc_oc=AdihOT4AUW2gMktzNQkdJSGRf4Ff4kn7gKRn-5rDJGvQNjVv4sbSwQNIs7g7xGLryGp5nXjFvfA_uRvWWbSMn_mv&_nc_zt=23&_nc_ht=scontent.feoh3-1.fna&oh=03_Q7cD1gFauQT2-51DbGbjx_fl-UEY7oYeS3xKebf9-CrntGgjOQ&oe=67B2E4C2"
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
