import React from "react";
import { Link } from "react-router-dom";

const SignUp: React.FC = () => {
  return (
    <div>
      <h1 style={{ textAlign: "center" }}>Signup Page</h1>
      <Link to={"/login"}>Login</Link>
    </div>
  );
};

export default SignUp;
