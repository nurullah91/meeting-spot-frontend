import React from "react";

import { NavLink } from "react-router-dom";

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
  {
    label: "Login",
    path: "/login",
  },
];

const Navbar: React.FC = () => {
  return (
    <div className="navbar">
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
          <div>
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
    </div>
  );
};

export default Navbar;
