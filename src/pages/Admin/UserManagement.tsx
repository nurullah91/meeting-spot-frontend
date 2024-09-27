import React, { useState } from "react";
import { Table, Button, Modal, Tag, Spin } from "antd";
import {
  useDeleteUserMutation,
  useGetAllUserQuery,
  useUpdateRoleMutation,
} from "../../redux/features/admin/userManagement.api";
import { TUser } from "../../types/user.types";
import { toast } from "sonner";
import { primaryButton } from "../../config/themeConfig";

const UserManagement: React.FC = () => {
  const { data: users, isLoading, isFetching } = useGetAllUserQuery(undefined);
  const [updateRole] = useUpdateRoleMutation();
  const [deleteUser] = useDeleteUserMutation();
  const [selectedUser, setSelectedUser] = useState<TUser | null>(null);
  const [confirmModalVisible, setConfirmModalVisible] = useState(false);
  const [actionType, setActionType] = useState<
    "promote" | "demote" | "delete"
  >();

  const displayUserData = users?.data?.result?.map((user: TUser) => ({
    ...user,
  }));
  // Handle Role Update
  const handleUpdateRole = async (user: TUser, newRole: string) => {
    const toastId = toast.loading("Loading..");
    const res = await updateRole({ id: user._id, data: { role: newRole } });
    console.log(res);
    if (res?.data?.success) {
      toast.success(`User ${user.name} has been updated to ${newRole}.`, {
        id: toastId,
      });
    } else {
      toast.error("Something went wrong", { id: toastId });
    }
  };

  // Handle Delete User
  const handleDeleteUser = async (user: TUser) => {
    const toastId = toast.loading("Loading..");
    const res = await deleteUser(user._id);
    if (res?.data?.success) {
      toast.success(`User ${user.name} has been deleted.`, {
        id: toastId,
      });
    } else {
      toast.error("Something went wrong", { id: toastId });
    }
  };

  // Open Modal for Confirmation
  const openConfirmModal = (
    user: TUser,
    action: "promote" | "demote" | "delete"
  ) => {
    setSelectedUser(user);
    console.log({ user, action });
    setActionType(action);
    setConfirmModalVisible(true);
  };

  // Confirm Action
  const handleConfirmAction = () => {
    if (selectedUser) {
      if (actionType === "promote") {
        handleUpdateRole(selectedUser, "admin");
      } else if (actionType === "demote") {
        handleUpdateRole(selectedUser, "user");
      } else if (actionType === "delete") {
        handleDeleteUser(selectedUser);
      }
      setConfirmModalVisible(false);
    }
  };

  // Table Columns
  const columns = [
    { title: "Name", dataIndex: "name", key: "name" },
    { title: "Email", dataIndex: "email", key: "email" },
    { title: "Phone", dataIndex: "phone", key: "phone" },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
      render: (role: string) => (
        <Tag color={role === "admin" ? "green" : "orange"}>{role}</Tag>
      ),
    },
    {
      title: "Actions",
      key: "actions",
      render: (user: TUser) => (
        <>
          {user.role === "user" ? (
            <>
              <Button
                type="default"
                onClick={() => openConfirmModal(user, "promote")}
                style={{ marginRight: "10px" }}
              >
                Make Admin
              </Button>
              <Button
                type="primary"
                danger
                onClick={() => openConfirmModal(user, "delete")}
              >
                Delete User
              </Button>
            </>
          ) : (
            <>
              <Button
                type="primary"
                style={primaryButton}
                onClick={() => openConfirmModal(user, "demote")}
              >
                Make User
              </Button>
            </>
          )}
        </>
      ),
    },
  ];

  if (isLoading || isFetching) {
    return (
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
    );
  }

  return (
    <div>
      <h2 style={{ textAlign: "center", marginBottom: "20px" }}>Manage User</h2>
      <Table columns={columns} dataSource={displayUserData} rowKey="_id" />

      {/* Confirmation Modal */}
      <Modal
        title="Are your sure?"
        visible={confirmModalVisible}
        onOk={handleConfirmAction}
        onCancel={() => setConfirmModalVisible(false)}
      >
        <p>
          Are you sure you want to{" "}
          {actionType === "promote" &&
            `promote ${selectedUser?.name} to Admin?`}
          {actionType === "demote" && `demote ${selectedUser?.name} to User?`}
          {actionType === "delete" && `delete ${selectedUser?.name}?`}
        </p>
      </Modal>
    </div>
  );
};

export default UserManagement;
