import React, { useState } from 'react'
import './FaqSection.css'

function FaqSection() {
    const [openIndex, setOpenIndex] = useState(null);

    const faqItems = [
        {
            question: "What is Vet-Clinic Poznan?",
            answer: "Vet-Clinic Poznan is a modern veterinary clinic offering comprehensive medical services for pets, including preventive care, diagnostics, and treatment. We aim to provide the best possible care for your beloved animals.",
        },
        {
            question: "How can I book consultation?",
            answer: "You can book a consultation by calling us directly, using our online booking system on the website, or by visiting our clinic in person. We recommend booking in advance to ensure availability.",
        },
        {
            question: "What's the differences between online and offline consultation?",
            answer: "Online consultations are convenient for general advice, follow-ups, or minor issues where a physical examination isn't strictly necessary. Offline consultations involve a direct visit to our clinic, allowing for thorough physical examinations, diagnostic tests, and immediate treatment if needed.",
        },
        {
            question: "How do I pay for the scheduling my visit?",
            answer: "We accept various payment methods including credit/debit cards, bank transfers, and cash at the clinic. For online consultations, payment is typically processed securely through our website before the session.",
        },
    ];

    const toggleAccordion = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <section className="faq-section">
            <h2>Frequently Asked Questions</h2>
            <div className="accordion-container">
                {faqItems.map((item, index) => (
                    <div key={index} className={`accordion-item ${openIndex === index ? 'open' : ''}`}>
                        <button className="accordion-header" onClick={() => toggleAccordion(index)}>
                            <span>{item.question}</span>
                            <span className="accordion-icon">{openIndex === index ? '-' : '+'}</span>
                        </button>
                        <div className="accordion-content">
                            <p>{item.answer}</p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}

export default FaqSection