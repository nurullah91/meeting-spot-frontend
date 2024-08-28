import React from "react";
import SectionHeading from "../../components/SectionHeading";
import { useGetAllRoomsQuery } from "../../redux/features/user/userAccess.api";

const FeaturedRoom: React.FC = () => {
  const { data: roomsData } = useGetAllRoomsQuery(undefined);
  console.log(roomsData);
  return (
    <div>
      <SectionHeading
        title="Our Featured Rooms"
        subTitle="Explore our featured rooms and book your available slots anytime"
      />
    </div>
  );
};

export default FeaturedRoom;
