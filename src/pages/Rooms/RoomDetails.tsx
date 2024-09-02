import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useGetSingleRoomQuery } from "../../redux/features/user/userAccess.api";
import { Button } from "antd";
import CustomContainer from "../../components/CustomContainer";

const RoomDetails: React.FC = () => {
  const { roomId } = useParams();
  const navigate = useNavigate();
  const { data } = useGetSingleRoomQuery(roomId as string);
  return (
    <CustomContainer>
      <div className="room-details-container" style={{ margin: "100px 0px" }}>
        <div className="image-gallery">
          <img src={data?.data?.img} alt="Room Image" />
          <img src={data?.data?.img} alt="Room Image" />
          <img src={data?.data?.img} alt="Room Image" />
        </div>

        <div className="room-info">
          <h1>{data?.data?.name}</h1>
          <p>
            <strong>Room No.:</strong> {data?.data?.roomNo}
          </p>
          <p>
            <strong>Floor No.:</strong> {data?.data?.floorNo}
          </p>
          <p>
            <strong>Capacity:</strong> {data?.data?.capacity}
          </p>
          <p>
            <strong>Price Per Slot:</strong> ${data?.data?.pricePerSlot}
          </p>
          <p>
            <strong>Amenities:</strong> {data?.data?.amenities.join(", ")}
          </p>
        </div>

        <Button
          className="book-now-button"
          type="primary"
          size="large"
          onClick={() => navigate("/booking")}
        >
          Book Now
        </Button>
      </div>
    </CustomContainer>
  );
};

export default RoomDetails;
