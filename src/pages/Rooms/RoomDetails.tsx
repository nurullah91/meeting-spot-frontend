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

const RoomDetails: React.FC = () => {
  const { roomId } = useParams();
  const navigate = useNavigate();
  const { data } = useGetSingleRoomQuery(roomId as string);

  const roomData: TRoom = data?.data;
  const allDetailImages = data?.data?.detailImages || [];

  // Animation for the room info
  const roomInfoAnimation = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  // Animation for the button
  const buttonHover = {
    scale: 1.05,
    boxShadow: "0px 10px 20px rgba(255, 105, 135, 0.3)",
  };

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
            dynamic={true}
            // dynamicEl={[
            //   { src: data?.data?.img },
            //   ...allDetailImages.map((img: string) => ({ src: img })),
            // ]}
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
                  alt={`Room Image ${index}`}
                  style={{ width: "100%", height: "100%" }}
                />
              </Link>
            ))}
          </LightGallery>

          <motion.div
            className="room-info"
            initial="hidden"
            animate="visible"
            variants={roomInfoAnimation}
          >
            <motion.div style={{ marginBottom: "20px" }}>
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
              <div
                style={{ display: "flex", gap: "5px", alignItems: "center" }}
              >
                <Rating
                  style={{ maxWidth: 100 }}
                  value={roomData?.avgRatings}
                  itemStyles={myStarStyles}
                  readOnly
                />
                <span style={{ fontSize: "18px" }}>
                  ({roomData?.avgRatings?.toFixed(1)})
                </span>
              </div>

              <p>Description: {data?.data?.description}</p>
              <p>
                <b>Details:</b> {roomData?.details}
              </p>
              <p style={{ fontSize: "18px" }}>
                <strong>Room No.:</strong> <span>{data?.data?.roomNo}</span>
              </p>
              <p style={{ fontSize: "18px" }}>
                <strong>Floor No.:</strong> <span>{data?.data?.floorNo}</span>
              </p>
              <p style={{ fontSize: "18px" }}>
                <strong>Capacity:</strong> <span>{data?.data?.capacity}</span>
              </p>
              <p style={{ fontSize: "18px" }}>
                <strong>Price Per Slot:</strong>{" "}
                <span
                  style={{
                    fontWeight: "bolder",
                    color: "#ff4757",
                    fontSize: "20px",
                  }}
                >
                  ${data?.data?.pricePerSlot}
                </span>
              </p>
              <p style={{ fontSize: "18px" }}>
                <strong>Amenities:</strong>{" "}
                <span style={{ color: "#052893" }}>
                  {data?.data?.amenities.join(", ")}
                </span>
              </p>
            </motion.div>

            <motion.div
              whileHover={buttonHover}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Button
                type="primary"
                size="large"
                onClick={() => navigate(`/booking/${data?.data?._id}`)}
                style={primaryButton}
              >
                Book Now
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </CustomContainer>
    </div>
  );
};

export default RoomDetails;
