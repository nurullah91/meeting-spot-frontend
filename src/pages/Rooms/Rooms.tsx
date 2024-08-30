import React, { useEffect, useState } from "react";
import { useGetAllRoomsQuery } from "../../redux/features/user/userAccess.api";
import { Button, Col, Input, Pagination, Row, Select, Spin } from "antd";
import { TRoom } from "../../types";
import RoomCard from "../../components/ui/RoomCard";
import CustomContainer from "../../components/CustomContainer";
const { Option } = Select;

const Rooms: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [search, setSearch] = useState<string>("");
  const [minCapacity, setMinCapacity] = useState<number | undefined>(undefined);
  const [minPrice, setMinPrice] = useState<number | undefined>(undefined);
  const [maxPrice, setMaxPrice] = useState<number | undefined>(undefined);
  const [sortOrder, setSortOrder] = useState<string | undefined>(undefined);

  // debounce the search functionality
  const [debouncedSearch, setDebouncedSearch] = useState(search);
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(search);
    }, 300);

    // timeout cleanup function
    return () => {
      clearTimeout(handler);
    };
  }, [search]);

  // Filter out query params undefined value
  const queryParams = [
    { name: "page", value: currentPage },
    { name: "limit", value: 10 },
    { name: "searchTerm", value: debouncedSearch },
    { name: "capacity", value: minCapacity },
    { name: "minPrice", value: minPrice },
    { name: "maxPrice", value: maxPrice },
    { name: "sort", value: sortOrder },
  ].filter((item) => item.value !== undefined);
  // Fetch Room Data with pagination and search
  const { data: allRoomsData, isLoading } = useGetAllRoomsQuery(queryParams);

  const clearFilters = () => {
    setSearch("");
    setMinCapacity(undefined);
    setMinCapacity(undefined);
    setMaxPrice(undefined);
    setSortOrder(undefined);
  };

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
          {/* Filter Options */}

          <div style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
            <Input
              type="text"
              placeholder="Min Capacity"
              value={minCapacity}
              onChange={(e) => setMinCapacity(Number(e.target.value))}
              style={{ width: "150px" }}
            />
            <Input
              type="text"
              placeholder="Min Price"
              value={minPrice}
              onChange={(e) => setMinPrice(Number(e.target.value))}
              style={{ width: "150px" }}
            />
            <Input
              type="text"
              placeholder="Max Price"
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              style={{ width: "150px" }}
            />
            <Select
              placeholder="Sort By"
              value={sortOrder}
              onChange={(value) => setSortOrder(value)}
              style={{ width: "150px" }}
            >
              <Option value="pricePerSlot">Price: Low to High</Option>
              <Option value="-pricePerSlot">Price: High to Low</Option>
            </Select>
            <Button onClick={clearFilters}>Clear Filters</Button>
          </div>

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
