import React from "react";
import { Link } from "react-router-dom";

const Login: React.FC = () => {
  return (
    <div>
      <h1 style={{ textAlign: "center" }}>Login Page</h1>
      <Link to={"/signup"}>Signup</Link>
    </div>
  );
};

export default Login;
