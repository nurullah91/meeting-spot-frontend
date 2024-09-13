import React, { useState } from "react";
import { Button, Divider, Row, Col } from "antd";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { useCurrentUser } from "../../redux/features/auth/authSlice";

import {
  useGetAllAvailableSlotsQuery,
  useGetSingleRoomQuery,
} from "../../redux/features/user/userAccess.api";
import { FieldValues, SubmitHandler } from "react-hook-form";
import MSForm from "../../components/form/MSForm";
import MSInput from "../../components/form/MSInput"; // Assuming MSInput is the custom input component
import CustomContainer from "../../components/CustomContainer";
import { useNavigate, useParams } from "react-router-dom";
import MSDatePicker from "../../components/form/MSDatePicker";
import MSSelect from "../../components/form/MSSelect";
import { addToBooking } from "../../redux/features/user/bookingSlice";
import { TSlot } from "../../types/user.types";

const Booking: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const user = useAppSelector(useCurrentUser);
  const navigate = useNavigate();
  const { roomId } = useParams();
  const dispatch = useAppDispatch();
  const { data: roomInfo } = useGetSingleRoomQuery(roomId as string);
  // Fetch available slots when a date is selected
  const { data: availableSlots, isFetching } = useGetAllAvailableSlotsQuery(
    [
      { name: "date", value: selectedDate },
      { name: "roomId", value: roomId },
    ],
    { skip: !selectedDate }
  );
  const userDefaultValues = {
    name: user?.name,
    email: user?.email,
    phone: user?.phone,
    address: user?.address,
  };
  const slotOptions = availableSlots?.data?.map((slot: TSlot) => ({
    label: `Room ${slot?.room?.roomNo} Time ${slot.startTime}-${slot.endTime}`,
    value: `${slot._id}|${slot.startTime}-${slot.endTime}`,
  }));
  // Handle date change and fetch available slots
  const onDateChange = (date: moment.Moment | null) => {
    if (date) {
      setSelectedDate(date.format("YYYY-MM-DD"));
    } else {
      setSelectedDate(null);
    }
  };

  const handleSubmit: SubmitHandler<FieldValues> = async (values) => {
    const selectedSlotIds = values.slots.map((slotValue: string) => {
      const [slotId] = slotValue.split("|"); // Extract only slotId
      return slotId;
    });

    const selectedTime = values.slots
      .map((slotValue: string) => {
        const [, slotTime] = slotValue.split("|"); // Extract only slotTime
        return slotTime;
      })
      .join(", "); // Join multiple times if multiple slots selected
    const pricePerSlot = roomInfo?.data?.pricePerSlot;
    const totalCost = pricePerSlot * selectedSlotIds.length;
    const bookingData = {
      roomName: roomInfo?.data?.name,
      date: selectedDate,
      roomId: roomId,
      time: selectedTime,
      user: user?._id,
      pricePerSlot: pricePerSlot,
      slots: selectedSlotIds,
      totalCost: totalCost,
    };
    dispatch(addToBooking(bookingData));
    navigate(`/booking/${roomId}/checkout`);
  };

  return (
    <div style={{ margin: "100px 0px" }}>
      <CustomContainer>
        <div className="booking-container">
          <h1>Book Your Room</h1>
          <MSForm onSubmit={handleSubmit} defaultValues={userDefaultValues}>
            <MSDatePicker
              name="date"
              label="Select Date"
              onValueChange={onDateChange}
            />

            {selectedDate && (
              <MSSelect
                label="Choose Slot"
                name="slots"
                mode="multiple"
                options={slotOptions}
                disabled={isFetching}
              />
            )}
            <Divider>User Information</Divider>
            <Row gutter={20}>
              <Col span={24} md={{ span: 12 }}>
                <MSInput type="text" label="Name" name="name" readOnly={true} />
              </Col>
              <Col span={24} md={{ span: 12 }}>
                <MSInput
                  type="text"
                  label="Email"
                  name="email"
                  readOnly={true}
                />
              </Col>
              <Col span={24} md={{ span: 12 }}>
                <MSInput
                  type="text"
                  label="Phone"
                  name="phone"
                  readOnly={true}
                />
              </Col>
              <Col span={24} md={{ span: 12 }}>
                <MSInput
                  type="text"
                  label="Address"
                  name="address"
                  readOnly={true}
                />
              </Col>
            </Row>

            <Button type="primary" htmlType="submit">
              Proceed to Checkout
            </Button>
          </MSForm>
        </div>
      </CustomContainer>
    </div>
  );
};

export default Booking;
