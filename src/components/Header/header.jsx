import React from "react";
import styles from "./Header.module.css";
import logo from "../../assets/images/logo.png";
import SignUp from "../../pages/Auth/SignUp/SignUp";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";

function Header() {
  const navigate = useNavigate();

  const handleButton = async (e) => {
    e.preventDefault();

    navigate("/signup");
  };
  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <img src={logo} alt="VetClinic Logo" className={styles.logoImage} />
      </div>
      <nav>
        <ul className={styles.navList}>
          <li className={styles.navItem}>
          <Link to="/" className={styles.navLink}>
              Home
            </Link>
          </li>
          <li className={styles.navItem}>
            <Link to="/consultation" className={styles.navLink}>
              Consultation
            </Link>
          </li>
          <li className={styles.navItem}>
            <a className={styles.navLink} href="#">
              Blog
            </a>
          </li>
          <li className={styles.navItem}>
            <a className={styles.navLink} href="#">
              Contacts
            </a>
          </li>
        </ul>
      </nav>
      <button className={styles.button} onClick={handleButton}>
        Sign Up
      </button>
    </header>
  );
}

export default Header;
