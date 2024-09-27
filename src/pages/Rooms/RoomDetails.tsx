import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useGetSingleRoomQuery } from "../../redux/features/user/userAccess.api";
import { Button } from "antd";
import CustomContainer from "../../components/CustomContainer";
import { motion } from "framer-motion";
import { primaryButton } from "../../config/themeConfig";

const RoomDetails: React.FC = () => {
  const { roomId } = useParams();
  const navigate = useNavigate();
  const { data } = useGetSingleRoomQuery(roomId as string);
  const [previewImage, setPreviewImage] = useState("");
  const allDetailImage = data?.data?.detailImages;
  const detailImages =
    allDetailImage?.length > 4
      ? allDetailImage.slice(0, 4)
      : allDetailImage || [];

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

  return (
    <div style={{ minHeight: "100vh" }}>
      <CustomContainer>
        <div className="room-details-container" style={{ margin: "100px 0px" }}>
          <div className="image-gallery">
            <div>
              <img
                style={{ width: "100%", height: "100%" }}
                src={previewImage || data?.data?.img}
                alt="Room Image"
              />
            </div>
            <div style={{ display: "flex", gap: "10px" }}>
              {detailImages?.map((image: string, index: number) => (
                <div
                  key={index}
                  onClick={() => setPreviewImage(image)}
                  className={`${
                    previewImage === image
                      ? "activePreviewImage"
                      : "previewImage"
                  }`}
                >
                  <img
                    style={{ width: "100%", height: "100%" }}
                    src={image}
                    alt="Room detail image"
                  />
                </div>
              ))}
            </div>
          </div>

          <motion.div
            className="room-info"
            initial="hidden"
            animate="visible"
            variants={roomInfoAnimation}
            style={{
              borderRadius: "12px",
              padding: "20px",
              boxShadow: "0px 10px 30px rgba(0, 0, 0, 0.1)",
              color: "#333",
            }}
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
                block
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
