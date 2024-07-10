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
      className="h-74 bg-black"
    >
      <SwiperSlide>
        <a
          href="https://cascos-landing.vercel.app/"
          aria-label="cascos"
          target="_blank"
        >
          <img
            src="https://scontent.feoh3-1.fna.fbcdn.net/v/t1.15752-9/362432012_2923533341110987_7059030799891607228_n.png?_nc_cat=103&ccb=1-7&_nc_sid=9f807c&_nc_ohc=MUbuas6tJIcQ7kNvgE73RDY&_nc_ht=scontent.feoh3-1.fna&oh=03_Q7cD1QF9v4NfMx6dA7m3vD1m1EmqQPP5qdGicWdjoB8f7DlfSg&oe=66A237CA"
            alt="cascos"
            className="mx-auto mt-8"
          />
        </a>
      </SwiperSlide>
      <SwiperSlide>
        <a
          href="https://atom-model.vercel.app/"
          aria-label="atomModel"
          target="_blank"
        >
          <img
            src="https://scontent.feoh3-1.fna.fbcdn.net/v/t1.15752-9/437608248_1398045690826142_6578900220504714493_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=9f807c&_nc_ohc=Zhpgxzm1qIsQ7kNvgGTKvce&_nc_ht=scontent.feoh3-1.fna&oh=03_Q7cD1QFlMGbrtsURNzOldUS7K9HctNebimRP68MW-SLwtTctDA&oe=66A23D2E"
            alt="atomModel"
            className="mx-auto mt-6"
          />
        </a>
      </SwiperSlide>
      <SwiperSlide>
        <a
          href="https://skybox-modeling.vercel.app/"
          aria-label="skybox"
          target="_blank"
        >
          <img
            src="https://scontent.feoh3-1.fna.fbcdn.net/v/t1.15752-9/434997285_1759516644539620_1668137813982040004_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=9f807c&_nc_ohc=jYXiOZLnd98Q7kNvgHM0ItQ&_nc_ht=scontent.feoh3-1.fna&oh=03_Q7cD1QETLrFDsi0o9SnKtCmiI9iG2nZ7kybOLs3aifTzUDdJ3w&oe=66A25776"
            alt="skyBox"
            className=" mx-auto mt-8"
          />
        </a>
      </SwiperSlide>
      <SwiperSlide>
        <a
          href="https://sine-waves-texture.vercel.app/"
          aria-label="sineWaves"
          target="_blank"
        >
          <img
            src="https://scontent.feoh3-1.fna.fbcdn.net/v/t1.15752-9/434777790_935123398292275_8041764204225360167_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=9f807c&_nc_ohc=8RxXm3nHuHUQ7kNvgEZYqN0&_nc_ht=scontent.feoh3-1.fna&oh=03_Q7cD1QGyqB_NGsi6VDyVFWbjdPmtigak7AZvQ-PBB2uhg5_AKQ&oe=66A242ED"
            alt="sineWaves"
            className="mx-auto mt-8"
          />
        </a>
      </SwiperSlide>
      <SwiperSlide>
        <a
          href="https://light-spark.vercel.app/"
          aria-label="SparkLight"
          target="_blank"
        >
          <img
            src="https://scontent.feoh3-1.fna.fbcdn.net/v/t1.15752-9/449937181_1527427404558774_353074505124488073_n.png?_nc_cat=111&ccb=1-7&_nc_sid=9f807c&_nc_eui2=AeGDC06fQ-dkRErSsVd7--lSvQ7d8qfEYjW9Dt3yp8RiNZIJv8aK5dZrBA1FKxrdE8ASvDzdEwLR4kj4kfvoziWv&_nc_ohc=diWdX5eUlFoQ7kNvgFRN8sO&_nc_ht=scontent.feoh3-1.fna&oh=03_Q7cD1QGb0Y8ucRmX4t9Z_IDIiMjnCXUTnf1zfTb3bcJrHvXFSA&oe=66B559D1"
            alt="sparkLight"
            className="mx-auto mt-8"
          />
        </a>
      </SwiperSlide>
      <SwiperSlide>
        <a
          href="https://lapland-zone.vercel.app/"
          aria-label="cascos"
          target="_blank"
        >
          <img
            src="https://scontent.feoh3-1.fna.fbcdn.net/v/t1.15752-9/356788891_800656961457839_8550209978705014080_n.png?_nc_cat=105&ccb=1-7&_nc_sid=9f807c&_nc_ohc=L74J6NAvS84Q7kNvgEzlNLJ&_nc_ht=scontent.feoh3-1.fna&oh=03_Q7cD1QGUkMRRyn9MCQlHjFBqxT-02Uken1YC7IFot5rhQBR1Ow&oe=66A238EA"
            alt="lapland"
            className="mx-auto mt-8"
          />
        </a>
      </SwiperSlide>
      <SwiperSlide>
        <a
          href="https://logitech-educational-landing.vercel.app/"
          aria-label="cascos"
          target="_blank"
        >
          <img
            src="https://scontent.feoh3-1.fna.fbcdn.net/v/t1.15752-9/437527839_395907763249176_7168703913263305102_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=9f807c&_nc_ohc=PrguhFQkfgcQ7kNvgGZz3fT&_nc_ht=scontent.feoh3-1.fna&oh=03_Q7cD1QGhRnepnwSe7nDsx7w2LxNcbcWekqW5EQKtQ-vcjlI49w&oe=66A24766"
            alt="logitech"
            className="mx-auto"
          />
        </a>
      </SwiperSlide>
      <SwiperSlide>
        <a
          href="https://og-house.vercel.app/"
          aria-label="cascos"
          target="_blank"
        >
          <img
            src="https://scontent.feoh3-1.fna.fbcdn.net/v/t1.15752-9/436304716_3689605737989262_5930056808360364867_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=9f807c&_nc_ohc=GiTGj9savtsQ7kNvgGSV3EZ&_nc_ht=scontent.feoh3-1.fna&oh=03_Q7cD1QGiA2P3R046tYYJAHrk81CA0pNpu9uOMetqSF017s9Kew&oe=66A23F43"
            alt="ogHouse"
            className="mx-auto mt-8"
          />
        </a>
      </SwiperSlide>
    </Swiper>
  );
};
