import React from 'react';
import styles from './Header.module.css';
import logo from '../../assets/logo.png';

function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <img src={logo} alt="VetClinic Logo" className={styles.logoImage} />
      </div>
      <nav>
        <ul className={styles.navList}>
          <li className={styles.navItem}><a className={styles.navLink} href="#">Home</a></li>
          <li className={styles.navItem}><a className={styles.navLink} href="#">Consultation</a></li>
          <li className={styles.navItem}><a className={styles.navLink} href="#">Blog</a></li>
          <li className={styles.navItem}><a className={styles.navLink} href="#">Contacts</a></li>
        </ul>
      </nav>
      <button className={styles.button}>Sign Up</button>
    </header>
  );
}

export default Header;