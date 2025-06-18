import React, { useState, useEffect } from "react";
import styles from "./Header.module.css";
import logo from "../../assets/images/logo.png";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";

function Header() {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userData = localStorage.getItem("user");

    if (token) {
      setIsAuthenticated(true);
      if (userData) {
        try {
          setUser(JSON.parse(userData));
        } catch (error) {
          console.error("Error parsing user data:", error);
        }
      }
    }
  }, []);

  const handleAuthButton = async (e) => {
    e.preventDefault();

    if (isAuthenticated) {
      navigate("/profile");
    } else {
      navigate("/signup");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setIsAuthenticated(false);
    setUser(null);
    setShowDropdown(false);
    navigate("/");
  };

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  // Закрытие dropdown при клике вне его
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (showDropdown && !event.target.closest(`.${styles.userProfile}`)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showDropdown]);

  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <img src={logo} alt="VetClinic Logo" className={styles.logoImage} />
      </div>

      {/* Десктопная навигация */}
      <nav className={styles.desktopNav}>
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
            <Link to="/blog-page" className={styles.navLink}>
              Blog
            </Link>
          </li>
          <li className={styles.navItem}>
            <Link to="/contacts" className={styles.navLink}>
              Contact
            </Link>
          </li>
        </ul>
      </nav>

      {/* Десктопная секция авторизации */}
      <div className={`${styles.authSection} ${styles.desktopAuth}`}>
        {isAuthenticated ? (
          <div className={styles.userProfile}>
            <button
              className={styles.profileButton}
              onClick={toggleDropdown}
              aria-expanded={showDropdown}>
              <div className={styles.userAvatar}>
                {user?.name ? user.name.charAt(0).toUpperCase() : "U"}
              </div>
              <span className={styles.userName}>{user?.name || "User"}</span>
              <svg
                className={`${styles.dropdownIcon} ${
                  showDropdown ? styles.rotated : ""
                }`}
                width="12"
                height="12"
                viewBox="0 0 12 12">
                <path
                  d="M2 4L6 8L10 4"
                  stroke="currentColor"
                  strokeWidth="2"
                  fill="none"
                />
              </svg>
            </button>

            {showDropdown && (
              <div className={styles.dropdown}>
                <Link
                  to="/profile"
                  className={styles.dropdownItem}
                  onClick={() => setShowDropdown(false)}>
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="currentColor">
                    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                  </svg>
                  My Profile
                </Link>
                <div className={styles.dropdownDivider}></div>
                <button className={styles.dropdownItem} onClick={handleLogout}>
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="currentColor">
                    <path d="M17 7l-1.41 1.41L18.17 11H8v2h10.17l-2.58 2.58L17 17l5-5zM4 5h8V3H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h8v-2H4V5z" />
                  </svg>
                  Logout
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className={styles.authButtons}>
            <Link to="/login" className={styles.loginButton}>
              Login
            </Link>
            <button className={styles.signupButton} onClick={handleAuthButton}>
              Sign Up
            </button>
          </div>
        )}
      </div>

      {/* Бургер кнопка - перенесена в конец для правильного позиционирования */}
      <button 
        className={`${styles.burgerButton} ${isMobileMenuOpen ? styles.burgerOpen : ''}`}
        onClick={toggleMobileMenu}
        aria-label="Toggle menu"
      >
        <div className={styles.burgerLine}></div>
        <div className={styles.burgerLine}></div>
        <div className={styles.burgerLine}></div>
      </button>

      {/* Мобильное меню */}
      <div className={`${styles.mobileMenu} ${isMobileMenuOpen ? styles.mobileMenuOpen : ''}`}>
        <div className={styles.mobileMenuOverlay} onClick={closeMobileMenu}></div>
        <nav className={styles.mobileNav}>
          <ul className={styles.mobileNavList}>
            <li className={styles.mobileNavItem}>
              <Link to="/" className={styles.mobileNavLink} onClick={closeMobileMenu}>
                Home
              </Link>
            </li>
            <li className={styles.mobileNavItem}>
              <Link to="/consultation" className={styles.mobileNavLink} onClick={closeMobileMenu}>
                Consultation
              </Link>
            </li>
            <li className={styles.mobileNavItem}>
              <Link to="/blog-page" className={styles.mobileNavLink} onClick={closeMobileMenu}>
                Blog
              </Link>
            </li>
            <li className={styles.mobileNavItem}>
              <Link to="/contacts" className={styles.mobileNavLink} onClick={closeMobileMenu}>
                Contact
              </Link>
            </li>
          </ul>

          {/* Мобильная секция авторизации */}
          <div className={styles.mobileAuthSection}>
            {isAuthenticated ? (
              <div className={styles.mobileUserProfile}>
                <div className={styles.mobileUserInfo}>
                  <div className={styles.userAvatar}>
                    {user?.name ? user.name.charAt(0).toUpperCase() : "U"}
                  </div>
                  <span className={styles.userName}>{user?.name || "User"}</span>
                </div>
                <div className={styles.mobileUserActions}>
                  <Link
                    to="/profile"
                    className={styles.mobileProfileLink}
                    onClick={closeMobileMenu}
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                    </svg>
                    My Profile
                  </Link>
                  <button className={styles.mobileLogoutButton} onClick={() => {
                    handleLogout();
                    closeMobileMenu();
                  }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M17 7l-1.41 1.41L18.17 11H8v2h10.17l-2.58 2.58L17 17l5-5zM4 5h8V3H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h8v-2H4V5z" />
                    </svg>
                    Logout
                  </button>
                </div>
              </div>
            ) : (
              <div className={styles.mobileAuthButtons}>
                <Link to="/login" className={styles.mobileLoginButton} onClick={closeMobileMenu}>
                  Login
                </Link>
                <button className={styles.mobileSignupButton} onClick={(e) => {
                  handleAuthButton(e);
                  closeMobileMenu();
                }}>
                  Sign Up
                </button>
              </div>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
}

export default Header;