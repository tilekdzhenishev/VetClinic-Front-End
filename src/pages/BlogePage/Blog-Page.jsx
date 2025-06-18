import React, { useState, useEffect } from 'react';
import HeroSection from '../../components/BlogPage/HeroSection/HeroSection';
import Footer from '../HomePage/components/Footer';
import Header from '../../components/Header/Header';
import ServicesSection from '../../components/BlogPage/ServicesSection/ServicesSection';
import FaqSection from '../../components/BlogPage/FaqSection/FaqSection';
import ClinicLocationsSection from '../../components/BlogPage/ClinicLocationsSection/ClinicLocationsSection';


function App() {
  return (
    <div className="vet-clinic-app">
      <Header />
      <HeroSection />

      <ServicesSection />


      <ClinicLocationsSection />


      <FaqSection />
      <Footer />
    </div>
  );
}












export default App;

