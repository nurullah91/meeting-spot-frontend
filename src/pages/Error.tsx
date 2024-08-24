import { Button } from "antd";
import React from "react";
import { Link } from "react-router-dom";

const Error: React.FC = () => {
  return (
    <div>
      <h1 style={{ textAlign: "center" }}>Error Page</h1>
      <Link to={"/"}>
        <Button>Home</Button>
      </Link>
    </div>
  );
};

export default Error;
