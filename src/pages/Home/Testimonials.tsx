import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/autoplay";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Card } from "antd";
import SectionHeading from "../../components/SectionHeading";

const testimonials = [
  {
    name: "John Doe",
    role: "CEO, Tech Corp",
    testimonial:
      "This booking system is incredible! The process is smooth and straightforward. I was able to book a meeting room in just a few clicks.",
    image:
      "https://res.cloudinary.com/dbwftcxvx/image/upload/v1726165578/user2_eqy93v.jpg",
  },
  {
    name: "Jane Smith",
    role: "CTO, Innovation Labs",
    testimonial:
      "Absolutely love the user experience. The real-time availability feature is a game-changer. It’s so easy to find the perfect room.",
    image:
      "https://res.cloudinary.com/dbwftcxvx/image/upload/v1726165578/user8_kjaewb.jpg",
  },
  {
    name: "Michael Johnson",
    role: "Project Manager, BuildX",
    testimonial:
      "Efficient, intuitive, and reliable. The support team is also very responsive. Highly recommend this service!",
    image:
      "https://res.cloudinary.com/dbwftcxvx/image/upload/v1726165578/user10_s6hknx.jpg",
  },
  {
    name: "Emily Davis",
    role: "Entrepreneur, Startup Hub",
    testimonial:
      "Secure transactions and seamless booking. I can book rooms quickly and focus on my meetings. Great service!",
    image:
      "https://res.cloudinary.com/dbwftcxvx/image/upload/v1726165578/user1_apcq2e.jpg",
  },

  {
    name: "Emily Davis",
    role: "Entrepreneur, Startup Hub",
    testimonial:
      "Secure transactions and seamless booking. I can book rooms quickly and focus on my meetings. Great service!",
    image:
      "https://res.cloudinary.com/dbwftcxvx/image/upload/v1726165577/user4_ojhwa5.jpg",
  },
];

const Testimonials: React.FC = () => {
  return (
    <div style={{ margin: "100px 0px" }}>
      <SectionHeading
        title="Customer Testimonials"
        subTitle="Hear from our satisfied customers"
      />
      <Swiper
        slidesPerView={1}
        spaceBetween={30}
        loop={true}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        modules={[Pagination, Navigation, Autoplay]}
      >
        {testimonials.map((testimonial, index) => (
          <SwiperSlide key={index}>
            <Card
              style={{
                textAlign: "center",
                padding: "40px",
                borderRadius: "10px",
                boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
              }}
            >
              <div className="testimonialCard">
                <div className="testimonialImg">
                  <img
                    src={testimonial.image}
                    style={{
                      marginBottom: "20px",
                      width: "400px",
                      height: "400px",
                      margin: "0px auto",
                      borderRight: "5px solid #4682b4",
                      borderRadius: "5px",
                      paddingRight: "3px",
                    }}
                  />
                </div>
                <div className="testimonialContent">
                  <h3 style={{ fontSize: "22px", color: "#003366" }}>
                    {testimonial.name}
                  </h3>
                  <p style={{ fontSize: "16px", fontStyle: "italic" }}>
                    {testimonial.role}
                  </p>
                  <p style={{ fontSize: "16px", marginTop: "10px" }}>
                    "{testimonial.testimonial}"
                  </p>
                </div>
              </div>
            </Card>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Testimonials;
