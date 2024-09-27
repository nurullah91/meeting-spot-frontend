import React from "react";
import Navbar from "../ui/Navbar";
import { Outlet } from "react-router-dom";
import FooterSection from "../ui/FooterSection";

const MainLayout: React.FC = () => {
  return (
    <div style={{ position: "relative" }}>
      <Navbar />
      <Outlet />
      <FooterSection />
    </div>
  );
};

export default MainLayout;
