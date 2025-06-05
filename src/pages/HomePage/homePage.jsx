import React, { Fragment } from "react";
import Header from "../../components/Header/header";
import Hero from "./components/hero";
import Mid from "./components/Mid";
import Benefits from "./components/Benefits";
import ContactBanner from "./components/ContactBanner";
import Footer from "./components/Footer";
const HomePage = () => {
  return (
    <Fragment>
      <Header />
      <Hero />
      <Mid />
      <Benefits />
      <ContactBanner />
      <Footer />
    </Fragment>
  );
};

export default HomePage;