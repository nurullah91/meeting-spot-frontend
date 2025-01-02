import React from "react";
import SectionHeading from "../../components/SectionHeading";
import { useGetAllRoomsQuery } from "../../redux/features/user/userAccess.api";
import RoomCard from "../../components/ui/RoomCard";
import { Button, Col, Row } from "antd";
import { TRoom } from "../../types/user.types";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { primaryButton } from "../../config/themeConfig";
import { fadeIn } from "../../lib/motionVariant";

const FeaturedRoom: React.FC = () => {
  const { data: roomsData } = useGetAllRoomsQuery([
    {
      name: "isFeatured",
      value: true,
    },
    {
      name: "page",
      value: 1,
    },
    {
      name: "limit",
      value: 4,
    },
  ]);

  console.log(roomsData);
  return (
    <div style={{ overflow: "hidden", padding: "0px 20px" }}>
      <SectionHeading
        title="Our Featured Rooms"
        subTitle="Explore our featured rooms and book your available slots anytime"
      />

      <Row gutter={[15, 15]}>
        {roomsData?.data?.result?.map((room: TRoom, index: number) => (
          <Col span={24} md={{ span: 12 }} lg={{ span: 6 }} key={room._id}>
            <motion.div
              variants={fadeIn(index % 2 === 1 ? "left" : "right", 0)}
              initial="hidden"
              whileInView={"show"}
              viewport={{ once: false, amount: 0.7 }}
            >
              <RoomCard room={room} />
            </motion.div>
          </Col>
        ))}
      </Row>
      <div style={{ marginTop: "30px", textAlign: "center" }}>
        <Link to="/rooms">
          <Button type="primary" size="large" style={primaryButton}>
            See More
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default FeaturedRoom;
