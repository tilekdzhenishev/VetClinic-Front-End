import { useState } from 'react';
import './BlogPage.css';

import Header from '../../components/Header/header.jsx';

import heroImgSrc from '../../assets/images/hero.png';
import loc1 from '../../assets/images/location1.png';
import loc2 from '../../assets/images/location2.png';
import loc3 from '../../assets/images/location3.png';
import vetImg from '../../assets/images/services.png'; // Убедись, что файл существует

const clinics = [
  {
    name: 'Pawsville',
    desc: 'Located at the heart of VetClinic Poznan, our Pawsville branch offers top-notch care with a friendly smile.',
    image: loc1,
  },
  {
    name: 'Barktown',
    desc: 'Find us at 456 Furry Friend Road in vibrant Wroclaw, where your pet’s wellness is our passion.',
    image: loc2,
  },
  {
    name: 'Meow City',
    desc: 'Situated at 789 Whisker Way, our clinic in Gdansk brings comfort and professional care to every patient.',
    image: loc3,
  },
];

const faqs = [
  {
    question: 'What is VetClinic Poznan?',
    answer:
      'VetClinic Poznań is a modern veterinary clinic based in Poznań. Our experienced vets offer full-service care for your pets.',
  },
  {
    question: 'What is Pawcare?',
    answer:
      'Pawcare is an online platform that helps pet owners easily book appointments and manage pet health records online.',
  },
  {
    question: 'How can I book consultation?',
    answer:
      'You can book a consultation by clicking the "Book Now" button on our website, or visiting the Pawcare platform directly.',
  },
];

export default function BlogPage() {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <div className="blog-page">
      <Header />

      {/* Hero Section */}
      <section
        className="hero"
        style={{
          backgroundImage: heroImgSrc ? `url(${heroImgSrc})` : 'none',
          backgroundColor: !heroImgSrc ? '#3b82f6' : undefined,
        }}
      >
        <div className="hero-content">
          <h1 className="text-4xl font-bold">Visit us for expert pet care</h1>
          <p className="mt-4 text-xl max-w-xl">Where compassion meets excellence!</p>
          <button className="primary-btn">Visit Blog →</button>
        </div>
      </section>

      {/* Services Section */}
      <section className="section service-section">
        <div className="service-content">
          <div className="service-text">
            <h2 className="section-title text-left">
              Providing best services<br />for your pets
            </h2>
            <p>
              At VetClinic Poznan, our in-clinic consultations offer comprehensive care to ensure your pet’s health and well-being.
              Our experienced veterinarians conduct thorough physical examinations, use advanced diagnostic tools,
              and create personalized treatment plans tailored to your pet’s unique needs.
            </p>
          </div>
          <div className="service-image">
            <img src={vetImg} alt="Veterinarian with dog" />
          </div>
        </div>
      </section>

      {/* Clinic Locations Section */}
      <section className="section clinic-section">
        <h2 className="section-title">Clinic Locations</h2>
        <div className="clinic-grid-cards">
          {clinics.map((clinic, index) => (
            <div key={index} className="clinic-card-new">
              <img src={clinic.image} alt={clinic.name} className="clinic-img" />
              <div className="clinic-content">
                <h3>{clinic.name}</h3>
                <p>{clinic.desc}</p>
                <div className="card-spacer" />
                <button className="clinic-btn">Read More →</button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ Section */}
      <section className="section faq-section">
        <h2 className="section-title">FAQs</h2>
        {faqs.map((faq, index) => (
          <div key={index} className="faq-item">
            <button
              className={`faq-question ${openIndex === index ? 'open' : ''}`}
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
            >
              {faq.question}
              <span className="faq-icon">{openIndex === index ? '−' : '+'}</span>
            </button>
            {openIndex === index && (
              <div className="faq-answer-box">
                <p>{faq.answer}</p>
              </div>
            )}
          </div>
        ))}
      </section>

      {/* Footer */}
      <footer className="footer">
        &copy; {new Date().getFullYear()} VetClinic. All rights reserved.
      </footer>
    </div>
  );
}
