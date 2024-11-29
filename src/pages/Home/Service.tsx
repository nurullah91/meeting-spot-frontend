import React from "react";
import SectionHeading from "../../components/SectionHeading";
import { motion } from "framer-motion";
import "../../styles/style.css";
import realtimeLogo from "../../assets/icons/realtime-logo.png";
import confirmationLogo from "../../assets/icons/confirmation-logo.png";
import scheduleLogo from "../../assets/icons/schedule-logo.png";
import supportLogo from "../../assets/icons/support-logo.png";

const Service: React.FC = () => {
  const services = [
    {
      title: "Real-Time Availability",
      description:
        "Check room availability in real-time and make instant decisions.",
      icon: realtimeLogo,
    },
    {
      title: "Instant Booking Confirmation",
      description:
        "Receive immediate confirmation once your booking is successful.",
      icon: confirmationLogo,
    },
    {
      title: "Flexible Scheduling",
      description:
        "Book rooms on your own time with flexible and convenient scheduling.",
      icon: scheduleLogo,
    },
    {
      title: "24/7 Support",
      description:
        "We are here to assist you with any queries or concerns, anytime.",
      icon: supportLogo,
    },
  ];
  return (
    <div>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <SectionHeading
          title="Our Services"
          subTitle="Discover how we make your experience smoother"
        />
      </motion.div>

      <div className="serviceCardContainer">
        {services.map((service, index) => (
          <motion.div
            key={index}
            style={{ position: "relative", height: "100%", width: "100%" }}
          >
            <div
              style={{
                zIndex: 10,
                padding: "20px",
              }}
            >
              <img
                src={service.icon}
                alt={service.title}
                className="serviceCardImage"
              />
              <h3
                style={{
                  color: "#003366",
                  fontSize: "20px",
                  marginTop: "10px",
                }}
              >
                {service.title}
              </h3>
              <p style={{ fontSize: "16px" }}>{service.description}</p>
            </div>
            <div
              style={{
                borderRadius: "8px",
                backgroundColor: "#ffff",
                height: "60%",
                width: "100%",
                position: "absolute",
                bottom: "0px",
                left: "0px",
                zIndex: -1,
              }}
            ></div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Service;
