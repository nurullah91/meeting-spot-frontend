import React from "react";
import { Button, Row, Col } from "antd";
import { motion } from "framer-motion";
import CustomContainer from "../components/CustomContainer";
import SectionHeading from "../components/SectionHeading";
import MSForm from "../components/form/MSForm";
import MSInput from "../components/form/MSInput";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { primaryButton } from "../config/themeConfig";

const ContactUs: React.FC = () => {
  const handleSubmit: SubmitHandler<FieldValues> = (data) => {
    console.log("Form submitted:", data);
  };

  return (
    <div style={{ marginTop: "100px", marginBottom: "100px" }}>
      <CustomContainer>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <SectionHeading title="Contact Us" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <Row gutter={20}>
            <Col span={24} md={12}>
              <div
                style={{
                  height: "100%",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <div>
                  <h2>Contact Information</h2>
                  <p>Email: contact@example.com</p>
                  <p>Phone: +123 456 789</p>
                  <p>Office Address: 123 Street, City, Country</p>
                </div>
              </div>
            </Col>
            <Col span={24} md={12}>
              <motion.div>
                <MSForm onSubmit={handleSubmit}>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <MSInput label="Name" name="name" type="text" />
                  </motion.div>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <MSInput label="Email" name="email" type="email" />
                  </motion.div>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <MSInput label="Subject" name="subject" type="text" />
                  </motion.div>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <MSInput label="Message" name="message" type="text" />
                  </motion.div>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Button
                      type="primary"
                      htmlType="submit"
                      size="large"
                      style={primaryButton}
                    >
                      Send Message
                    </Button>
                  </motion.div>
                </MSForm>
              </motion.div>
            </Col>
          </Row>
        </motion.div>
      </CustomContainer>
    </div>
  );
};

export default ContactUs;
