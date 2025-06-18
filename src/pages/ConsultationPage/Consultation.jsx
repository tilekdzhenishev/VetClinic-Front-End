import React, { useState } from "react";
import "./Consultation.css";
import Header from "../../components/Header/Header";
import Footer from "../HomePage/components/Footer";
import consultImg from "../../assets/images/consult-2.png";
import clinicImg from "../../assets/images/consult-3.png";
import MultiStepFormModal from "../../components/BookingForm/BookingFrom";


function Consultation() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <Header />
      <main className="consultation-page">
        <section className="hero">
          <div className="hero-content">
            <h1>Convenient and offline veterinary services</h1>
          </div>
        </section>

        <section className="consult-section">
          <div className="consult-left">
            <h2>Connect with A Vet</h2>
            <p>
              Get expert veterinary care from the comfort of your home. Our
              face-to-face consultations provide convenient access to
              professional advice, follow-up visits, and non-emergency
              consultations. Book your appointment today for hassle-free pet
              care.
            </p>
            <button
              className="primary-btn"
              onClick={() => setIsModalOpen(true)}
            >
              Consultation →
            </button>
          </div>
          <div className="consult-right">
            <img
              src={consultImg}
              alt="Online consultation"
              className="consult-image"
            />
          </div>
        </section>

        <section className="visit-section">
          <div className="visit-left">
            <img src={clinicImg} alt="Clinic visit" className="consult-image" />
          </div>
          <div className="visit-right">
            <h2>Visit Our Clinic</h2>
            <p>
              Visit our clinic for comprehensive veterinary care. Our
              experienced team provides thorough physical examinations, advanced
              diagnostics, and personalized treatments to ensure your pet’s
              health and well-being.
            </p>
            <button className="primary-btn">Schedule a visit →</button>
          </div>
        </section>
      </main>

      <MultiStepFormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
      <Footer />
    </>
  );
}

export default Consultation;
