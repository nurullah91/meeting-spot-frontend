import React, { useState } from "react";
import { Button, Divider, Row, Col } from "antd";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { useCurrentUser } from "../../redux/features/auth/authSlice";
import { motion } from "framer-motion";
import {
  useGetAllAvailableSlotsQuery,
  useGetSingleRoomQuery,
} from "../../redux/features/user/userAccess.api";
import { FieldValues, SubmitHandler } from "react-hook-form";
import MSForm from "../../components/form/MSForm";
import MSInput from "../../components/form/MSInput";
import CustomContainer from "../../components/CustomContainer";
import { useNavigate, useParams } from "react-router-dom";
import MSSelect from "../../components/form/MSSelect";
import { addToBooking } from "../../redux/features/user/bookingSlice";
import { TSlot } from "../../types/user.types";

import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css";
import { Calendar } from "react-date-range";
import { format } from "date-fns";
import { primaryButton } from "../../config/themeConfig";
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

  const handleSelect = (date: Date) => {
    const userSelectedDate = format(date, "yyyy-MM-dd");
    setSelectedDate(userSelectedDate);
  };
  const slotOptions = availableSlots?.data?.map((slot: TSlot) => ({
    label: `Room ${slot?.room?.roomNo} Time ${slot.startTime}-${slot.endTime}`,
    value: `${slot._id}|${slot.startTime}-${slot.endTime}`,
  }));

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
        <div>
          <motion.h1
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
            style={{
              fontSize: "40px",
              fontWeight: "bold",
              color: "#052893",
              textShadow: "-3px 2px 10px #444442",
              marginBottom: "15px",
              textAlign: "center",
            }}
          >
            Book Your Room
          </motion.h1>
          <div className="booking-container">
            <div>
              <MSForm onSubmit={handleSubmit} defaultValues={userDefaultValues}>
                <MSSelect
                  label="Choose Your Slot"
                  name="slots"
                  mode="multiple"
                  options={slotOptions}
                  disabled={isFetching}
                />

                <Divider>User Information</Divider>
                <Row gutter={20}>
                  <Col span={24} lg={{ span: 12 }}>
                    <MSInput
                      type="text"
                      label="Name"
                      name="name"
                      readOnly={true}
                    />
                  </Col>
                  <Col span={24} lg={{ span: 12 }}>
                    <MSInput
                      type="text"
                      label="Email"
                      name="email"
                      readOnly={true}
                    />
                  </Col>
                  <Col span={24} lg={{ span: 12 }}>
                    <MSInput
                      type="text"
                      label="Phone"
                      name="phone"
                      readOnly={true}
                    />
                  </Col>
                  <Col span={24} lg={{ span: 12 }}>
                    <MSInput
                      type="text"
                      label="Address"
                      name="address"
                      readOnly={true}
                    />
                  </Col>
                </Row>

                <Button
                  type="primary"
                  style={selectedDate ? primaryButton : {}}
                  disabled={!selectedDate}
                  htmlType="submit"
                >
                  Proceed to Checkout
                </Button>
              </MSForm>
            </div>
            <div
              style={{
                boxShadow: "3px 3px 10px #bab9dd",
                borderRadius: "5px",
              }}
            >
              <Calendar
                color="#052893"
                date={selectedDate ? new Date(selectedDate) : new Date()}
                onChange={handleSelect}
              />
            </div>
          </div>
        </div>
      </CustomContainer>
    </div>
  );
};

export default Booking;
