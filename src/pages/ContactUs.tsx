import React from "react";
import { Button, Row, Col } from "antd";
import { motion } from "framer-motion";
import CustomContainer from "../components/CustomContainer";
import SectionHeading from "../components/SectionHeading";
import MSForm from "../components/form/MSForm";
import MSInput from "../components/form/MSInput";
import { FieldValues, SubmitHandler } from "react-hook-form";

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
              <div>
                <h3>Contact Information</h3>
                <p>Email: contact@example.com</p>
                <p>Phone: +123 456 789</p>
                <p>Office Address: 123 Street, City, Country</p>
              </div>
            </Col>
            <Col span={24} md={12}>
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
              >
                <MSForm onSubmit={handleSubmit}>
                  <MSInput label="Name" name="name" type="text" />
                  <MSInput label="Email" name="email" type="email" />
                  <MSInput label="Subject" name="subject" type="text" />
                  <MSInput label="Message" name="message" type="text" />
                  <Button type="primary" htmlType="submit" size="large">
                    Send Message
                  </Button>
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
