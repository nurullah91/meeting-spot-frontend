import React from "react";
import { TRoom } from "../../types";
import { Button } from "antd";
import { Link } from "react-router-dom";

type TRoomCardProps = {
  room: TRoom;
};
const RoomCard: React.FC<TRoomCardProps> = ({ room }) => {
  console.log(room);
  return (
    <div className="roomCard">
      <img
        src={room.img}
        alt="Room Photo"
        style={{
          width: "100%",
          borderTopRightRadius: "8px",
          borderTopLeftRadius: "8px",
        }}
      />
      <div className="cardInfo">
        <h1>{room.name}</h1>
        <h3>Capacity: {room.capacity} Person</h3>
        <h3 style={{ marginBottom: "10px" }}>
          Price per Slot:{" "}
          <span style={{ color: "orangered" }}>${room.pricePerSlot}</span>
        </h3>

        <Link to={`/rooms/${room._id}`}>
          <Button>See Details</Button>
        </Link>
      </div>
    </div>
  );
};

export default RoomCard;
