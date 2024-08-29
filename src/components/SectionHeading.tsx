import React from "react";

type THeadingProps = {
  title: string;
  subTitle: string;
};

const SectionHeading: React.FC<THeadingProps> = ({ title, subTitle }) => {
  return (
    <div
      style={{ textAlign: "center", marginTop: "30px", marginBottom: "30px" }}
    >
      <h2 style={{ fontSize: "32px" }}>{title}</h2>
      <h3 style={{ fontSize: "24px" }}>{subTitle}</h3>
      <div
        style={{
          width: "80%",
          height: "4px",
          background: "orange",
          margin: "5px auto",
          borderRadius: "10px",
        }}
      ></div>
    </div>
  );
};

export default SectionHeading;
