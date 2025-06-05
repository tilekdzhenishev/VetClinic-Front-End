import React from 'react';
import styles from './Hero.module.css';

const Hero = () => {
  return (
    <section
      className={styles.heroSection}
      style={{ backgroundImage: `url(${heroBg})` }}
    >
      <div className={styles.heroContent}>
        <h1 className={styles.heroTitle}>Ensuring your pets live their best lives</h1>
      </div>
    </section>
  );
};

export default Hero;
