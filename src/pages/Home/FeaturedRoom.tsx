import React from "react";
import SectionHeading from "../../components/SectionHeading";
import { useGetAllRoomsQuery } from "../../redux/features/user/userAccess.api";
import { TRoom } from "../../types";
import RoomCard from "../../components/ui/RoomCard";
import { Col, Row } from "antd";

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
    <div>
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
    </div>
  );
};

export default FeaturedRoom;
