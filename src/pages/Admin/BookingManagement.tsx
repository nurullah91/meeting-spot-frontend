import React from "react";
import { Table, Button, Modal, message, Tag } from "antd";
import { motion } from "framer-motion";
import {
  useDeleteBookingsMutation,
  useGetAllBookingsQuery,
  useUpdateBookingsMutation,
} from "../../redux/features/admin/bookingManagement.api";
import { TBooking, TRoom, TSlot, TUser } from "../../types/user.types";
import { toast } from "sonner";
import { primaryButton } from "../../config/themeConfig";

const BookingManagement: React.FC = () => {
  const {
    data: bookings,
    isLoading,
    isFetching,
  } = useGetAllBookingsQuery(undefined);
  const [updateBooking] = useUpdateBookingsMutation();
  const [deleteBooking] = useDeleteBookingsMutation();

  const displayBookingData = bookings?.data?.result as TBooking[] | undefined;

  // Handle status update (Approve/Reject)
  const handleUpdate = async (id: string, status: string) => {
    const toastId = toast.loading("Updating status");
    try {
      const res = await updateBooking({ id, data: { isConfirmed: status } });

      if (res?.data?.success) {
        toast.success(
          `Booking ${
            status === "confirmed" ? "approved" : "rejected"
          } successfully!`,
          { id: toastId }
        );
      } else {
        toast.error("Failed to update booking status", { id: toastId });
      }
    } catch (error) {
      message.error("Failed to update booking.");
    }
  };

  // Handle delete booking
  const handleDelete = async (id: string) => {
    const toastId = toast.loading("Deleting booking...");
    try {
      const res = await deleteBooking(id);
      if (res?.data?.success) {
        toast.success("Booking Deleted successfully", { id: toastId });
      } else {
        toast.error("Failed to delete booking", { id: toastId });
      }
    } catch (error) {
      toast.error("Failed to delete booking.", { id: toastId });
    }
  };

  // Show delete confirmation modal
  const showUpdateConfirm = (id: string, status: string) => {
    Modal.confirm({
      title: "Are you sure you want to update this booking?",
      content: "You can approve or reject bookings any time.",
      okText: "Yes",
      okType: "primary",
      cancelText: "No",
      onOk: async () => {
        await handleUpdate(id, status);
      },
    });
  };
  // Show delete confirmation modal
  const showDeleteConfirm = (id: string) => {
    Modal.confirm({
      title: "Are you sure you want to delete this booking?",
      content: "This action cannot be undone.",
      okText: "Yes",
      okType: "primary",
      cancelText: "No",
      onOk: async () => {
        await handleDelete(id);
      },
    });
  };

  // Table columns
  const columns = [
    {
      title: "Room Name",
      dataIndex: "room",
      key: "roomName",
      render: (room: TRoom) => room?.name,
    },
    {
      title: "User Name",
      dataIndex: "user",
      key: "userName",
      render: (user: TUser) => user?.name,
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
    },
    {
      title: "Time",
      dataIndex: "slots",
      render: (slots: TSlot[]) => (
        <div>
          {slots.map((slot: TSlot) => (
            <p key={slot._id}>
              {slot.startTime} - {slot.endTime}
            </p>
          ))}
        </div>
      ),
    },
    {
      title: "Status",
      dataIndex: "isConfirmed",
      key: "status",
      render: (status: string) => (
        <Tag color={status === "confirmed" ? "green" : "orange"}>{status}</Tag>
      ),
    },
    {
      title: "Actions",

      render: (record: TBooking) => (
        <div
          style={{
            display: "flex",
            justifyContent: "space-evenly",
            alignItems: "center",
          }}
        >
          {record.isConfirmed !== "confirmed" ? (
            <Button
              type="default"
              onClick={() => showUpdateConfirm(record._id, "confirmed")}
            >
              Approve
            </Button>
          ) : (
            <Button
              type="primary"
              style={primaryButton}
              onClick={() => showUpdateConfirm(record._id, "unconfirmed")}
            >
              Reject
            </Button>
          )}
          <Button
            type="primary"
            danger={true}
            onClick={() => showDeleteConfirm(record._id)}
            style={{ marginLeft: "10px" }}
          >
            Delete
          </Button>
        </div>
      ),
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -50 }}
      transition={{ duration: 0.5 }}
    >
      <h2 style={{ textAlign: "center", margin: "20px 0" }}>Manage Booking</h2>
      <Table
        columns={columns}
        dataSource={displayBookingData || []}
        loading={isLoading || isFetching}
        rowKey="_id"
        pagination={{ pageSize: 10 }}
        style={{ margin: "20px" }}
      />
    </motion.div>
  );
};

export default BookingManagement;
