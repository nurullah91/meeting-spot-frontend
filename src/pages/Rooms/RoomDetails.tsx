import React from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useGetSingleRoomQuery } from "../../redux/features/user/userAccess.api";
import { Button, Spin } from "antd";
import CustomContainer from "../../components/CustomContainer";
import { motion } from "framer-motion";
import { primaryButton } from "../../config/themeConfig";
import "./RoomDetails.styles.css";
import { FaArrowRightLong } from "react-icons/fa6";
// light gallery styles
import LightGallery from "lightgallery/react";
import "lightgallery/css/lightgallery.css";
import "lightgallery/css/lg-zoom.css";
import "lightgallery/css/lg-thumbnail.css";
import lgThumbnail from "lightgallery/plugins/thumbnail";
import lgZoom from "lightgallery/plugins/zoom";
import { TRoom } from "../../types/user.types";
import { Rating, ThinRoundedStar } from "@smastrom/react-rating";
import { fadeIn } from "../../lib/motionVariant";
import RelatedRooms from "./RelatedRooms";

const RoomDetails: React.FC = () => {
  const { roomId } = useParams();
  const navigate = useNavigate();
  const { data, isLoading: roomDataLoading } = useGetSingleRoomQuery(
    roomId as string
  );

  const roomData: TRoom = data?.data;
  const allDetailImages = data?.data?.detailImages || [];
  console.log(roomData);
  const myStarStyles = {
    itemShapes: ThinRoundedStar,
    activeFillColor: "#ffb700",
    inactiveFillColor: "#939291",
  };

  const displayedImages =
    allDetailImages?.length > 3
      ? [data?.data?.img, ...allDetailImages.slice(0, 3)]
      : [data?.data?.img, ...allDetailImages];
  console.log(roomData);
  if (roomDataLoading) {
    return (
      <div
        style={{
          width: "100%",
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Spin size="large" />
      </div>
    );
  }
  return (
    <div style={{ minHeight: "100vh" }}>
      <CustomContainer>
        <div className="room-details-container" style={{ marginTop: "100px" }}>
          <LightGallery
            speed={500}
            plugins={[lgThumbnail, lgZoom]}
            elementClassNames="image-gallery"
          >
            {displayedImages?.map((image, index) => (
              <Link
                to={image}
                key={index}
                className={`${
                  index === 0
                    ? "image-gallery-thumbnail"
                    : index === 1
                    ? "first-detail-image"
                    : "detail-image"
                }`}
                style={{
                  width: "100%",
                  height: "100%",
                  borderRadius: "8px",
                  overflow: "hidden",
                  cursor: "pointer",
                }}
              >
                <img
                  src={image}
                  alt={`Room Image ${index + 1}`}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    objectPosition: "center",
                  }}
                />
              </Link>
            ))}
          </LightGallery>

          {/* Room Details Information part */}
          <div className="room-info">
            <div style={{ marginBottom: "20px" }}>
              <motion.div variants={fadeIn("up", 0)} className="roomOverview">
                {/* Name Part */}
                <div>
                  <h4>{roomData?.category}</h4>
                  <motion.h1
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.3 }}
                    style={{
                      fontSize: "40px",
                      fontWeight: "bold",
                      color: "#052893",
                      textShadow: "-3px 2px 10px #444442",
                      marginBottom: "15px",
                    }}
                  >
                    {data?.data?.name}
                  </motion.h1>
                  <div>
                    <p>
                      <strong>Amenities:</strong>{" "}
                      <span style={{ color: "#052893" }}>
                        {data?.data?.amenities.join(", ")}
                      </span>
                    </p>
                  </div>
                </div>

                {/* Info Part */}
                <div className="room-overview-container">
                  <div>
                    <p>Price Per Slot</p>
                    <div
                      style={{
                        display: "flex",
                        gap: "12px",
                        alignItems: "center",
                      }}
                    >
                      <h1
                        style={{
                          fontWeight: "bolder",
                          // color: "#ff8400",
                          color: "#052893",
                          fontSize: "32px",
                        }}
                      >
                        ${data?.data?.pricePerSlot}
                      </h1>
                      {roomData?.discount > 0 && (
                        <p style={{ color: "#565656", fontSize: "21px" }}>
                          -{" "}
                          <del>
                            <i>{roomData?.discount}%</i>
                          </del>
                        </p>
                      )}
                    </div>

                    {/* Rating part */}
                    <div
                      style={{
                        display: "flex",
                        gap: "5px",
                        alignItems: "center",
                      }}
                    >
                      <Rating
                        style={{ maxWidth: 150 }}
                        value={roomData?.avgRatings}
                        itemStyles={myStarStyles}
                        readOnly
                      />
                      <span>({roomData?.avgRatings?.toFixed(1)})</span>
                    </div>
                  </div>
                  <div>
                    <p className="room-no">
                      <FaArrowRightLong />
                      Room No: {String(roomData?.roomNo).padStart(3, "0")}
                    </p>
                    <p className="room-no">
                      <FaArrowRightLong />
                      Floor No: {String(roomData?.floorNo).padStart(3, "0")}
                    </p>
                    <p className="room-no">
                      <FaArrowRightLong /> Capacity:{" "}
                      {String(roomData?.capacity).padStart(3, "0")}
                    </p>
                  </div>
                </div>
              </motion.div>
              <div>
                <h2 style={{ marginBottom: "8px" }}>Description</h2>
                <p>{roomData?.description}</p>

                <h2 style={{ marginBottom: "8px", marginTop: "24px" }}>
                  Room Details
                </h2>
                <p>{roomData?.details}</p>
              </div>
            </div>
          </div>
        </div>
        <Button
          type="primary"
          size="large"
          onClick={() => navigate(`/booking/${data?.data?._id}`)}
          style={primaryButton}
        >
          Book Now
        </Button>
      </CustomContainer>
      <RelatedRooms category={roomData?.category} />
    </div>
  );
};

export default RoomDetails;
