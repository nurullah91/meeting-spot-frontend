import React from "react";
import Navbar from "../ui/Navbar";
import { Outlet } from "react-router-dom";
import Footer from "../ui/Footer";

const MainLayout: React.FC = () => {
  return (
    <div style={{ position: "relative" }}>
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
};

export default MainLayout;
