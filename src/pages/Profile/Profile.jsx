import React, { useEffect, useState } from "react";
import "./Profile.css";
import logo from "../../assets/images/logo.png";
import { useNavigate } from "react-router";
import { History } from "../../components/Profile/HistoryComponent/History"; 
import { Settings } from "../../components/Profile/SettingsComponent/Settings";


const Profile = () => {
  const currentBookings = [
    {
      id: "#2F543",
      date: "24/07/2025",
      pet: "Golden Retriever",
      issue: "Swollen in leg for 3 days",
    },
    {
      id: "#63A023",
      date: "13/09/2025",
      pet: "Maine Coon",
      issue: "Overgrown teeth causing difficulty eating",
    },
  ];

  const previousAppointments = [
    {
      id: "#33567S",
      date: "20/08/2023",
      pet: "Siamese",
      issue: "Vomiting after eating for two days",
    },
    {
      id: "#95F283",
      date: "13/06/2021",
      pet: "French Bulldog",
      issue: "Loss of appetite and lethargy",
    },
    {
      id: "#7A7560",
      date: "26/02/2021",
      pet: "Maine Coon",
      issue: "Difficulty breathing for a week",
    },
  ];

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
        return <History currentBookings={currentBookings} previousAppointments={previousAppointments} />;
      case "settings":
        return <Settings />;
      default:
        return <History currentBookings={currentBookings} previousAppointments={previousAppointments} />;
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
          <div className="theme-toggle">
            <span className="theme-text">Theme</span>
            <div className="toggle-switch">
              <div className="toggle-slider active"></div>
            </div>
          </div>

          <div className="back-button">
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