import React, { useState } from "react";
import { Modal, Button, Card, Select, Form } from "antd";
import { useAppSelector } from "../../redux/hooks";
import { useCurrentUser } from "../../redux/features/auth/authSlice";
import "./Checkout.css";
import { booking } from "../../redux/features/user/bookingSlice";
import { useCreateBookingMutation } from "../../redux/features/user/userAccess.api";
import { toast } from "sonner";
import { Link, useNavigate } from "react-router-dom";
const Checkout: React.FC = () => {
  const [paymentMethod, setPaymentMethod] = useState<string | null>(null);
  const [addBooking] = useCreateBookingMutation();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const user = useAppSelector(useCurrentUser);
  const bookingData = useAppSelector(booking);
  const navigate = useNavigate();
  const bookingDetails = {
    ...bookingData.booking,
  };

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleBooking = async () => {
    const toastId = toast.loading("loading...");
    const bookingDataToSave = {
      date: bookingDetails.date,
      slots: bookingDetails.slots,
      room: bookingDetails.roomId,
      user: user?._id,
      email: user?.email,
      paymentMethod: paymentMethod,
      paymentStatus: "Pending",
      totalAmount: bookingDetails.totalCost,
    };

    try {
      const res = await addBooking(bookingDataToSave);
      if (res.error) {
        toast.error("Something went wrong", { id: toastId });
      } else {
        toast.success(res.data.message, { id: toastId });
        showModal();
      }
    } catch (error) {
      toast.error("Something went wrong", { id: toastId });
    }
  };

  const handleOk = () => {
    setIsModalVisible(false);
    navigate("/my-bookings");
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <div className="checkout-container">
      {bookingDetails.roomName ? (
        <div>
          <Card title="Booking Summary">
            <p>
              <strong>Room:</strong> {bookingDetails.roomName}
            </p>
            <p>
              <strong>Date:</strong> {bookingDetails.date}
            </p>
            <p>
              <strong>Time:</strong> {bookingDetails.time}
            </p>
            <p>
              <strong>Price per slot:</strong> {bookingDetails.pricePerSlot}
            </p>
            <p>
              <strong>Total Cost:</strong> {bookingDetails.totalCost}
            </p>
            <p>
              <strong>User Name:</strong> {user?.name}
            </p>
            <p>
              <strong>Email:</strong> {user?.email}
            </p>
            <p>
              <strong>Phone:</strong> {user?.phone}
            </p>
            <p>
              <strong>Address:</strong> {user?.address}
            </p>
          </Card>

          <Form.Item label="Payment Method" required>
            <Select
              placeholder="Select a payment method"
              onChange={(value) => setPaymentMethod(value)}
            >
              <Select.Option value="cashOnDelivery">
                Cash On Delivery
              </Select.Option>
              <Select.Option value="amarPay">Amar Pay</Select.Option>
            </Select>
          </Form.Item>

          <Button
            type="primary"
            disabled={!paymentMethod}
            onClick={handleBooking}
          >
            Confirm Booking
          </Button>

          <Modal
            title="Booking Confirmation"
            visible={isModalVisible}
            footer={() => <Button onClick={handleOk}>Go To My Bookings</Button>}
            onCancel={handleCancel}
          >
            <p>Thank you for your booking!</p>
            <p>
              Your booking for {bookingDetails.roomName} on{" "}
              {bookingDetails.date} at {bookingDetails.time} has been Recorded.
              We'll confirm it as soon as possible.
            </p>
          </Modal>
        </div>
      ) : (
        <div style={{ textAlign: "center" }}>
          <h1
            style={{
              textAlign: "center",
              marginTop: "100px",
              color: "gray",
              marginBottom: "20px",
            }}
          >
            No Booking Data Found
          </h1>
          <Link
            style={{ marginTop: "10px", textAlign: "center" }}
            to={"/rooms"}
          >
            <Button>Browse Rooms</Button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default Checkout;
