import React from "react";
import welcomeAnimation from "../../assets/WelcomeAnimation .json";
import Lottie from "lottie-react";
import SectionHeading from "../../components/SectionHeading";

const WelcomeAdmin: React.FC = () => {
  return (
    <div>
      <SectionHeading title="Welcome Back" />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          paddingLeft: "1.25rem",
          paddingRight: "1.25rem",
          margin: "2rem auto",
          maxWidth: "100%",
        }}
      >
        <Lottie animationData={welcomeAnimation} loop={true} />
      </div>
    </div>
  );
};

export default WelcomeAdmin;
