import React from "react";
import styles from "./ContactBanner.module.css";
import contactImage from "../../../assets/images/contact-image.png";

const ContactBanner = () => {
  return (
    <section className={styles.contactSection}>
      <div className={styles.contactBanner}>
        <div className={styles.container}>
          <div className={styles.textContainer}>
            <h2 className={styles.title}>
              Our experts are
              <span className={styles.titleBlock}>available for you 24/7</span>
            </h2>
            <div className={styles.contactInfo}>
              <div className={styles.contactItem}>
                <span className={styles.icon}>📞</span>
                <span className={styles.contactText}>48 21345 8888</span>
              </div>
              <div className={styles.contactItem}>
                <span className={styles.icon}>🚨</span>
                <span className={styles.contactText}>48 21345 4444 (Emergency Services)</span>
              </div>
              <div className={styles.contactItem}>
                <span className={styles.icon}>✉️</span>
                <span className={styles.contactText}>mail@vetclinicpoznan.com</span>
              </div>
            </div>
            <button className={styles.contactButton}>Contact Us Now</button>
          </div>
          <div className={styles.imageContainer}>
            <img
              src={contactImage}
              alt="Veterinarian with a dog"
              className={styles.contactImage}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactBanner;