import React from "react";
import SectionHeading from "../../components/SectionHeading";
import { Col, Row } from "antd";
import "../../styles/style.css";

const Service: React.FC = () => {
  return (
    <div style={{ margin: "48px 0px" }}>
      <SectionHeading
        title="Service"
        subTitle="Explore our highlighted service"
      />

      <Row gutter={100}>
        <Col
          span={24}
          md={{ span: 12 }}
          lg={{ span: 6 }}
          className="serviceCard"
        >
          <h2>Real-Time Availability</h2>
        </Col>
        <Col
          span={24}
          md={{ span: 12 }}
          lg={{ span: 6 }}
          className="serviceCard"
        >
          <h2> Instant Booking Confirmation</h2>
        </Col>
        <Col
          span={24}
          md={{ span: 12 }}
          lg={{ span: 6 }}
          className="serviceCard"
        >
          <h2>Flexible Scheduling</h2>
        </Col>
        <Col
          span={24}
          md={{ span: 12 }}
          lg={{ span: 6 }}
          className="serviceCard"
        >
          <h2>24/7 Support</h2>
        </Col>
      </Row>
    </div>
  );
};

export default Service;
