import React from "react";
import styles from "./Hero.module.css";

const Hero = () => {
  return (
    <section className={styles.heroSection}>
      <div className={styles.heroOverlay}></div>
      <div className={styles.heroContent}>
        <h1 className={styles.heroTitle}>Ensuring your pets</h1>
        <h2 className={styles.heroSubtitle}>live their best lives</h2>
      </div>
    </section>
  );
};

export default Hero;