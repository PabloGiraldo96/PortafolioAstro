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
              src="https://scontent.feoh3-1.fna.fbcdn.net/v/t1.15752-9/453355921_3102014733268877_522087315941961482_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=9f807c&_nc_ohc=S6TTE9_D7MIQ7kNvgGsL9u4&_nc_oc=AdhSC8gBW5tV1_6NIZYkcV4z8IOv1TTXrc6tKykDfRUD9kh3Zwg2VA_KMzQwxlUMj-j3epEYIk5mt1KbC1k-eypU&_nc_zt=23&_nc_ht=scontent.feoh3-1.fna&oh=03_Q7cD1gHgZ6e-77kk2vojNA0zLFmpebqvuv-de1ksLhzSIOh40g&oe=6789CA9F"
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
              src="https://scontent.feoh3-1.fna.fbcdn.net/v/t1.15752-9/453707361_1257609718979204_5656136358129985642_n.jpg?_nc_cat=107&ccb=1-7&_nc_sid=9f807c&_nc_ohc=R-AYpiGgbKwQ7kNvgEF-0dN&_nc_oc=AdjuT4vpG5zK0eOrxRBwUt_2Pbocd4d9sTPmCGvuSl9Iu76EOCt-yO8bHgvgkfWPy5c9YF_CGAOIIaWBmpnOK7_E&_nc_zt=23&_nc_ht=scontent.feoh3-1.fna&oh=03_Q7cD1gGMrm8XpBL4fHxPK7EbkwCvZk_RSrTcTB9gz7Wf616Szg&oe=6789D6B3"
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
              src="https://scontent.feoh3-1.fna.fbcdn.net/v/t1.15752-9/362432012_2923533341110987_7059030799891607228_n.png?_nc_cat=103&ccb=1-7&_nc_sid=9f807c&_nc_ohc=ZR8wRwZc6c0Q7kNvgFsQMuF&_nc_oc=Adi_OOzEvo0CfMaNQUfPNgmLBvzRFcQNCzSrihyWCtMkuzdvHAO1VaKRkZAYpcyl7p91YEvqoY0i9lS233GgLAkz&_nc_zt=23&_nc_ht=scontent.feoh3-1.fna&oh=03_Q7cD1gHRLTTl0P9tYZtu7s0ZEeZBjyax5xlkXIM5kDzC_QhJLg&oe=6789CF4A"
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
            src="https://scontent.feoh3-1.fna.fbcdn.net/v/t1.15752-9/434644206_399144172924608_7255756708533822728_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=9f807c&_nc_ohc=ymPGIPsoez4Q7kNvgFZz1f_&_nc_oc=AdgaFg2ECafFHH5yGG5R2wascboDEdjB-lxFN5ENJCbxVW2mpddFUm7U4Xoohtv_6dXUFiMrqZJRMkkra87smNPv&_nc_zt=23&_nc_ht=scontent.feoh3-1.fna&oh=03_Q7cD1gHQC11DLsUlYISWcASHtG266P8Pcknsd8koD_L3hzoRog&oe=6789EE4C"
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
            src="https://scontent.feoh3-1.fna.fbcdn.net/v/t1.15752-9/437316591_7473990932692285_5688287696450042769_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=9f807c&_nc_ohc=-V5CPOCFoN0Q7kNvgGvLN5M&_nc_oc=Adg1tISyGZ2L7x5fcBqUC5XjDR8aFjMQxhqjzK8Tqj_zGBhaFO3nq49P38za3RDBRsc_zlm4iHog5su7Cwc10DcJ&_nc_zt=23&_nc_ht=scontent.feoh3-1.fna&oh=03_Q7cD1gGvt4rUUAXNXUUPEH_rauwxNC2BowATt8CFns-wN7dlTQ&oe=6789FCE5"
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
            src="https://scontent.feoh3-1.fna.fbcdn.net/v/t1.15752-9/449746215_691643916461095_5598000245293300920_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=9f807c&_nc_ohc=djkvXg1R_U4Q7kNvgFrpvzM&_nc_oc=AdhDSXeVZ4Jyfl9OpXnIxoz-ITRDUFkSfsJo9R-WSshRRZ5BEMVIRI9mYSRwpCSyRiJrV8_bTDnXvQFqozSpbHe9&_nc_zt=23&_nc_ht=scontent.feoh3-1.fna&oh=03_Q7cD1gFOOZbwlRDog4N4wwTC7WA3fe2uzwB76IlvjQsOlUr5pg&oe=6789E87C"
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
            src="https://scontent.feoh3-1.fna.fbcdn.net/v/t1.15752-9/434997285_1759516644539620_1668137813982040004_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=9f807c&_nc_ohc=5OVeAKE0HDsQ7kNvgFtDlMZ&_nc_oc=Adjc_Ql6uugDixPWaIimaMjSBTSXRb6C-yjuSoLV2bLu2XiknA42wdelSwKygE2qMxZ6pKdzIjSf2WDzasiedDW9&_nc_zt=23&_nc_ht=scontent.feoh3-1.fna&oh=03_Q7cD1gHsLrtMgKO5rcbSWUdf-xKhibHKHP1rQgXvxrjSRj5m-A&oe=6789EEF6"
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
            src="https://scontent.feoh3-1.fna.fbcdn.net/v/t1.15752-9/434760537_751961530409367_6282908265636797803_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=9f807c&_nc_ohc=SewVSjvDStUQ7kNvgGpd2NW&_nc_oc=AdjZSz3g783-Gz_pNJ07y1GJbkBLJaiamHdWShh7qsvvE-6w_VSdf_OZX3EkN-dmSPxoiJG65PtWapdyZF5FONfr&_nc_zt=23&_nc_ht=scontent.feoh3-1.fna&oh=03_Q7cD1gF5jIsP3ROusyZH9RX6J-6XhQVdf9ongAUSkTSth_cB1A&oe=6789CC75"
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
            src="https://scontent.feoh3-1.fna.fbcdn.net/v/t1.15752-9/449937181_1527427404558774_353074505124488073_n.png?_nc_cat=111&ccb=1-7&_nc_sid=9f807c&_nc_ohc=F_wLWJN9x24Q7kNvgFnAwSt&_nc_oc=AdgiSvoH-ZctpEqdI2jhYKpRtyttYhILii_bRFkn_3T2i_UfiC_Jfieb01FN_FghjPzBze8xGWtEL5Y28SBvLZ01&_nc_zt=23&_nc_ht=scontent.feoh3-1.fna&oh=03_Q7cD1gFZhKmbF3mcSrGwbTpDYMDpYyMlMwjrsdpju-TnibtK4A&oe=6789D391"
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
            src="https://scontent.feoh3-1.fna.fbcdn.net/v/t1.15752-9/437527839_395907763249176_7168703913263305102_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=9f807c&_nc_ohc=5ssfqOtu0moQ7kNvgHzf5E0&_nc_oc=AdjBQ0vVxTNjnjyrzxjTfAU5K0kAMCHo5XXvVVOjsP7nKnl0HMmLtYiez4KZyIKghfCctDaKtKLcTMlaNUMDPU70&_nc_zt=23&_nc_ht=scontent.feoh3-1.fna&oh=03_Q7cD1gGU_T-QwFD3PxnQhdqeYvegyywsE1hwMCV03BVaPXE2Bg&oe=6789DEE6"
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
            src="https://scontent.feoh3-1.fna.fbcdn.net/v/t1.15752-9/450784490_813581444220556_5405473915107737496_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=9f807c&_nc_ohc=8XrTh1_KUIsQ7kNvgHshaAa&_nc_oc=AdibhNyLYw9e2GMA3rDfQEXPwg0HoNWWuKilV5mFotIS3gz87levFXWm8NPlUJSdsPVGYSnnMcReW-B39ddlPa8w&_nc_zt=23&_nc_ht=scontent.feoh3-1.fna&oh=03_Q7cD1gFeGMXWsoFknXyHQ_B6Vw8CL1hHKqobKAul9m2ALEYAUQ&oe=6789CE02"
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
