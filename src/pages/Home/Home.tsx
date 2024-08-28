import React from "react";
import Hero from "./Hero";
import CustomContainer from "../../components/CustomContainer";
import Service from "./Service";
import FeaturedRoom from "./FeaturedRoom";

const Home: React.FC = () => {
  return (
    <div>
      <Hero />
      <CustomContainer>
        <Service />
        <FeaturedRoom />
      </CustomContainer>
    </div>
  );
};

export default Home;
