import React from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import "./hero.css";

// import required modules
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import { Button } from "antd";
import { Link } from "react-router-dom";
const Hero: React.FC = () => {
  return (
    <div style={{ position: "relative", width: "100%" }}>
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper"
      >
        <SwiperSlide>
          <img
            src="https://res.cloudinary.com/dbwftcxvx/image/upload/v1724628225/slider-1_wpbzmk.jpg"
            alt="slider Img"
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            src="https://res.cloudinary.com/dbwftcxvx/image/upload/v1724628225/slider-2_nuy9yv.jpg"
            alt="slider Img"
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            src="https://res.cloudinary.com/dbwftcxvx/image/upload/v1724628225/slider-3_xdnnpp.jpg"
            alt="slider Img"
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            src="https://res.cloudinary.com/dbwftcxvx/image/upload/v1724628225/slider-4_jgujhf.jpg"
            alt="slider Img"
          />
        </SwiperSlide>
      </Swiper>
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          background: "#102d2e8c",
          zIndex: 10,
          color: "white",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <h1 style={{ fontSize: "64px", textAlign: "center" }}>
          Book Your Ideal Meeting Room with Ease.
        </h1>
        <h3 style={{ fontSize: "32px", textAlign: "center" }}>
          Efficient, hassle-free room booking for all your meeting needs
        </h3>
        <Link style={{ marginTop: "10px" }} to={"/meeting-rooms"}>
          <Button>Book Now</Button>
        </Link>
      </div>
    </div>
  );
};

export default Hero;
