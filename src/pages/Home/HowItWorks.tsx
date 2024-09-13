import React from "react";
import { Row, Col } from "antd";
import { motion } from "framer-motion";
import { FaDoorOpen, FaCalendarAlt, FaCheckCircle } from "react-icons/fa";
import SectionHeading from "../../components/SectionHeading";

const steps = [
  {
    title: "Select a Room",
    description: "Browse our wide range of rooms to find the perfect fit.",
    icon: <FaDoorOpen size={50} color="#003366" />,
  },
  {
    title: "Choose Date & Time",
    description: "Pick the date and time that suits your schedule.",
    icon: <FaCalendarAlt size={50} color="#003366" />,
  },
  {
    title: "Confirm Booking",
    description: "Finalize your booking and get instant confirmation.",
    icon: <FaCheckCircle size={50} color="#003366" />,
  },
];

const HowItWorks: React.FC = () => {
  return (
    <div style={{ margin: "100px 0px" }}>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <SectionHeading
          title="How It Works"
          subTitle="Follow these simple steps to book a room"
        />
      </motion.div>

      <Row gutter={[16, 16]} align="middle" justify="center">
        {steps.map((step, index) => (
          <Col xs={24} sm={12} md={8} key={index}>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2, duration: 0.5 }}
            >
              <div
                style={{
                  padding: "30px",
                  borderRadius: "10px",
                  backgroundColor: "#f5f5f5",
                  textAlign: "center",
                  boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
                }}
              >
                <div style={{ marginBottom: "20px" }}>{step.icon}</div>
                <h3 style={{ color: "#003366", fontSize: "20px" }}>
                  {step.title}
                </h3>
                <p style={{ fontSize: "16px" }}>{step.description}</p>
              </div>
            </motion.div>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default HowItWorks;
