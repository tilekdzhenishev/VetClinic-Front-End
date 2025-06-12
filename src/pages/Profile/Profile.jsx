import React, { useEffect, useState } from "react";
import "./Profile.css";
import logo from "../../assets/images/logo.png";
import { useNavigate } from "react-router";
import { History } from "../../components/Profile/HistoryComponent/History";
import { Settings } from "../../components/Profile/SettingsComponent/Settings";


const Profile = () => {


  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);
  const [activeSection, setActiveSection] = useState("history");
  const navigate = useNavigate();

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
    } else {
      navigate("/");
    }

    setIsCheckingAuth(false);
  }, []);

  const handleLogOut = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  };

  const handleNavClick = (section) => {
    setActiveSection(section);
  };


  const renderActiveComponent = () => {
    switch (activeSection) {
      case "history":
        return <History />;
      case "settings":
        return <Settings />;
      default:
        return <History />;
    }
  };

  return (
    <div className="vet-app">
      <div className="sidebar">
        <div className="logo">
          <img src={logo} alt="Logo" />
        </div>

        <nav className="nav-menu">
          <div
            className={`nav-item ${activeSection === "history" ? "active" : ""}`}
            onClick={() => handleNavClick("history")}
          >
            <span className="nav-text">History</span>
          </div>
          <div
            className={`nav-item ${activeSection === "settings" ? "active" : ""}`}
            onClick={() => handleNavClick("settings")}
          >
            <span className="nav-text">Settings</span>
          </div>
          <div className="nav-item" onClick={handleLogOut}>
            <span className="nav-text">Log Out</span>
          </div>
        </nav>

        <div className="sidebar-bottom">

          <div className="back-button" onClick={() => navigate(-1)}>
            <span className="back-icon">←</span>
            <span className="back-text">Back</span>
          </div>
        </div>
      </div>

      {renderActiveComponent()}
    </div>
  );
};

export default Profile;