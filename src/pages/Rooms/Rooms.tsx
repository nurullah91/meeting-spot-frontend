import React, { useEffect, useState } from "react";
import { useGetAllRoomsQuery } from "../../redux/features/user/userAccess.api";
import { Col, Input, Pagination, Row, Spin } from "antd";
import { TRoom } from "../../types";
import RoomCard from "../../components/ui/RoomCard";
import CustomContainer from "../../components/CustomContainer";

const Rooms: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState(search);

  // debounce the search input
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(search);
    }, 300);

    // timeout cleanup function
    return () => {
      clearTimeout(handler);
    };
  }, [search]);

  // Fetch Room Data with pagination and search
  const { data: allRoomsData, isLoading } = useGetAllRoomsQuery([
    { name: "page", value: currentPage },
    { name: "limit", value: 10 },
    { name: "searchTerm", value: debouncedSearch },
  ]);

  return (
    <div style={{ margin: "70px 0px" }}>
      <CustomContainer>
        <div>
          <h1 style={{ textAlign: "center", marginBottom: "30px" }}>
            Browse all meeting rooms
          </h1>

          <Input
            placeholder="Search rooms"
            value={search}
            size="large"
            onChange={(e) => setSearch(e.target.value)}
            style={{ marginBottom: "20px" }}
          />

          {/* Loading animation */}
          {isLoading && (
            <div
              style={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Spin size="large"></Spin>
            </div>
          )}

          <div style={{ margin: "30px 0px" }}>
            <Row gutter={[30, 30]}>
              {allRoomsData?.data?.result?.map((room: TRoom) => (
                <Col
                  span={24}
                  md={{ span: 12 }}
                  lg={{ span: 8 }}
                  key={room._id}
                >
                  <RoomCard room={room} />
                </Col>
              ))}
            </Row>
          </div>
          <Pagination
            responsive={true}
            hideOnSinglePage={true}
            onChange={(value) => setCurrentPage(value)}
            align="start"
            defaultCurrent={1}
            pageSize={10}
            total={allRoomsData?.data?.meta?.total}
          />
        </div>
      </CustomContainer>
    </div>
  );
};

export default Rooms;
