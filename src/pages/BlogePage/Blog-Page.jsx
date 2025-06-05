
import { useState } from 'react';
import './BlogPage.css';
import logo from '../../assets/images/logo.png';
import heroImg from '../../assets/images/hero.png';
import loc1 from '../../assets/images/location1.png';
import loc2 from '../../assets/images/location2.png';
import loc3 from '../../assets/images/location3.png';

const clinics = [
  { name: 'Pawsville', desc: 'Located at the heart of VetClinic Poznan...', image: loc1 },
  { name: 'Barktown', desc: 'Find us at 456 Furry Friend Road in vibrant Wroclaw...', image: loc2 },
  { name: 'Meow City', desc: 'Situated at 789 Whisker Way, our clinic in Gdansk...', image: loc3 },
];

const faqs = [
  { question: 'What is VetClinic Poznan?', answer: 'VetClinic Poznań is a modern veterinary clinic based in Poznań...' },
  { question: 'What is Pawcare?', answer: 'Pawcare is an online platform that helps pet owners easily book appointments...' },
  { question: 'How can I book consultation?', answer: 'You can book a consultation by clicking the "Book Now" button...' },
];

export default function BlogPage() {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <div className="blog-page">
      <section className="hero" style={{ backgroundImage: `url(${heroImg})` }}>
        <div className="hero-content">
          <img src={logo} alt="VetClinic Logo" className="hero-logo" />
          <h1 className="text-4xl font-bold">Welcome to VetClinic</h1>
          <p className="mt-4 text-xl max-w-xl">
            Compassionate care for your furry family members.
          </p>
        </div>
      </section>

      <section className="section">
        <h2 className="section-title">Our Locations</h2>
        <div className="clinic-grid">
          {clinics.map((clinic, index) => (
            <div key={index} className="clinic-card">
              <img src={clinic.image} alt={clinic.name} />
              <div className="p-4">
                <h3>{clinic.name}</h3>
                <p className="text-gray-600 text-sm">{clinic.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="section" style={{ maxWidth: '64rem' }}>
        <h2 className="section-title">FAQs</h2>
        {faqs.map((faq, index) => (
          <div key={index} className="mb-4 border-b">
            <button
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
              className="faq-question"
            >
              {faq.question}
            </button>
            {openIndex === index && (
              <p className="faq-answer">{faq.answer}</p>
            )}
          </div>
        ))}
      </section>

      <footer className="footer">
        &copy; {new Date().getFullYear()} VetClinic. All rights reserved.
      </footer>
    </div>
  );
}
