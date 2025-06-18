import React, { useState, useEffect } from 'react';
import './ClinicLocationsSection.css'
import slide1 from '../../../assets/images/location1.png'
import slide2 from '../../../assets/images/location2.png'
import slide3 from '../../../assets/images/location3.png'

function ClinicLocationsSection() {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [itemsPerSlide, setItemsPerSlide] = useState(3);

    const clinics = [
        {
            id: 1,
            name: "Pawsville",
            location: "Poznan",
            description: "Located at the heart of Old Town, Poznan, our clinic at Pawsville offers a welcoming and comfortable environment for you and your pet. With convenient parking and easy access, we make sure your visit is stress-free. Our passionate team is committed to providing exceptional care.",
            image: slide1, 
        },
        {
            id: 2,
            name: "Pet Central",
            location: "Poznan",
            description: "Our Pet Central clinic in Poznan is equipped with state-of-the-art facilities to provide the best medical care for your beloved animals. We focus on preventive care and early detection.",
            image: slide2,
        },
        {
            id: 3,
            name: "Happy Tails",
            location: "Poznan",
            description: "Happy Tails in Poznan offers a holistic approach to pet health, combining modern veterinary medicine with compassionate care. Your pet's well-being is our priority.",
            image: slide3,
        },
 
    ];


    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth <= 768) {
                setItemsPerSlide(1);
            } else if (window.innerWidth <= 1024) {
                setItemsPerSlide(2);
            } else {
                setItemsPerSlide(3);
            }
        };

        // Устанавливаем начальное значение
        handleResize();

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const nextSlide = () => {
        setCurrentSlide((prev) => (prev === clinics.length - itemsPerSlide ? 0 : prev + 1));
    };

    const prevSlide = () => {
        setCurrentSlide((prev) => (prev === 0 ? clinics.length - itemsPerSlide : prev - 1));
    };

    return (
        <section className="clinic-locations-section">

            <div className="clinic-locations-header">
                <h2>Clinic Locations</h2>
                <a href="#" className="see-all-link">See all</a>
            </div>
            <div className="carousel-container">
              
                <div className="carousel-wrapper" style={{ transform: `translateX(-${currentSlide * (100 / itemsPerSlide)}%)`, width: `calc(100% * ${clinics.length / itemsPerSlide})` }}>
                    {clinics.map((clinic) => (
                        <div key={clinic.id} className="carousel-item" style={{ minWidth: `calc(100% / ${itemsPerSlide})` }}>
                            <img
                                src={clinic.image}
                                alt={`Клиника ${clinic.name}`}
                                onError={(e) => { e.target.onerror = null; e.target.src = "https://placehold.co/600x400/cccccc/333333?text=Заглушка+для+изображения+клиники"; }}
                            />
                            <div className="clinic-info">
                                <h3>{clinic.name}</h3>
                                <p className="clinic-description">{clinic.description}</p>
                                <button className="book-visit-button">Book visit</button>
                            </div>
                        </div>
                    ))}
                </div>
                <button className="carousel-button prev" onClick={prevSlide}>&#10094;</button>
                <button className="carousel-button next" onClick={nextSlide}>&#10095;</button>
            </div>
        </section>
    );
}

export default ClinicLocationsSection;
