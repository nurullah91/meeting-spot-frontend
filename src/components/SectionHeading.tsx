import React from "react";

type THeadingProps = {
  title: string;
  subTitle?: string;
};

const SectionHeading: React.FC<THeadingProps> = ({ title, subTitle }) => {
  return (
    <div
      style={{ textAlign: "center", marginTop: "30px", marginBottom: "30px" }}
    >
      {title && <h2 style={{ fontSize: "32px", color: "#003366" }}>{title}</h2>}
      {subTitle && <h3 style={{ fontSize: "24px" }}>{subTitle}</h3>}
      <div
        style={{
          width: "500px",
          height: "4px",
          background: "linear-gradient(90deg, #313ff3, #e91bf7)",
          margin: "5px auto",
          borderRadius: "10px",
        }}
      ></div>
    </div>
  );
};

export default SectionHeading;
