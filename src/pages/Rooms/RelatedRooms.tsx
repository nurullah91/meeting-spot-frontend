import { Col, Row, Spin } from "antd";
import { useGetAllRoomsQuery } from "../../redux/features/user/userAccess.api";
import CustomContainer from "../../components/CustomContainer";
import { TRoom } from "../../types/user.types";
import { motion } from "framer-motion";
import { fadeIn } from "../../lib/motionVariant";
import RoomCard from "../../components/ui/RoomCard";

export interface IRelatedRoomsProps {
  category: string;
}
export default function RelatedRooms({ category }: IRelatedRoomsProps) {
  const queryParams = [
    { name: "page", value: 1 },
    { name: "limit", value: 4 },
    { name: "category", value: category },
  ].filter((item) => item.value !== undefined);

  const { data: allRoomsData, isLoading } = useGetAllRoomsQuery(queryParams);

  console.log(allRoomsData);

  if (isLoading) {
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
    <div>
      {/* Main Content of the room page */}
      <CustomContainer>
        <div>
          <h2
            style={{
              borderBottom: "1px solid #cdcccc",
              fontSize: "24px",
              paddingBottom: "8px",
              margin: "30px 0px",
            }}
          >
            Related rooms
          </h2>

          <div className="cardContainer">
            <Row gutter={[15, 15]}>
              {allRoomsData?.data?.result?.map((room: TRoom, index: number) => (
                <Col
                  span={24}
                  md={{ span: 12 }}
                  lg={{ span: 6 }}
                  key={room._id}
                >
                  <motion.div
                    variants={fadeIn(index % 2 === 1 ? "left" : "right", 0)}
                    initial="hidden"
                    whileInView={"show"}
                    viewport={{ once: false, amount: 0.5 }}
                    style={{ height: "100%" }}
                  >
                    <RoomCard room={room} />
                  </motion.div>
                </Col>
              ))}
            </Row>
          </div>
        </div>
      </CustomContainer>
    </div>
  );
}
