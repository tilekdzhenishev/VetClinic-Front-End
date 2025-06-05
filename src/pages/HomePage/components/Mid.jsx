import React from 'react';
import styles from './Mid.module.css';
import midImage from '../../../assets/mid-image.png';

const Mid = () => {
  return (
    <section className={styles.midSection}>
      <div className={styles.container}>
        <div className={styles.textContainer}>
          <h2 className={styles.title}>Prioritizing your pet companion</h2>
          <p className={styles.description}>
            At{" "}
            <a href="#" className={styles.blueLink}>
              VetClinic Poznań
            </a>
            , our primary goal is to ensure that every pet we care for leads a
            happy, healthy life. We are dedicated to providing the highest
            standard of veterinary care, delivered with compassion and
            professionalism.
          </p>
          <p className={styles.description}>
            Our team of experienced veterinarians and support staff work
            tirelessly to promote preventive care for your lovely pet, providing
            comprehensive treatments and supporting through all life stages.
          </p>
        </div>
        <div className={styles.imageContainer}>
          <img
            src={midImage}
            alt="Veterinarian with a dog"
            className={styles.midImage}
          />
        </div>
      </div>
    </section>
  );
};

export default Mid;