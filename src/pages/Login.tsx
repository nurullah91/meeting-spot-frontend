import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import MSForm from "../components/form/MSForm";
import MSInput from "../components/form/MSInput";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { Button, Col, Divider, Row } from "antd";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "../Schemas/userSchema";
import { useLoginMutation } from "../redux/features/auth/authApi";
import { toast } from "sonner";
import { useAppDispatch } from "../redux/hooks";
import { verifyToken } from "../utils/verifyToken";
import { setUser } from "../redux/features/auth/authSlice";
import { TUser } from "../types/user.types";
import { primaryButton } from "../config/themeConfig";
import { IoIosEye } from "react-icons/io";
import { IoIosEyeOff } from "react-icons/io";
import CustomContainer from "../components/CustomContainer";
import { FaArrowLeftLong } from "react-icons/fa6";
import loginAvatar from "../assets/images/loginAvatar.png";

const Login: React.FC = () => {
  const [showPass, setShowPass] = useState(false);
  const [defaultValues, setDefaultValues] = useState({
    email: "",
    password: "",
  });

  const [login] = useLoginMutation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const adminCredential = {
    email: "admin.meetingspot@gmail.com",
    password: "admin1234",
  };
  const userCredential = {
    email: "user.meetingspot@gmail.com",
    password: "user1234",
  };
  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const toastId = toast.loading("Loading...");

    try {
      const res = await login(data as { email: string; password: string });

      if (res.error) {
        toast.error("Something went wrong", { id: toastId });
      } else if (res.data.token) {
        const user = verifyToken(res.data.token) as TUser;
        dispatch(setUser({ user: res?.data?.data, token: res.data.token }));
        if (user.role === "admin") {
          toast.success(res.data.message, { id: toastId });
          navigate("/dashboard");
        } else {
          toast.success(res.data.message, { id: toastId });
          navigate("/");
        }
      }
    } catch (error) {
      toast.error("Something went wrong", { id: toastId });
    }
  };

  return (
    <CustomContainer>
      <Link
        to={"/"}
        style={{
          display: "flex",
          alignItems: "center",
          gap: "8px",
          marginTop: "20px",
        }}
      >
        <FaArrowLeftLong /> Back to home
      </Link>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "95vh",
        }}
      >
        <div className="login-container">
          <div className="loginPageCard">
            <h1
              style={{
                fontFamily: "arial",
                fontSize: "40px",
                lineHeight: "60px",
              }}
            >
              Simplify
              <br /> your meeting arrangement
            </h1>
            <p
              style={{
                fontSize: "16px",
                marginTop: "20px",
                lineHeight: "25px",
                fontFamily: "arial",
              }}
            >
              with Efficient, hassle-free room booking for all your meeting
              needs. And enjoy your meeting and move forward your business and
              achieve your goal. We are with you
            </p>
            <img
              src={loginAvatar}
              alt="Avatar"
              style={{ width: "70%", display: "block", margin: "0px auto" }}
            />
          </div>
          <div className="login-content">
            <h1 style={{ textAlign: "center", fontFamily: "arial black" }}>
              Welcome back
            </h1>
            <div style={{ margin: "20px 0px" }}>
              <h4
                style={{
                  marginBottom: "8px",
                  color: "orangered",
                  fontSize: "20px",
                }}
              >
                For testing purposes of the website. Here are some credentials
              </h4>
              <button
                onClick={() => setDefaultValues(adminCredential)}
                style={{
                  border: "2px solid #003366",
                  padding: "8px 20px",
                  marginRight: "12px",
                  marginTop: "12px",
                  borderRadius: "40px",
                  cursor: "pointer",
                }}
              >
                Admin Credential
              </button>
              <button
                onClick={() => setDefaultValues(userCredential)}
                style={{
                  border: "2px solid #003366",
                  padding: "8px 20px",
                  marginTop: "12px",
                  borderRadius: "40px",
                  cursor: "pointer",
                }}
              >
                User Credential
              </button>
            </div>
            <div>
              <MSForm
                onSubmit={onSubmit}
                resolver={zodResolver(loginSchema)}
                defaultValues={defaultValues}
              >
                <Row>
                  <Col span={24}>
                    <MSInput type="email" label="Email" name="email" />
                  </Col>
                  <Col span={24}>
                    <div style={{ position: "relative" }}>
                      <MSInput
                        type={showPass ? "text" : "password"}
                        label="Password"
                        name="password"
                      />
                      <button
                        onClick={() => setShowPass(!showPass)}
                        type="button"
                        style={{
                          position: "absolute",
                          bottom: "5px",
                          right: "10px",
                          border: "none",
                          fontSize: "20px",
                          background: "transparent",
                        }}
                      >
                        {showPass ? <IoIosEyeOff /> : <IoIosEye />}
                      </button>
                    </div>
                  </Col>
                </Row>
                <Button
                  htmlType="submit"
                  type="primary"
                  style={primaryButton}
                  block
                  className="blockButton"
                >
                  Login
                </Button>
              </MSForm>
            </div>
            <Divider>
              New user? please <Link to={"/signup"}>Signup</Link>
            </Divider>
          </div>
        </div>
      </div>
    </CustomContainer>
  );
};

export default Login;
