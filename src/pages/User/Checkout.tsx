import React, { useState } from "react";
import { Modal, Button, Card, Select, Form, Spin } from "antd";
import { useAppSelector } from "../../redux/hooks";
import { useCurrentUser } from "../../redux/features/auth/authSlice";
import "./Checkout.css";
import { booking } from "../../redux/features/user/bookingSlice";
import { useCreateBookingMutation } from "../../redux/features/user/userAccess.api";
import { toast } from "sonner";
import { Link } from "react-router-dom";
import { primaryButton } from "../../config/themeConfig";
const Checkout: React.FC = () => {
  const [paymentMethod, setPaymentMethod] = useState<string | null>(null);
  const [addBooking] = useCreateBookingMutation();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const user = useAppSelector(useCurrentUser);
  const bookingData = useAppSelector(booking);
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
      window.location.href = res.data?.data?.payment_url;

      if (res.data.message) {
        toast.success(res.data.message, { id: toastId });
        showModal();
      } else {
        toast.error("Something went wrong", { id: toastId });
      }
    } catch (error) {
      toast.error("Something went wrong", { id: toastId });
    }
  };

  const handleOk = () => {
    setIsModalVisible(false);
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
              <strong>Total Cost:</strong>{" "}
              <span
                style={{
                  color: "orangered",
                  fontSize: "18px",
                  fontWeight: "bold",
                }}
              >
                ${bookingDetails.totalCost}
              </span>
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
              <Select.Option value="amarPay">Amar Pay</Select.Option>
            </Select>
          </Form.Item>

          <Button
            type="primary"
            style={paymentMethod ? primaryButton : {}}
            disabled={!paymentMethod}
            onClick={handleBooking}
          >
            Confirm Booking
          </Button>

          <Modal
            title="Redirecting to Payment Process"
            visible={isModalVisible}
            footer={() => (
              <Button onClick={handleOk}>
                {" "}
                <Spin /> Redirecting
              </Button>
            )}
            onCancel={handleCancel}
          >
            <p>Thank you for your booking</p>
            <p>
              Your booking for {bookingDetails.roomName} on{" "}
              {bookingDetails.date} at {bookingDetails.time} has been Recorded.
              We'll confirm it after successful payment. Wait for redirecting
              you to Payment Process
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
            <Button type="primary" style={primaryButton}>
              Browse Rooms
            </Button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default Checkout;
