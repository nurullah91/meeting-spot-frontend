import React from "react";
import SectionHeading from "../../components/SectionHeading";
import { Col, Row } from "antd";
import { motion } from "framer-motion";
import "../../styles/style.css";

const Service: React.FC = () => {
  const services = [
    {
      title: "Real-Time Availability",
      description:
        "Check room availability in real-time and make instant decisions.",
    },
    {
      title: "Instant Booking Confirmation",
      description:
        "Receive immediate confirmation once your booking is successful.",
    },
    {
      title: "Flexible Scheduling",
      description:
        "Book rooms on your own time with flexible and convenient scheduling.",
    },
    {
      title: "24/7 Support",
      description:
        "We are here to assist you with any queries or concerns, anytime.",
    },
  ];
  return (
    <div style={{ margin: "100px 0px" }}>
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

      <Row gutter={[30, 30]} align="stretch" justify="space-between">
        {services.map((service, index) => (
          <Col xs={24} sm={12} md={6} key={index}>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              style={{ height: "100%" }}
            >
              <div
                style={{
                  padding: "20px",
                  borderRadius: "8px",
                  backgroundColor: "#f5f5f5",
                  textAlign: "center",
                  height: "100%",
                }}
                className="roomCard"
              >
                <h3 style={{ color: "#003366", fontSize: "20px" }}>
                  {service.title}
                </h3>
                <p style={{ fontSize: "16px" }}>{service.description}</p>
              </div>
            </motion.div>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default Service;
