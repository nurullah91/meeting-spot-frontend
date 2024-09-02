import React, { useState } from "react";
import { DatePicker, Form, Button, Select } from "antd";
import { useAppSelector } from "../../redux/hooks";
import { useCurrentUser } from "../../redux/features/auth/authSlice";
import moment from "moment";
import { useGetAllAvailableSlotsQuery } from "../../redux/features/user/userAccess.api";
import { FieldValues, SubmitHandler } from "react-hook-form";
import MSForm from "../../components/form/MSForm";
import MSInput from "../../components/form/MSInput"; // Assuming MSInput is the custom input component
import CustomContainer from "../../components/CustomContainer";

const Booking: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [timeSlot, setTimeSlot] = useState<string | null>(null);
  const user = useAppSelector(useCurrentUser);
  const roomId = "66771ae7f6ab22de871a25a3"; // Assuming you have the roomId available

  // Fetch available slots when a date is selected
  const { data: availableSlots } = useGetAllAvailableSlotsQuery(
    [
      { name: "date", value: selectedDate },
      { name: "roomId", value: roomId },
    ],
    { skip: !selectedDate }
  );

  // Handle date change and fetch available slots
  const onDateChange = (date: moment.Moment | null) => {
    if (date) {
      setSelectedDate(date.format("YYYY-MM-DD"));
    } else {
      setSelectedDate(null);
    }
  };

  const handleSubmit: SubmitHandler<FieldValues> = (values) => {
    console.log("Booking data:", values);
    // Send the booking data to the backend
  };

  return (
    <div style={{ margin: "100px 0px" }}>
      <CustomContainer>
        <div className="booking-container">
          <h1>Book Your Room</h1>
          <MSForm onSubmit={handleSubmit}>
            <Form.Item label="Select Date" name="date" required>
              <DatePicker
                onChange={onDateChange}
                disabledDate={(current) =>
                  current && current < moment().endOf("day")
                }
              />
            </Form.Item>

            {selectedDate && (
              <Form.Item label="Select Time Slot" name="timeSlot" required>
                <Select
                  placeholder="Select a time slot"
                  onChange={(value) => setTimeSlot(value)}
                >
                  {availableSlots?.data?.slots?.map((slot: string) => (
                    <Select.Option key={slot} value={slot}>
                      {slot}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            )}

            <MSInput
              type="text"
              label="Name"
              name="name"
              defaultValue={user?.name}
              disabled
            />

            <MSInput
              type="text"
              label="Email"
              name="email"
              defaultValue={user?.email}
              disabled
            />

            <MSInput
              type="text"
              label="Phone"
              name="phone"
              defaultValue={user?.phone}
              disabled
            />

            <Button type="primary" htmlType="submit" disabled={!timeSlot}>
              Book Now
            </Button>
          </MSForm>
        </div>
      </CustomContainer>
    </div>
  );
};

export default Booking;
