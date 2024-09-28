import React from "react";
import SectionHeading from "../../components/SectionHeading";
import { useGetAllRoomsQuery } from "../../redux/features/user/userAccess.api";
import RoomCard from "../../components/ui/RoomCard";
import { Button, Col, Row } from "antd";
import { TRoom } from "../../types/user.types";
import { Link } from "react-router-dom";
import { primaryButton } from "../../config/themeConfig";

const FeaturedRoom: React.FC = () => {
  const { data: roomsData } = useGetAllRoomsQuery([
    {
      name: "page",
      value: 1,
    },
    {
      name: "limit",
      value: 4,
    },
  ]);
  return (
    <div style={{ margin: "48px 0px" }}>
      <SectionHeading
        title="Our Featured Rooms"
        subTitle="Explore our featured rooms and book your available slots anytime"
      />

      <Row gutter={[30, 30]}>
        {roomsData?.data?.result?.map((room: TRoom) => (
          <Col span={24} md={{ span: 12 }} lg={{ span: 12 }} key={room._id}>
            <RoomCard room={room} />
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
