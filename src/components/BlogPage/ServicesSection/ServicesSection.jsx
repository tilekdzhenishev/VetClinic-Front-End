import React from 'react'
import './Services.css'
import ServiceImage from '../../../assets/images/services.png'

function ServicesSection() {
    return (
        <section className="services-section">
            <div className="services-header">
                <h2>Providing best services for your pets</h2>
                <p>At VetClinic Poznan, we provide a long-term solution for all your pet’s health. We offer comprehensive services, including preventive care, diagnostics, and treatment plans tailored to your pet’s unique needs. Our experienced and compassionate team is dedicated to providing the highest quality veterinary care in a warm and friendly environment.</p>
            </div>
            <div className="services-image">
                <img
                    src={ServiceImage}

                    onError={(e) => { e.target.onerror = null; e.target.src = "https://placehold.co/800x450/cccccc/333333?text=Заглушка+для+изображения"; }}
                />
            </div>
        </section>
    );
}

export default ServicesSection