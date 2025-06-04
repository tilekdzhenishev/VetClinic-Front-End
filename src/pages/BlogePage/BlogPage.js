import { useState } from "react";
import "./BlogPage.css";
import hero from "../assets/hero.png";
import logo from "../assets/logo.png";
import loc1 from "../assets/location1.png";
import vet from "../assets/vet.png";

const faqs = [
  {
    question: "What is VetClinic Poznan?",
    answer:
      "VetClinic Poznan is a modern veterinary clinic providing expert care in Poznan. Our staff ensures top-quality treatment and compassion.",
  },
  {
    question: "How can I book consultation?",
    answer: "You can book an appointment online using the 'Book Visit' button.",
  },
  {
    question: "What’s the difference between online and offline consultation?",
    answer:
      "Online consultations are remote via video call. Offline consultations require visiting our clinic for in-person exams.",
  },
];

export default function BlogPage() {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <div className="blog-wrapper">
      <header className="hero" style={{ backgroundImage: `url(${hero})` }}>
        <nav className="nav">
          <img src={logo} alt="Logo" className="logo" />
          <ul>
            <li>Home</li>
            <li>Consult</li>
            <li>Docs</li>
            <li>Contact</li>
          </ul>
        </nav>
        <div className="hero-content">
          <h1>Visit us for expert pet care where compassion meets excellence!</h1>
          <button className="primary-btn">Visit Blog</button>
        </div>
      </header>

      <section className="about-section">
        <div className="text">
          <h2>Providing best services for your pets</h2>
          <p>
            At VetClinic Poznan, we offer online consultations for your furry friends and ensure the best medical care. Our clinic combines state-of-the-art equipment and experienced veterinarians to provide quality and gentle support tailored to your pet’s individual needs.
          </p>
        </div>
        <img src={vet} alt="Vet" />
      </section>

      <section className="locations">
        <div className="section-header">
          <h2>Clinic Locations</h2>
          <span className="see-all">See all</span>
        </div>
        <div className="location-card">
          <img src={loc1} alt="Location" />
          <div>
            <h3>Pawsville</h3>
            <p>
              Visit us at Pawsville, our clinic located in downtown Poznan. Modern facilities, expert staff, and compassionate service await you and your pets.
            </p>
            <button className="primary-btn">Book Visit</button>
          </div>
        </div>
      </section>

      <section className="faq">
        <h2>Frequently Asked Questions</h2>
        <div className="faq-list">
          {faqs.map((faq, index) => (
            <div key={index} className="faq-item">
              <button onClick={() => setOpenIndex(openIndex === index ? null : index)}>
                {faq.question}
              </button>
              {openIndex === index && <p>{faq.answer}</p>}
            </div>
          ))}
        </div>
      </section>

      <footer className="footer">
        <div className="footer-content">
          <div>
            <strong>VetClinic Poznan</strong>
            <p>Consultation • Book Visit</p>
          </div>
          <div>
            <p>© {new Date().getFullYear()} VetClinic. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
