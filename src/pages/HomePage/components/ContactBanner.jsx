import React from "react";
import styles from "./ContactBanner.module.css";
import contactImage from "../../../assets/images/contact-image.png"; 

const ContactBanner = () => {
  return (
    <section className={styles.contactBanner}>
      <div className={styles.container}>
        <div className={styles.textContainer}>
          <h2 className={styles.title}>
            Our experts are
            <span className={styles.titleBlock}>available for you 24/7</span>
          </h2>
          <div className={styles.contactInfo}>
            <p>
              <span className={styles.icon}>📞</span> 48 21345 8888
            </p>
            <p>
              <span className={styles.icon}>📞</span> 48 21345 4444 (Emergency
              Services)
            </p>
            <p>
              <span className={styles.icon}>✉️</span> mail@vetclinicpoznan.com
            </p>
          </div>
        </div>
        <div className={styles.imageContainer}>
          <img
            src={contactImage}
            alt="Veterinarian with a dog"
            className={styles.contactImage}
          />
        </div>
      </div>
    </section>
  );
};

export default ContactBanner;