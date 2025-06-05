import React from "react";
import styles from "./Footer.module.css";
import facebookIcon from "../../../assets/facebook.png";
import instagramIcon from "../../../assets/instagram.png";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.leftSection}>
          <h3 className={styles.clinicName}>VetClinic Poznań</h3>
          <ul className={styles.linksList}>
            <li className={styles.listItem}>
              <a href="#" className={styles.link}>
                Consultation
              </a>
            </li>
            <li className={styles.listItem}>
              <a href="#" className={styles.link}>
                About Us
              </a>
            </li>
            <li className={styles.listItem}>
              <a href="#" className={styles.link}>
                Contact
              </a>
            </li>
          </ul>
        </div>

        <div className={styles.middleSection}>
          <h3 className={styles.stayConnected}>Stay Connected</h3>
          <p className={styles.contactEmail}>
            Contact:{" "}
            <a href="mailto:hi.clinic@vetclinicpoznan.com">
              hi.clinic@vetclinicpoznan.com
            </a>
          </p>
          <div className={styles.socialIcons}>
            <a href="#" className={styles.socialLink}>
              <img src={facebookIcon} alt="Facebook" className={styles.icon} />
            </a>
            <a href="#" className={styles.socialLink}>
              <img
                src={instagramIcon}
                alt="Instagram"
                className={styles.icon}
              />
            </a>
          </div>
        </div>

        <div className={styles.rightSection}>
          <h3 className={styles.joinUs}>Join as patient of our Clinic!</h3>
          <p className={styles.ourServices}>
            Our services are wide open for you
          </p>
          <button className={styles.bookingButton}>Booking</button>
        </div>
      </div>
      <div className={styles.copyright}>
        ©VetClinicPoznan.co •{" "}
        <a href="#" className={styles.privacyLink}>
          Terms and Privacy Policy
        </a>
      </div>
    </footer>
  );
};

export default Footer;