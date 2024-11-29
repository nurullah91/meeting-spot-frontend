import React from "react";
import { Link, useNavigate } from "react-router-dom";
import MSForm from "../components/form/MSForm";
import MSInput from "../components/form/MSInput";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { Button, Col, Divider, Row } from "antd";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSignUpMutation } from "../redux/features/auth/authApi";
import { toast } from "sonner";
import { signupSchema } from "../Schemas/userSchema";
import { primaryButton } from "../config/themeConfig";
import CustomContainer from "../components/CustomContainer";
import loginAvatar from "../assets/images/loginAvatar.png";

const SignUp: React.FC = () => {
  const [signUp] = useSignUpMutation();
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const toastId = toast.loading("Loading...");

    try {
      const res = await signUp(data);

      if (res.error) {
        toast.error("Something went wrong", { id: toastId });
      } else if (res?.data?.success) {
        toast.success("User created successfully", { id: toastId });
        navigate("/login");
      }
    } catch (error) {
      toast.error("Something went wrong", { id: toastId });
    }
  };
  return (
    <CustomContainer>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "100vh",
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
            <h1
              style={{
                textAlign: "center",
                fontFamily: "arial",
                marginBottom: "20px",
              }}
            >
              Signup as New User
            </h1>

            <div>
              <MSForm onSubmit={onSubmit} resolver={zodResolver(signupSchema)}>
                <Row gutter={20}>
                  <Col span={24} lg={{ span: 12 }}>
                    <MSInput type="text" label="Name" name="name" />
                  </Col>
                  <Col span={24} lg={{ span: 12 }}>
                    <MSInput type="email" label="Email" name="email" />
                  </Col>
                  <Col span={24} lg={{ span: 12 }}>
                    <MSInput type="text" label="Phone" name="phone" />
                  </Col>
                  <Col span={24} lg={{ span: 12 }}>
                    <MSInput type="text" label="Password" name="password" />
                  </Col>
                  <Col span={24}>
                    <MSInput type="text" label="Address" name="address" />
                  </Col>
                </Row>
                <Button htmlType="submit" type="primary" style={primaryButton}>
                  Signup
                </Button>
              </MSForm>
            </div>
            <Divider>
              Already Have an account? please <Link to={"/login"}>Login</Link>
            </Divider>
          </div>
        </div>
      </div>
    </CustomContainer>
  );
};

export default SignUp;
