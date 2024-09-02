import React from "react";
import logo from "../../assets/images/crop-logo.png";
import { Link, NavLink } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { logout, useCurrentUser } from "../../redux/features/auth/authSlice";
import { Button, Dropdown, MenuProps } from "antd";
import { FaUserCircle } from "react-icons/fa";
import { toast } from "sonner";

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
        <Button onClick={handleLogout} block>
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
        <Button onClick={handleLogout} block>
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
        <div>
          <Link to={"/"}>
            <img style={{ width: "100px" }} src={logo} alt="logo" />
          </Link>
        </div>
        <div
          className="nav-link-container"
          style={{
            width: "95%",
            margin: "0 auto",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "20px",
          }}
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
                <FaUserCircle style={{ fontSize: "30px" }} />
              </Dropdown>
            </div>
          ) : (
            <div>
              <Link to={"/login"}>
                <Button>Login</Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
