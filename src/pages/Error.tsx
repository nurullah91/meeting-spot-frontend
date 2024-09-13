import React from "react";
import { Link, useRouteError } from "react-router-dom";
import Lottie from "lottie-react";
import errorAnimation from "../assets/errorAnimation.json";
const Error: React.FC = () => {
  const { error, status } = useRouteError() as {
    error?: { message: string };
    status?: number;
  };

  return (
    <section
      style={{
        display: "flex",
        alignItems: "center",
        height: "100vh",
        padding: "4rem",
        backgroundColor: "#D1D5DB",
        color: "#111827",
      }}
    >
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
        <Lottie animationData={errorAnimation} loop={true} />
        <div style={{ textAlign: "center" }}>
          <p
            style={{
              fontSize: "1.5rem",
              fontWeight: 600,
              color: "#D946EF",
              marginBottom: "2rem",
            }}
          >
            {error?.message} {status || 404}
          </p>
          <Link
            to="/"
            style={{
              backgroundImage: "linear-gradient(to right, #9D4EDD, #EC4899)",
              paddingTop: "0.75rem",
              paddingBottom: "0.75rem",
              paddingLeft: "1rem",
              paddingRight: "1rem",
              borderRadius: "0.375rem",
              fontWeight: "bold",
              color: "#FFFFFF",
              cursor: "pointer",
              textDecoration: "none",
            }}
          >
            Back to homepage
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Error;
