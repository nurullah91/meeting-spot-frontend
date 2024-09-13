import React from "react";
import Hero from "./Hero";
import CustomContainer from "../../components/CustomContainer";
import Service from "./Service";
import FeaturedRoom from "./FeaturedRoom";
import WhyChooseUs from "./WhyChooseUs";
import HowItWorks from "./HowItWorks";
import Testimonials from "./Testimonials";

const Home: React.FC = () => {
  return (
    <div>
      <Hero />
      <CustomContainer>
        <Service />
        <FeaturedRoom />
        <WhyChooseUs />
        <HowItWorks />
        <Testimonials />
      </CustomContainer>
    </div>
  );
};

export default Home;
