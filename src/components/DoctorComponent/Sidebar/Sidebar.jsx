import React from 'react';
import styles from './Sidebar.module.css';
import logo from '../../../assets/images/logo.png';

import dashboardIcon from '../../../assets/images/dashboard_icon.png';
import reportsIcon from '../../../assets/images/workstaff_icon.png';
import settingsIcon from '../../../assets/images/settings_icon.png';
import logoutIcon from '../../../assets/images/logout_icon.png'

const translations = {
    English: {
        dashboard: 'Dashboard',
        reports: 'Reports',
        settings: 'Settings',
        logout: 'Log Out',
        theme: 'Theme',
        back: 'Back',
    },
    Russian: {
        dashboard: 'Панель',
        reports: 'Отчеты',
        settings: 'Настройки',
        logout: 'Выйти',
        theme: 'Тема',
        back: 'Назад',
    },
    Ukrainian: {
        dashboard: 'Панель',
        reports: 'Звіти',
        settings: 'Налаштування',
        logout: 'Вийти',
        theme: 'Тема',
        back: 'Назад',
    },
};

const DoctorsSidebar = ({ currentPage, onNavigate, isDarkMode, setIsDarkMode, appLanguage }) => {
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
                            onClick={() => onNavigate('reports')}
                            className={`${styles.navLink} ${currentPage === 'reports' ? styles.navLinkActive : ''}`}
                        >
                            <img src={reportsIcon} alt="Reports Icon" className={styles.navIcon} />
                            <span className={styles.navText}>{t.reports}</span>
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
                    <span className={styles.navText}>{t.back}</span>
                </a>
            </div>
        </div>
    );
};

export default DoctorsSidebar;