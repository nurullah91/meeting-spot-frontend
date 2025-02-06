import React from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useGetSingleRoomQuery } from "../../redux/features/user/userAccess.api";
import { Button } from "antd";
import CustomContainer from "../../components/CustomContainer";
import { motion } from "framer-motion";
import { primaryButton } from "../../config/themeConfig";
import "./RoomDetails.styles.css";

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

const RoomDetails: React.FC = () => {
  const { roomId } = useParams();
  const navigate = useNavigate();
  const { data } = useGetSingleRoomQuery(roomId as string);

  const roomData: TRoom = data?.data;
  const allDetailImages = data?.data?.detailImages || [];

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
  return (
    <div style={{ minHeight: "100vh" }}>
      <CustomContainer>
        <div className="room-details-container" style={{ margin: "100px 0px" }}>
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
                  style={{ width: "100%", height: "100%" }}
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
                <div>
                  <p>
                    <strong>Room No.</strong> <span>{data?.data?.roomNo}</span>
                  </p>
                  <p>
                    <strong>Floor No.</strong>{" "}
                    <span>{data?.data?.floorNo}</span>
                  </p>
                  <p>
                    <strong>Capacity:</strong>{" "}
                    <span>{data?.data?.capacity}</span>
                  </p>
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
                        color: "#ff8400",
                        fontSize: "32px",
                      }}
                    >
                      ${data?.data?.pricePerSlot}
                    </h1>
                    {roomData?.discount == 0 && (
                      <h2 style={{ color: "#565656" }}>
                        <del>
                          <i>{roomData?.discount}%</i>
                        </del>
                      </h2>
                    )}
                    <strong>/Per Slot</strong>
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
              </motion.div>

              <p>Description: {roomData?.description}</p>
              <p>
                <b>Details:</b> {roomData?.details}
              </p>
            </div>

            <Button
              type="primary"
              size="large"
              onClick={() => navigate(`/booking/${data?.data?._id}`)}
              style={primaryButton}
            >
              Book Now
            </Button>
          </div>
        </div>
      </CustomContainer>
    </div>
  );
};

export default RoomDetails;
