import React from "react";
import { Row, Col } from "antd";
import { motion } from "framer-motion";
import SectionHeading from "../../components/SectionHeading";
const features = [
  {
    title: "Seamless Booking Experience",
    description:
      "Our platform provides a smooth and intuitive booking process from start to finish.",
  },
  {
    title: "Secure Transactions",
    description:
      "We ensure that your payment information is protected with state-of-the-art security features.",
  },
  {
    title: "User-Friendly Interface",
    description:
      "Enjoy a clean and easy-to-navigate interface for a hassle-free experience.",
  },
  {
    title: "Dedicated Customer Support",
    description:
      "Our support team is always ready to help, providing assistance 24/7.",
  },
];

const WhyChooseUs: React.FC = () => {
  return (
    <div style={{ margin: "100px 0px" }}>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <SectionHeading
          title="Why Choose Us?"
          subTitle="We offer exceptional features for a superior experience"
        />
      </motion.div>

      <Row gutter={[30, 70]} align="stretch">
        {features.map((feature, index) => (
          <Col xs={24} sm={12} md={6} key={index}>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              style={{ height: "100%" }} // Ensures the div stretches to fill height
            >
              <div
                style={{
                  padding: "20px",
                  borderRadius: "8px",
                  backgroundColor: "#f5f5f5",
                  textAlign: "center",
                  boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
                  display: "flex",
                  flexDirection: "column", // Ensure vertical alignment
                  justifyContent: "space-between",
                  height: "100%", // Make sure all cards have equal height
                }}
              >
                <h3 style={{ color: "#003366", fontSize: "20px" }}>
                  {feature.title}
                </h3>
                <p style={{ fontSize: "16px" }}>{feature.description}</p>
              </div>
            </motion.div>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default WhyChooseUs;
