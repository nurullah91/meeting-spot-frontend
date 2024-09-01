import { Layout, Menu } from "antd";
import React from "react";
import type { MenuProps } from "antd";
import { NavLink, Outlet } from "react-router-dom";
import Navbar from "../ui/Navbar";
import { RiHomeGearFill } from "react-icons/ri";
import { BsPersonWorkspace } from "react-icons/bs";
import { FaUserShield } from "react-icons/fa";
import { FaUsersGear } from "react-icons/fa6";
type MenuItem = Required<MenuProps>["items"][number];

const { Content, Footer, Sider } = Layout;

const DashboardLayout: React.FC = () => {
  const items: MenuItem[] = [
    {
      key: "roomManagement",
      icon: <RiHomeGearFill />,
      label: (
        <NavLink to={"/dashboard/room-management"}>Room Management</NavLink>
      ),
    },
    {
      key: "slotsManagement",
      icon: <BsPersonWorkspace />,
      label: (
        <NavLink to={"/dashboard/slots-management"}>Slots Management</NavLink>
      ),
    },
    {
      key: "bookingManagement",
      icon: <FaUserShield />,
      label: (
        <NavLink to={"/dashboard/booking-management"}>
          Booking Management
        </NavLink>
      ),
    },
    {
      key: "userManagement",
      icon: <FaUsersGear />,
      label: (
        <NavLink to={"/dashboard/user-management"}>User Management</NavLink>
      ),
    },
  ];

  return (
    <Layout>
      <div>
        <Navbar />
      </div>
      <Content style={{ minHeight: "100vh", width: "100%" }}>
        <Layout style={{ padding: "24px 0" }}>
          <Sider
            breakpoint="lg"
            style={{
              position: "fixed",
              top: "60px",
              left: 0,
            }}
            width={200}
          >
            <Menu mode="inline" style={{ minHeight: "100vh" }} items={items} />
          </Sider>
          <Content className="dashboard-content">
            <Outlet />
          </Content>
        </Layout>
      </Content>
      <Footer style={{ textAlign: "center" }}>
        Ant Design ©{new Date().getFullYear()} Created by Ant UED
      </Footer>
    </Layout>
  );
};

export default DashboardLayout;
