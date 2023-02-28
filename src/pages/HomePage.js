import React from "react";
import { FeaturedProducts, Hero, Services, Contact } from "../components";
const HomePage = () => {
  return (
    <section>
      <Hero />
      <FeaturedProducts />
      <Services />
      <Contact />
    </section>
  );
};

export default HomePage;
