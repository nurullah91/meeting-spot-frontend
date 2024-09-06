import { createBrowserRouter } from "react-router-dom";

import App from "../App";
import Error from "../pages/Error";
import Home from "../pages/Home/Home";
import Rooms from "../pages/Rooms/Rooms";
import AboutUs from "../pages/AboutUs";
import ContactUs from "../pages/ContactUs";
import Login from "../pages/Login";
import SignUp from "../pages/Signup";
import DashboardLayout from "../components/layout/DashboardLayout";
import WelcomeAdmin from "../pages/Admin/WelcomeAdmin";
import RoomManagement from "../pages/Admin/RoomManagement";
import SlotsManagement from "../pages/Admin/SlotsManagement";
import BookingManagement from "../pages/Admin/BookingManagement";
import UserManagement from "../pages/Admin/UserManagement";
import RoomDetails from "../pages/Rooms/RoomDetails";
import MyBookings from "../pages/User/MyBookings";
import ProtectedLayout from "../components/layout/ProtectedLayout";
import Booking from "../pages/User/Booking";
import Checkout from "../pages/User/Checkout";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <Error />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "rooms",
        element: <Rooms />,
      },
      {
        path: "booking/:roomId",
        element: (
          <ProtectedLayout role="user">
            <Booking />
          </ProtectedLayout>
        ),
      },
      {
        path: "booking/:roomId/checkout",
        element: (
          <ProtectedLayout role="user">
            <Checkout />
          </ProtectedLayout>
        ),
      },
      {
        path: "my-bookings",
        element: (
          <ProtectedLayout role="user">
            <MyBookings />
          </ProtectedLayout>
        ),
      },
      {
        path: "rooms/:roomId",
        element: (
          <ProtectedLayout role="user">
            {" "}
            <RoomDetails />
          </ProtectedLayout>
        ),
      },
      {
        path: "about-us",
        element: <AboutUs />,
      },
      {
        path: "contact-us",
        element: <ContactUs />,
      },
      {
        path: "contact-us",
        element: <ContactUs />,
      },
    ],
  },
  {
    path: "dashboard",
    element: (
      <ProtectedLayout role="admin">
        {" "}
        <DashboardLayout />
      </ProtectedLayout>
    ),
    errorElement: <Error />,
    children: [
      {
        path: "/dashboard",
        element: (
          <ProtectedLayout role="admin">
            <WelcomeAdmin />,
          </ProtectedLayout>
        ),
      },
      {
        path: "room-management",
        element: (
          <ProtectedLayout role="admin">
            <RoomManagement />,
          </ProtectedLayout>
        ),
      },
      {
        path: "slots-management",
        element: <SlotsManagement />,
      },
      {
        path: "booking-management",
        element: (
          <ProtectedLayout role="admin">
            <BookingManagement />,
          </ProtectedLayout>
        ),
      },
      {
        path: "user-management",
        element: (
          <ProtectedLayout role="admin">
            <UserManagement />,
          </ProtectedLayout>
        ),
      },
    ],
  },
  {
    path: "login",
    element: <Login />,
  },
  {
    path: "signup",
    element: <SignUp />,
  },
]);
export default router;
