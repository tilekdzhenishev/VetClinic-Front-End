import React from 'react';
import styles from './Sidebar.module.css';
import logo from '../../../assets/images/logo.png';

import dashboardIcon from '../../../assets/images/dashboard_icon.png';
import workstaffIcon from '../../../assets/images/workstaff_icon.png';
import settingsIcon from '../../../assets/images/settings_icon.png';
import logoutIcon from '../../../assets/images/logout_icon.png';

const translations = {
  English: {
    dashboard: 'Dashboard',
    workstaff: 'Work staff',
    settings: 'Settings',
    logout: 'Log Out',
    theme: 'Theme',
    back: 'Back',
  },
};

const Sidebar = ({ currentPage, onNavigate, isDarkMode, setIsDarkMode, appLanguage }) => {
  const t = translations[appLanguage] || translations.English;

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
              <span className={styles.navText}>{t.dashboard}</span>
            </a>
          </li>
          <li className={styles.navItem}>
            <a
              href="#"
              onClick={() => onNavigate('workstaff')}
              className={`${styles.navLink} ${currentPage === 'workstaff' ? styles.navLinkActive : ''}`}
            >
              <img src={workstaffIcon} alt="Work Staff Icon" className={styles.navIcon} />
              <span className={styles.navText}>{t.workstaff}</span>
            </a>
          </li>
          <li className={styles.navItem}>
            <a
              href="#"
              onClick={() => onNavigate('settings')}
              className={`${styles.navLink} ${currentPage === 'settings' ? styles.navLinkActive : ''}`}
            >
              <img src={settingsIcon} alt="Settings Icon" className={styles.navIcon} />
              <span className={styles.navText}>{t.settings}</span>
            </a>
          </li>
          <li className={styles.navItem}>
            <a
              href="#"
              onClick={() => onNavigate('logout')}
              className={styles.navLink}
            >
              <img src={logoutIcon} alt="Log Out Icon" className={styles.navIcon} /> 
              <span className={styles.navText}>{t.logout}</span>
            </a>
          </li>
        </ul>
      </nav>
      <div className={styles.bottomSection}>
        <div className={styles.themeToggle}>
          <span>{t.theme}</span>
          <label className={styles.toggleSwitch}>
            <input
              type="checkbox"
              checked={isDarkMode}
              onChange={() => setIsDarkMode(!isDarkMode)}
              className={styles.toggleInput}
            />
            <span
              className={`${styles.slider} ${isDarkMode ? styles.toggleInputChecked : ''}`}
            >
              <span
                className={`${styles.sliderRound} ${isDarkMode ? styles.toggleInputCheckedSlider : ''}`}
              ></span>
            </span>
          </label>
        </div>
        <a href="#" onClick={() => onNavigate('back')} className={styles.backLink}>
          <span className={styles.navIcon}>←</span>
          <span className={styles.backText}>{t.back}</span>
        </a>
      </div>
    </div>
  );
};

export default Sidebar;