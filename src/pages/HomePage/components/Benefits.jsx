import React from "react";
import styles from "./Benefits.module.css";
import CarouselImage1 from '../../../assets/images/Carousel1.png';
import CarouselImage2 from '../../../assets/images/CarouselImage2.png';
import CarouselImage3 from '../../../assets/images/CarouselImage3.png';
import CarouselImage4 from '../../../assets/images/CarouselImage4.png';

const Benefits = () => {
  const benefits = [
    {
      id: 1,
      title: "Professional Team",
      image: CarouselImage1,
    },
    {
      id: 2,
      title: "Treat with ❤️",
      image: CarouselImage2,
    },
    {
      id: 3,
      title: "Emergency Call Services",
      image: CarouselImage3,
    },
    {
      id: 4,
      title: "Best Products Use Only",
      image: CarouselImage4,
    },

  ];

  return (
    <section className={styles.benefitsSection}>
      <div className={styles.container}>

        <div className={styles.sectionHeader}>

          <h2 className={styles.title}>BENEFITS</h2>

        </div>


        <div className={styles.scrollContainer}>
          <div className={styles.benefitsList}>
            {benefits.map((benefit) => (
              <div key={benefit.id} className={styles.benefitCard}>

                <div className={styles.cardImage}>
                  <img
                    src={benefit.image}
                    alt={benefit.title}
                    className={styles.image}
                  />
                  <div className={styles.imageOverlay}></div>
                </div>


                <div className={styles.cardContent}>
                  <div className={styles.cardTitle}>
                    <h3>{benefit.title}</h3>
                  </div>

                </div>


                <div className={styles.hoverOverlay}></div>
              </div>
            ))}
          </div>


        </div>


        <div className={styles.mobileHint}>
          <p>👈 Swipe to see more benefits</p>
        </div>
      </div>
    </section>
  );
};

export default Benefits;