import React from "react";

type THeadingProps = {
  title: string;
  subTitle?: string;
};

const SectionHeading: React.FC<THeadingProps> = ({ title, subTitle }) => {
  return (
    <div
      style={{ textAlign: "center", marginTop: "50px", marginBottom: "30px" }}
    >
      {title && <h2 style={{ fontSize: "32px", color: "#003366" }}>{title}</h2>}
      {subTitle && (
        <h3 style={{ fontSize: "24px", color: "#003366" }}>{subTitle}</h3>
      )}
      {/* gradient line after title */}
      <div
        style={{
          maxWidth: "500px",
          width: "80%",
          height: "4px",
          background: "#4682B4",
          margin: "5px auto",
          borderRadius: "10px",
        }}
      ></div>
    </div>
  );
};

export default SectionHeading;
