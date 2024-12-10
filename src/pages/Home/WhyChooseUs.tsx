import React from "react";
import { motion } from "framer-motion";
import whyChooseUsIcon from "../../assets/icons/why-choose-us.png";
import "./WhyChooseUs.css";
import SectionHeading from "../../components/SectionHeading";
import seamless from "../../assets/icons/seamless.png";
import transaction from "../../assets/icons/transaction.png";
import ui from "../../assets/icons/ui.png";
import support from "../../assets/icons/support-logo.png";

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

      <div className="layout-row">
        {/* First Column */}
        <div className="column first-column">
          <div className="inner-content">
            <div className="inner-item">
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
                    textAlign: "center",

                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    height: "100%",
                  }}
                >
                  <img
                    src={seamless}
                    alt="Icon for seamless booking"
                    className="iconImg"
                  />
                  <h3 style={{ color: "#003366", fontSize: "20px" }}>
                    Seamless Booking Experience
                  </h3>
                  <p style={{ fontSize: "16px" }}>
                    Our platform provides a smooth and intuitive booking process
                    from start to finish.
                  </p>
                </div>
              </motion.div>
            </div>
            <div className="inner-item">
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
                    textAlign: "center",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    height: "100%",
                  }}
                >
                  <img
                    src={transaction}
                    alt="Icon for seamless booking"
                    className="iconImg"
                  />
                  <h3 style={{ color: "#003366", fontSize: "20px" }}>
                    Secure Transactions
                  </h3>
                  <p style={{ fontSize: "16px" }}>
                    We ensure that your payment information is protected with
                    state-of-the-art security features.
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Middle Column (Section Icon) */}
        <div
          className="column section-icon"
          style={{
            overflow: "hidden",
            textAlign: "center",
            border: "5px solid #173366",
            borderRadius: "100%",
            padding: "10px",
          }}
        >
          <img
            src={whyChooseUsIcon}
            style={{
              maxWidth: "400px",
              width: "95%",
              margin: "0px auto",
              borderBottomRightRadius: "100%",
              borderBottomLeftRadius: "100%",
            }}
            alt="Icon"
          />
        </div>

        {/* Third Column */}
        <div className="column third-column">
          <div className="inner-content">
            <div className="inner-item">
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
                    textAlign: "center",
                    display: "flex",
                    flexDirection: "column", // Ensure vertical alignment
                    justifyContent: "space-between",
                    height: "100%", // Make sure all cards have equal height
                  }}
                >
                  <img
                    src={ui}
                    alt="Icon for seamless booking"
                    className="iconImg"
                  />
                  <h3 style={{ color: "#003366", fontSize: "20px" }}>
                    User-Friendly Interface
                  </h3>
                  <p style={{ fontSize: "16px" }}>
                    Enjoy a clean and easy-to-navigate interface for a
                    hassle-free experience.
                  </p>
                </div>
              </motion.div>
            </div>
            <div className="inner-item">
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
                    textAlign: "center",
                    display: "flex",
                    flexDirection: "column", // Ensure vertical alignment
                    justifyContent: "space-between",
                    height: "100%", // Make sure all cards have equal height
                  }}
                >
                  <img
                    src={support}
                    alt="Icon for seamless booking"
                    className="iconImg"
                  />
                  <h3 style={{ color: "#003366", fontSize: "20px" }}>
                    Dedicated Customer Support
                  </h3>
                  <p style={{ fontSize: "16px" }}>
                    Our support team is always ready to help, providing
                    assistance 24/7.
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      {/* <Row gutter={[30, 70]} align="stretch">
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
      </Row> */}
    </div>
  );
};

export default WhyChooseUs;
