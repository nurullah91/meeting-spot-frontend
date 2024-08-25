import React, { ReactNode } from "react";
import { Layout } from "antd";

const { Content } = Layout;

interface CustomContainerProps {
  children: ReactNode;
}

const CustomContainer: React.FC<CustomContainerProps> = ({ children }) => {
  return (
    <Content
      style={{
        maxWidth: "1150px",
        width: "95%",
        margin: "0 auto",
      }}
    >
      {children}
    </Content>
  );
};

export default CustomContainer;
