import React from "react";
import styles from "./Footer.module.css";
import facebookIcon from "../../../assets/images/facebook.png";
import instagramIcon from "../../../assets/images/instagram.png";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.footerContent}>
          {/* Left Section */}
          <div className={styles.section}>
            <h3 className={styles.sectionTitle}>VetClinic Poznan</h3>
            <ul className={styles.linksList}>
              <li><a href="#" className={styles.link}>Consultation</a></li>
              <li><a href="#" className={styles.link}>About Us</a></li>
              <li><a href="#" className={styles.link}>Contact</a></li>
            </ul>
          </div>

          {/* Middle Section */}
          <div className={styles.section}>
            <h3 className={styles.sectionTitle}>Stay Connected</h3>
            <div className={styles.contactInfo}>
              <p className={styles.contactText}>
                Contact: <a href="mailto:hi.clinic@vetclinicpoznan.com" className={styles.emailLink}>hi.clinic@vetclinicpoznan.com</a>
              </p>
            </div>
            <div className={styles.socialIcons}>
              <a href="#" className={styles.socialLink} aria-label="Facebook">
                <img src={facebookIcon} alt="Facebook" className={styles.socialIcon} />
              </a>
              <a href="#" className={styles.socialLink} aria-label="Instagram">
                <img src={instagramIcon} alt="Instagram" className={styles.socialIcon} />
              </a>
            </div>
          </div>

          {/* Right Section */}
          <div className={styles.section}>
            <h3 className={styles.sectionTitle}>Join as patient of our Clinic!</h3>
            <p className={styles.servicesText}>Our services are wide open for you</p>
            <button className={styles.bookingButton}>Booking</button>
          </div>
        </div>

        {/* Bottom Section */}
        <div className={styles.bottomSection}>
          <span className={styles.copyright}>©VetClinicPoznan.co</span>
          <span className={styles.separator}>•</span>
          <a href="#" className={styles.privacyLink}>Terms and Privacy Policy</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;