import { useState } from "react";
import { Table, Button, Modal, message } from "antd";
// import { TimePicker } from "antd";
import moment from "moment";
import {
  useGetAllAvailableSlotsQuery,
  useGetAllRoomsQuery,
} from "../../redux/features/user/userAccess.api";
import {
  useCreateSlotsMutation,
  useDeleteSlotsMutation,
  useUpdateSlotsMutation,
} from "../../redux/features/admin/slotManagement.api";
import { TRoom, TSlot } from "../../types/user.types";
import { FieldValues, SubmitHandler } from "react-hook-form";
import MSForm from "../../components/form/MSForm";
import MSSelect from "../../components/form/MSSelect";
// import MSDatePicker from "../../components/form/MSDatePicker";
import MSTimePicker from "../../components/form/MSTimePicker";
import MSDatePickerWithoutWatch from "../../components/form/MSDatePickerWithoutWatch";
import { primaryButton } from "../../config/themeConfig";

const SlotsManagement = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentSlot, setCurrentSlot] = useState<TSlot | null>(null);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const {
    data: slotsData,
    isLoading: isSlotsLoading,
    isFetching: isSlotsFetching,
  } = useGetAllAvailableSlotsQuery(undefined);
  const { data: roomData, isLoading: roomDataLoading } =
    useGetAllRoomsQuery(undefined);

  const [createSlot] = useCreateSlotsMutation();
  const [updateSlot] = useUpdateSlotsMutation();
  const [deleteSlot] = useDeleteSlotsMutation();

  const displaySlotsData = slotsData?.data?.map((slot: TSlot) => ({
    roomName: slot?.room?.name,
    roomNo: slot?.room?.roomNo,
    date: slot?.date,
    startTime: slot?.startTime,
    endTime: slot?.endTime,
    roomImage: slot?.room?.img,
    _id: slot?._id,
  }));

  // Room options
  const roomOptions = roomData?.data?.result?.map((room: TRoom) => ({
    value: room?._id,
    label: `${room?.name} Room No ${room?.roomNo}`,
  }));

  // Open modal for creating a new slot
  const showCreateSlotModal = () => {
    setCurrentSlot(null);
    setIsModalOpen(true);
  };

  // Open modal for editing a slot
  const showEditSlotModal = (slot: TSlot) => {
    setCurrentSlot(slot);
    setIsModalOpen(true);
  };

  // Handle form submission for create/update
  const handleFormSubmit: SubmitHandler<FieldValues> = async (values) => {
    setConfirmLoading(true);
    const slotData = {
      room: values.room,
      date: values.date.format("YYYY-MM-DD"),
      startTime: values.startTime.format("HH:mm"),
      endTime: values.endTime.format("HH:mm"),
    };

    try {
      if (currentSlot) {
        await updateSlot({ id: currentSlot._id, ...slotData });
        message.success("Slot updated successfully.");
      } else {
        const res = await createSlot(slotData);
        console.log(res);
        if (res.data.success) {
          message.success(res?.data?.message);
        } else {
          message.error("Failed to save the slot.");
        }
      }
      setIsModalOpen(false);
    } catch (error) {
      message.error("Failed to save the slot.");
    } finally {
      setConfirmLoading(false);
    }
  };

  // Handle delete slot with confirmation
  const showDeleteConfirm = (slotId: string) => {
    Modal.confirm({
      title: "Are you sure you want to delete this slot?",
      content: "This action cannot be undone.",
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk: async () => {
        try {
          await deleteSlot(slotId);
          message.success("Slot deleted successfully.");
        } catch (error) {
          message.error("Failed to delete the slot.");
        }
      },
    });
  };

  // Columns for the table
  const columns = [
    {
      title: "Room Name",
      dataIndex: "roomName",
      key: "roomName",
    },
    {
      title: "Room No.",
      dataIndex: "roomNo",
      key: "roomNo",
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      render: (text: string) => moment(text).format("YYYY-MM-DD"),
    },
    {
      title: "Start Time",
      dataIndex: "startTime",
      key: "startTime",
    },
    {
      title: "End Time",
      dataIndex: "endTime",
      key: "endTime",
    },
    {
      title: "Actions",
      key: "actions",
      render: (slot: TSlot) => (
        <>
          <Button
            style={{ marginRight: "10px" }}
            type="default"
            onClick={() => showEditSlotModal(slot)}
          >
            Edit
          </Button>
          <Button
            type="primary"
            danger
            onClick={() => showDeleteConfirm(slot._id)}
          >
            Delete
          </Button>
        </>
      ),
    },
  ];

  return (
    <div>
      <h2 style={{ textAlign: "center", margin: "20px 0" }}>
        All Available Slots
      </h2>
      <div
        style={{
          display: "flex",
          justifyContent: "end",
          marginBottom: "16px",
        }}
      >
        <Button type="default" onClick={showCreateSlotModal}>
          Create Slot
        </Button>
      </div>
      <Table
        dataSource={displaySlotsData}
        columns={columns}
        loading={isSlotsLoading || isSlotsFetching}
        style={{ marginTop: 20 }}
      />

      <Modal
        title={currentSlot ? "Edit Slot" : "Create Slot"}
        visible={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={null}
        confirmLoading={confirmLoading}
      >
        <MSForm onSubmit={handleFormSubmit}>
          <MSSelect
            name="room"
            label="Room"
            options={roomOptions}
            disabled={roomDataLoading}
          />
          {/* <MSDatePicker
            name="date"
            label="Select Date"
            onValueChange={onDateChange}
          /> */}
          <MSDatePickerWithoutWatch name="date" label="Select Date" />
          <MSTimePicker name="startTime" label="Start Time" />
          <MSTimePicker name="endTime" label="End Time" />
          <Button
            type="primary"
            htmlType="submit"
            loading={confirmLoading}
            style={primaryButton}
          >
            {currentSlot ? "Update Slot" : "Create Slot"}
          </Button>
        </MSForm>
      </Modal>
    </div>
  );
};

export default SlotsManagement;
