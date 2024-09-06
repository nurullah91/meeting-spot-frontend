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
          background: "orange",
          margin: "5px auto",
          borderRadius: "10px",
        }}
      ></div>
    </div>
  );
};

export default SectionHeading;
