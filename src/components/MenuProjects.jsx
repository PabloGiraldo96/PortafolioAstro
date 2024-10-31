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
              src="https://scontent.feoh3-1.fna.fbcdn.net/v/t1.15752-9/454219686_878963590779342_8658646667980001860_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=9f807c&_nc_eui2=AeFgOiVFRwZp6MDiWB8WCdL7mQAJ9AwFx5CZAAn0DAXHkPhbhTz3VN7folrM8x3O5GfqroOuGpYhLirR0IkE8z3x&_nc_ohc=3Z-m4ZjXeAAQ7kNvgGbJj_N&_nc_zt=23&_nc_ht=scontent.feoh3-1.fna&_nc_gid=Atcs6Q_bKqy2WR-kddCsyqG&oh=03_Q7cD1QE46m75HdgjmjmOyrLOm4QBYftujHrdITv1EeNBQh-25w&oe=674A0403"
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
              src="https://scontent.feoh3-1.fna.fbcdn.net/v/t1.15752-9/362432012_2923533341110987_7059030799891607228_n.png?_nc_cat=103&ccb=1-7&_nc_sid=9f807c&_nc_eui2=AeEY7E5hOmhBvBGgOejnfjF3NHC0Fg-KPI80cLQWD4o8j2sv3jcBp11O6TcbYg_iynfx515YTWIUBV7IP-Q0KZO4&_nc_ohc=Bc2JbllcGCUQ7kNvgHxeVvO&_nc_zt=23&_nc_ht=scontent.feoh3-1.fna&_nc_gid=AGSAqruVqzhXLM_k7KnvQ8F&oh=03_Q7cD1QF_eSSYhOsIq5Kg-DkY1O63wAcIdMAZbnasCvZhJeUuGQ&oe=674A16CA"
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
            src="https://scontent.feoh3-1.fna.fbcdn.net/v/t1.15752-9/437608248_1398045690826142_6578900220504714493_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=9f807c&_nc_eui2=AeFuDkNxflhZ0TnQLPC9sekNE_JKhG7YyS4T8kqEbtjJLh2L2__opRZUzDBnWAIWDchoRCcxlUN56kQiFuxVOzrX&_nc_ohc=M_8ApT_dVHMQ7kNvgHgnZes&_nc_zt=23&_nc_ht=scontent.feoh3-1.fna&_nc_gid=AGSAqruVqzhXLM_k7KnvQ8F&oh=03_Q7cD1QGpG7eZF7PFsuqMia6dbfBTaQhK7JI8_NUg9y1tbZC22w&oe=674A1C2E"
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
            src="https://scontent.feoh3-1.fna.fbcdn.net/v/t1.15752-9/356788891_800656961457839_8550209978705014080_n.png?_nc_cat=105&ccb=1-7&_nc_sid=9f807c&_nc_eui2=AeHA_Td8fQelcyqHhTj37XPucpJ-F9yGf8pykn4X3IZ_yiueANVhGrTQeAlJYSByTnII-esOiquVdcxACMF-RCd6&_nc_ohc=zaxgqVj_kBEQ7kNvgFyvw2J&_nc_zt=23&_nc_ht=scontent.feoh3-1.fna&_nc_gid=AGSAqruVqzhXLM_k7KnvQ8F&oh=03_Q7cD1QG5-tfzoGlGstrjuPKAQDewANoQ8VlBor8IJpNIu-auNQ&oe=674A17EA"
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
            src="https://scontent.feoh3-1.fna.fbcdn.net/v/t1.15752-9/449746215_691643916461095_5598000245293300920_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=9f807c&_nc_eui2=AeHV9vFTNIojh3HBj_Ms_ZD1Gw1IxVv02MEbDUjFW_TYwa_ILIzixT46tFVdv4U3I1d2iGptnbgqEVTAlTqahZyd&_nc_ohc=cecvxsjQclcQ7kNvgHVDWvs&_nc_zt=23&_nc_ht=scontent.feoh3-1.fna&_nc_gid=AGSAqruVqzhXLM_k7KnvQ8F&oh=03_Q7cD1QH6yQbWNasTg-HMcyTIMB3YPrADg4TJ8hYgntxQvmGGEA&oe=674A2FFC"
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
            src="https://scontent.feoh3-1.fna.fbcdn.net/v/t1.15752-9/434997285_1759516644539620_1668137813982040004_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=9f807c&_nc_eui2=AeHdMafy0Ck-Kh19w-0zHNas2cMU9t72C-nZwxT23vYL6ZsABA34oXsHKJWoJcxN2GgyxRfMa0PC4lG0B4mUIUPt&_nc_ohc=V6H71dQziOoQ7kNvgGYlgDQ&_nc_zt=23&_nc_ht=scontent.feoh3-1.fna&_nc_gid=AGSAqruVqzhXLM_k7KnvQ8F&oh=03_Q7cD1QH3tmPbwYxjvDimWa-Sq126hh4aUctfKhbPBY-D103GAA&oe=674A3676"
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
            src="https://scontent.feoh3-1.fna.fbcdn.net/v/t1.15752-9/435381914_965643411517912_2049324314017588983_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=9f807c&_nc_eui2=AeG20_OBYQDBMKbUs8-ZIYin3tbK54pjguDe1srnimOC4FrMEmYwkkH_Yy9J2Yx9MaIu2B4HShNrP21MUMnx21R9&_nc_ohc=zYzBDwH6zNcQ7kNvgEdz6Fo&_nc_zt=23&_nc_ht=scontent.feoh3-1.fna&_nc_gid=AGSAqruVqzhXLM_k7KnvQ8F&oh=03_Q7cD1QEtWz3kbI_SjlnD9GfHZvM7UndSV1WN80ntGofka3mpww&oe=674A1F23"
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
            src="https://scontent.feoh3-1.fna.fbcdn.net/v/t1.15752-9/449937181_1527427404558774_353074505124488073_n.png?_nc_cat=111&ccb=1-7&_nc_sid=9f807c&_nc_eui2=AeGDC06fQ-dkRErSsVd7--lSvQ7d8qfEYjW9Dt3yp8RiNZIJv8aK5dZrBA1FKxrdE8ASvDzdEwLR4kj4kfvoziWv&_nc_ohc=xvMaOKBfB4MQ7kNvgHqZ3qk&_nc_zt=23&_nc_ht=scontent.feoh3-1.fna&_nc_gid=AGSAqruVqzhXLM_k7KnvQ8F&oh=03_Q7cD1QGCUnkmeDneC07XR8IlPLC24XlwMys-vdzQNIK_2vcZeA&oe=674A1B11"
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
            src="https://scontent.feoh3-1.fna.fbcdn.net/v/t1.15752-9/437527839_395907763249176_7168703913263305102_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=9f807c&_nc_eui2=AeE6kiC-690QF_ZxlLAqhjfBCSQNOMv4yIYJJA04y_jIhsoAeAFjCeA2MyQezsIqokDXJSrXa7NazwuMVj1Fnixb&_nc_ohc=cgQJSUk3DdAQ7kNvgGh1sIh&_nc_zt=23&_nc_ht=scontent.feoh3-1.fna&_nc_gid=AGSAqruVqzhXLM_k7KnvQ8F&oh=03_Q7cD1QEJPavqH5f-61KT08n9Wkp_vCTw2ftNlQg0T3L3jCXsAA&oe=674A2666"
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
            src="https://scontent.feoh3-1.fna.fbcdn.net/v/t1.15752-9/450784490_813581444220556_5405473915107737496_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=9f807c&_nc_eui2=AeHEP10RCelg57wAn52B7CXcxmyNnhCPuCLGbI2eEI-4InWayHn4W5Z6Q70inM1YN4gN2_pMySWkyCit7aGbmJJQ&_nc_ohc=wn3rPbF9bzQQ7kNvgGZ-rP7&_nc_zt=23&_nc_ht=scontent.feoh3-1.fna&_nc_gid=AGSAqruVqzhXLM_k7KnvQ8F&oh=03_Q7cD1QEzJnIkhuwyQwKaeOodBS0vzeXkCeDhbJ1mR29khEWeyQ&oe=674A1582"
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
