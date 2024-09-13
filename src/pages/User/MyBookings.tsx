import React from "react";
import { Table, Tag, Spin } from "antd";
import moment from "moment";
import CustomContainer from "../../components/CustomContainer";
import { useGetMyBookingsQuery } from "../../redux/features/user/userAccess.api";
import SectionHeading from "../../components/SectionHeading";
import { TBooking, TSlot } from "../../types/user.types";
import { Link } from "react-router-dom";

const MyBookings: React.FC = () => {
  const { data: bookings, isLoading } = useGetMyBookingsQuery(undefined);
  console.log(bookings);
  const displayBookingData = bookings?.data?.map((booking: TBooking) => ({
    roomName: booking.room.name,
    date: booking.date,
    time: booking.slots,
    status: booking.isConfirmed,
    roomNo: booking.room.roomNo,
    roomId: booking.room._id,
  }));
  const columns = [
    {
      title: "Room Name",
      dataIndex: "roomName",
      key: "roomName",
    },
    {
      title: "Room No",
      dataIndex: "roomNo",
      key: "roomNo",
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      render: (date: string) => moment(date).format("YYYY-MM-DD"),
    },
    {
      title: "Time",
      dataIndex: "time",
      key: "time",
      render: (time: TSlot[]) => (
        <div>
          {time.map((slot: TSlot) => (
            <p key={slot._id}>
              {slot.startTime} - {slot.endTime}
            </p>
          ))}
        </div>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status: string) => (
        <Tag color={status === "confirmed" ? "green" : "orange"}>{status}</Tag>
      ),
    },
    {
      title: "View Room",
      dataIndex: "roomId",
      key: "roomId",
      render: (roomId: string) => (
        <Tag color="green">
          <Link to={`/rooms/${roomId}`}>Room Details</Link>
        </Tag>
      ),
    },
  ];

  if (isLoading) {
    return (
      <div
        style={{
          margin: "70px 0px",
          minHeight: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <CustomContainer>
          <div style={{ textAlign: "center" }}>
            <Spin size="large" />
          </div>
        </CustomContainer>
      </div>
    );
  }

  return (
    <div style={{ margin: "70px 0px", minHeight: "100vh" }}>
      <CustomContainer>
        <SectionHeading title="My Bookings" />
        <Table columns={columns} dataSource={displayBookingData} rowKey="_id" />
      </CustomContainer>
    </div>
  );
};

export default MyBookings;
