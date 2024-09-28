import React from "react";
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
const Login: React.FC = () => {
  const [login] = useLoginMutation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

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
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
      }}
      className="login-container"
    >
      <div className="login-content">
        <h1 style={{ textAlign: "center" }}>Login</h1>

        <div>
          <MSForm onSubmit={onSubmit} resolver={zodResolver(loginSchema)}>
            <Row>
              <Col span={24}>
                <MSInput type="email" label="Email" name="email" />
              </Col>
              <Col span={24}>
                <MSInput type="text" label="Password" name="password" />
              </Col>
            </Row>
            <Button htmlType="submit" type="primary" style={primaryButton}>
              Login
            </Button>
          </MSForm>
        </div>
        <Divider>
          New user? please <Link to={"/signup"}>Signup</Link>
        </Divider>
      </div>
    </div>
  );
};

export default Login;
