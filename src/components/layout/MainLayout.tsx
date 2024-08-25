import React from "react";
import Navbar from "../ui/Navbar";
import { Outlet } from "react-router-dom";

const MainLayout: React.FC = () => {
  return (
    <div style={{ position: "relative" }}>
      <Navbar />
      <Outlet />
    </div>
  );
};

export default MainLayout;
