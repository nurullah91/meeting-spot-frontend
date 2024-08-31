import React from "react";
import { Link } from "react-router-dom";
import MSForm from "../components/form/MSForm";
import MSInput from "../components/form/MSInput";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { Button, Col, Divider, Row } from "antd";
import CustomContainer from "../components/CustomContainer";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSignUpMutation } from "../redux/features/auth/authApi";
import { toast } from "sonner";
import { signupSchema } from "../Schemas/userSchema";

const SignUp: React.FC = () => {
  const [signUp] = useSignUpMutation();

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const toastId = toast.loading("Loading...");
    console.log(data);
    try {
      const res = await signUp(data);
      console.log(res);
      if (res.error) {
        toast.error(res?.error?.data?.message, { id: toastId });
      } else {
        toast.success("Done", { id: toastId });
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
          <h1 style={{ textAlign: "center" }}>Signup as New User</h1>

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
              <Button htmlType="submit">Signup</Button>
            </MSForm>
          </div>
          <Divider>
            Already Have an account? please <Link to={"/login"}>Login</Link>
          </Divider>
        </div>
      </div>
    </CustomContainer>
  );
};

export default SignUp;
