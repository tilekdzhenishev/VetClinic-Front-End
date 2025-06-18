import React from 'react';
import styles from './Sidebar.module.css';
import logo from '../../../assets/images/logo.png';
import { useNavigate } from 'react-router';

import dashboardIcon from '../../../assets/images/dashboard_icon.png';
import workstaffIcon from '../../../assets/images/workstaff_icon.png';
import settingsIcon from '../../../assets/images/settings_icon.png';
import logoutIcon from '../../../assets/images/logout_icon.png';

const Sidebar = ({ currentPage, onNavigate, isDarkMode, setIsDarkMode }) => {
  const navigate = useNavigate();

  return (
    <div className={`${styles.sidebar} ${isDarkMode ? styles.darkMode : ''}`}>
      <div className={styles.logoContainer}>
        <img src={logo} alt="Vet Clinic Logo" className={styles.logo} />
      </div>
      <nav className={styles.nav}>
        <ul className={styles.navList}>
          <li className={styles.navItem}>
            <a
              href="#"
              onClick={() => onNavigate('dashboard')}
              className={`${styles.navLink} ${currentPage === 'dashboard' ? styles.navLinkActive : ''}`}
            >
              <img src={dashboardIcon} alt="Dashboard Icon" className={styles.navIcon} />
              <span className={styles.navText}>Dashboard</span>
            </a>
          </li>
          <li className={styles.navItem}>
            <a
              href="#"
              onClick={() => onNavigate('workstaff')}
              className={`${styles.navLink} ${currentPage === 'workstaff' ? styles.navLinkActive : ''}`}
            >
              <img src={workstaffIcon} alt="Work Staff Icon" className={styles.navIcon} />
              <span className={styles.navText}>Work staff</span>
            </a>
          </li>
          <li className={styles.navItem}>
            <a
              href="#"
              onClick={() => onNavigate('consultations')}
              className={`${styles.navLink} ${currentPage === 'consultations' ? styles.navLinkActive : ''}`}
            >
              <img src={dashboardIcon} alt="Consultations Icon" className={styles.navIcon} />
              <span className={styles.navText}>Consultations</span>
            </a>
          </li>
          <li className={styles.navItem}>
            <a
              href="#"
              onClick={() => onNavigate('settings')}
              className={`${styles.navLink} ${currentPage === 'settings' ? styles.navLinkActive : ''}`}
            >
              <img src={settingsIcon} alt="Settings Icon" className={styles.navIcon} />
              <span className={styles.navText}>Settings</span>
            </a>
          </li>
          <li className={styles.navItem}>
            <a
              href="#"
              onClick={() => onNavigate('logout')}
              className={styles.navLink}
            >
              <img src={logoutIcon} alt="Log Out Icon" className={styles.navIcon} />
              <span className={styles.navText}>Log Out</span>
            </a>
          </li>
        </ul>
      </nav>
      <div className={styles.bottomSection}>
        <a href="#" onClick={() => navigate(-1)} className={styles.backLink}>
          <span className={styles.navIcon}>←</span>
          <span className={styles.backText}>Back</span>
        </a>
      </div>
    </div>
  );
};

export default Sidebar;
