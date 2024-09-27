import { useState } from "react";
import { Button, Table, Modal, Space, message } from "antd";
import { Link } from "react-router-dom";
import { ColumnsType } from "antd/lib/table";
import { TRoom } from "../../types/user.types";
import { useGetAllRoomsQuery } from "../../redux/features/user/userAccess.api";
import { useDeleteRoomMutation } from "../../redux/features/admin/roomManagement.api";

const RoomManagement = () => {
  const { data: rooms, isLoading, isFetching } = useGetAllRoomsQuery(undefined);
  const [deleteRoom] = useDeleteRoomMutation();
  const [confirmLoading, setConfirmLoading] = useState(false);

  const displayRoomData = rooms?.data?.result || [];
  const handleDelete = async (roomId: string) => {
    try {
      setConfirmLoading(true);
      await deleteRoom(roomId);
      message.success("Room deleted successfully!");
    } catch (error) {
      message.error("Failed to delete room.");
    } finally {
      setConfirmLoading(false);
    }
  };

  const columns: ColumnsType<TRoom> = [
    {
      title: "Thumbnail",
      dataIndex: "img",
      key: "name",
      render: (img: string) => (
        <div>
          <img
            src={img}
            alt="thumbnail"
            style={{ width: "100px", borderRadius: "3px" }}
          />
        </div>
      ),
    },
    {
      title: "Room Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Room No.",
      dataIndex: "roomNo",
      key: "roomNo",
    },
    {
      title: "Floor No.",
      dataIndex: "floorNo",
      key: "floorNo",
    },
    {
      title: "Capacity",
      dataIndex: "capacity",
      key: "capacity",
    },
    {
      title: "Price Per Slot",
      dataIndex: "pricePerSlot",
      key: "pricePerSlot",
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, room) => (
        <Space size="middle">
          <Button type="default">
            <Link to={`/dashboard/room-management/update-room/${room._id}`}>
              Update
            </Link>
          </Button>
          <Button
            type="primary"
            danger
            onClick={() => showDeleteConfirm(room._id)}
          >
            Delete
          </Button>
        </Space>
      ),
    },
  ];

  const showDeleteConfirm = (roomId: string) => {
    Modal.confirm({
      title: "Are you sure you want to delete this room?",
      content: "This action cannot be undone.",
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk: () => handleDelete(roomId),
      okButtonProps: {
        loading: confirmLoading,
      },
    });
  };

  return (
    <div>
      <h2 style={{ textAlign: "center", margin: "20px 0" }}>Room Management</h2>
      <div
        style={{
          display: "flex",
          justifyContent: "end",
          marginBottom: "16px",
        }}
      >
        <Button type="default">
          <Link to="/dashboard/room-management/create-room">Create Room</Link>
        </Button>
      </div>
      <Table
        columns={columns}
        dataSource={displayRoomData}
        rowKey="_id"
        loading={isLoading || isFetching}
      />
    </div>
  );
};

export default RoomManagement;
