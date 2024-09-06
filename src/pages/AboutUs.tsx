import React from "react";
import { Row, Col, Card } from "antd";
import { motion } from "framer-motion";
import CustomContainer from "../components/CustomContainer";
import SectionHeading from "../components/SectionHeading";

const AboutUs: React.FC = () => {
  const teamData = [
    {
      name: "MD Nurullah Bhuiyan",
      role: "CEO & Founder",
      img: "https://res.cloudinary.com/dbwftcxvx/image/upload/v1725594532/CEO_dkpzsn.jpg",
    },
    {
      name: "Jane Smith",
      role: "COO",
      img: "https://res.cloudinary.com/dbwftcxvx/image/upload/v1725594532/Marketing-head_xjrdas.jpg",
    },
    {
      name: "John Doe",
      role: "CTO",
      img: "https://res.cloudinary.com/dbwftcxvx/image/upload/v1725594532/Reciptionist_aomtbm.jpg",
    },
    {
      name: "Mike Johnson",
      role: "Manager",
      img: "https://res.cloudinary.com/dbwftcxvx/image/upload/v1725594532/Manager_yzjmjx.jpg",
    },
  ];

  const textStyle: React.CSSProperties = {
    fontSize: "1.1rem",
    textAlign: "center",
    maxWidth: "800px",
    margin: "0 auto",
    color: "#555555",
  };

  const cardStyle: React.CSSProperties = {
    textAlign: "center",
  };

  return (
    <div style={{ margin: "100px 0" }}>
      <CustomContainer>
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <SectionHeading title="Our Mission" />
          <p style={textStyle}>
            Our mission is to provide top-notch co-working spaces that inspire
            creativity, foster collaboration, and drive productivity. We aim to
            build an inclusive and empowering work environment for professionals
            of all fields.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <SectionHeading title="Meet the Team" />
          <Row gutter={[20, 20]}>
            {teamData.map((member, index) => (
              <Col span={24} md={12} lg={6} key={index}>
                <Card
                  hoverable
                  cover={<img alt={member.name} src={member.img} />}
                  style={cardStyle}
                >
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Card.Meta title={member.name} description={member.role} />
                  </motion.div>
                </Card>
              </Col>
            ))}
          </Row>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <SectionHeading title="Our Story" />
          <p style={textStyle}>
            Founded with the vision of transforming the way people work, we have
            grown from a small shared office to one of the leading co-working
            spaces in the industry. Our story is one of passion, innovation, and
            an unyielding drive to provide exceptional service to our community.
          </p>
        </motion.div>
      </CustomContainer>
    </div>
  );
};

export default AboutUs;
