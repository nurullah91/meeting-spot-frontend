import React, { useState } from "react";
import type { MenuProps } from "antd";
import { Menu } from "antd";

type MenuItem = Required<MenuProps>["items"][number];

const items: MenuItem[] = [
  {
    label: "Home",
    key: "home",
  },
  {
    label: "Meeting Room",
    key: "meetingRoom",
  },
  {
    label: "About Us",
    key: "aboutUs",
  },
  {
    label: "Contact Us",
    key: "contactUs",
  },
  {
    label: "Login",
    key: "login",
  },
];

const Navbar: React.FC = () => {
  const [current, setCurrent] = useState("mail");

  const onClick: MenuProps["onClick"] = (e) => {
    console.log("click ", e);
    setCurrent(e.key);
  };

  return (
    <div
      style={{
        width: "95%",
        margin: "0 auto",
      }}
    >
      <Menu
        onClick={onClick}
        selectedKeys={[current]}
        mode="horizontal"
        items={items}
      />
    </div>
  );
};

export default Navbar;
