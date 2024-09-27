import React, { useState } from "react";
import logo from "../../assets/images/crop-logo.png";
import { Link, NavLink } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { logout, useCurrentUser } from "../../redux/features/auth/authSlice";
import { Button, Dropdown, MenuProps } from "antd";
import { FaUserCircle } from "react-icons/fa";
import { toast } from "sonner";
import { HiMenuAlt1 } from "react-icons/hi";
import { primaryButton } from "../../config/themeConfig";

type TMenuItem = {
  label: string;
  path: string;
};

const menuItems: TMenuItem[] = [
  {
    label: "Home",
    path: "/",
  },
  {
    label: "Rooms",
    path: "/rooms",
  },
  {
    label: "About Us",
    path: "/about-us",
  },
  {
    label: "Contact Us",
    path: "/contact-us",
  },
];

const Navbar: React.FC = () => {
  const [isOpenMenu, setIsOpenMenu] = useState(false);
  const loggedInUser = useAppSelector(useCurrentUser);
  const dispatch = useAppDispatch();

  const handleLogout = () => {
    dispatch(logout());
    toast.success("Log out successful");
  };
  const adminItems: MenuProps["items"] = [
    {
      key: "dashboard",
      label: <Link to={"/dashboard"}>Dashboard</Link>,
    },
    {
      key: "logout",
      label: (
        <Button onClick={handleLogout} block type="primary" danger={true}>
          Logout
        </Button>
      ),
    },
  ];
  const userItems: MenuProps["items"] = [
    {
      key: "myBookings",
      label: <Link to={"/my-bookings"}>My Bookings</Link>,
    },
    {
      key: "logout",
      label: (
        <Button onClick={handleLogout} block type="primary" danger={true}>
          Logout
        </Button>
      ),
    },
  ];

  const items: MenuProps["items"] =
    loggedInUser?.role === "admin" ? adminItems : userItems;
  return (
    <div className="navbar">
      <div className="navContent">
        <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
          <Button
            ghost
            size="middle"
            className="menuTriggerButton"
            onClick={() => setIsOpenMenu(!isOpenMenu)}
          >
            <HiMenuAlt1 style={{ fontSize: "20px" }} />
          </Button>
          <Link to={"/"}>
            <img style={{ width: "100px" }} src={logo} alt="logo" />
          </Link>
        </div>
        <div
          className={`nav-link-container ${
            isOpenMenu ? "openedNav" : "closedNav"
          }`}
        >
          {menuItems.map((item) => (
            <div key={item.path}>
              <NavLink
                to={`${item.path}`}
                className={({ isActive }) =>
                  isActive ? "active-route navItem" : "navItem"
                }
              >
                {item.label}
              </NavLink>
            </div>
          ))}
        </div>
        <div>
          {loggedInUser?.role ? (
            <div>
              <Dropdown menu={{ items }} trigger={["click"]}>
                <FaUserCircle style={{ fontSize: "30px", color: "#264653" }} />
              </Dropdown>
            </div>
          ) : (
            <div>
              <Link to={"/login"}>
                <Button type="primary" style={primaryButton}>
                  Login
                </Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
