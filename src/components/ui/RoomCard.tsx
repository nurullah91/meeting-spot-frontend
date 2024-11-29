import React from "react";
import { Button } from "antd";
import { Link } from "react-router-dom";
import { TRoom } from "../../types/user.types";
import { primaryButton } from "../../config/themeConfig";

type TRoomCardProps = {
  room: TRoom;
};
const RoomCard: React.FC<TRoomCardProps> = ({ room }) => {
  return (
    <div className="roomCardWithoutAnimation">
      <div>
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
          <h2 style={{ fontSize: "24px", marginBottom: "8px" }}>{room.name}</h2>
          <h4>Capacity: {room.capacity} Person</h4>
          <h4 style={{ marginBottom: "10px" }}>
            Price per Slot:{" "}
            <span style={{ color: "orangered" }}>${room.pricePerSlot}</span>
          </h4>
        </div>
      </div>
      <Link to={`/rooms/${room._id}`} style={{ padding: "1rem" }}>
        <Button type="primary" style={primaryButton}>
          See Details
        </Button>
      </Link>
    </div>
  );
};

export default RoomCard;
