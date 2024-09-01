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
    element: <DashboardLayout />,
    errorElement: <Error />,
    children: [
      {
        path: "/dashboard",
        element: <WelcomeAdmin />,
      },
      {
        path: "room-management",
        element: <RoomManagement />,
      },
      {
        path: "slots-management",
        element: <SlotsManagement />,
      },
      {
        path: "booking-management",
        element: <BookingManagement />,
      },
      {
        path: "user-management",
        element: <UserManagement />,
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
