import React from "react";
import { Link, useNavigate } from "react-router-dom";
import MSForm from "../components/form/MSForm";
import MSInput from "../components/form/MSInput";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { Button, Col, Divider, Row } from "antd";
import CustomContainer from "../components/CustomContainer";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "../Schemas/userSchema";
import { useLoginMutation } from "../redux/features/auth/authApi";
import { toast } from "sonner";

const Login: React.FC = () => {
  const [login] = useLoginMutation();
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const toastId = toast.loading("Loading...");
    console.log(data);
    try {
      const res = await login(data);
      console.log(res);
      if (res.error) {
        toast.error(res?.error?.data?.message, { id: toastId });
      } else if (res.data.success) {
        toast.success(res.data.message, { id: toastId });
        navigate("/dashboard");
      }
    } catch (error) {
      toast.error("Something went wrong", { id: toastId });
      console.log(error);
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
        <div>
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
              <Button htmlType="submit">Login</Button>
            </MSForm>
          </div>
          <Divider>
            New user? please <Link to={"/signup"}>Signup</Link>
          </Divider>
        </div>
      </div>
    </CustomContainer>
  );
};

export default Login;
