import React from "react";
import "./Profile.css";
import logo from "../../assets/images/logo.png";

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

  return (
    <div className="vet-app">
      <div className="sidebar">
        <div className="logo">
          <img src={logo} alt="Logo" />
        </div>

        <nav className="nav-menu">
          <div className="nav-item active">
            <span className="nav-icon">📋</span>
            <span className="nav-text">History</span>
          </div>
          <div className="nav-item">
            <span className="nav-icon">⚙️</span>
            <span className="nav-text">Settings</span>
          </div>
          <div className="nav-item">
            <span className="nav-icon">🚪</span>
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

      <div className="main-content">
        <div className="header">
          <h1 className="page-title">History</h1>
          <div className="user-avatar">MA</div>
        </div>

        <div className="content-wrapper">
          <div className="bookings-section">
            <h2 className="section-title">CURRENT BOOKINGS (2)</h2>

            <div className="bookings-list">
              {currentBookings.map((booking) => (
                <div key={booking.id} className="booking-card">
                  <div className="booking-header">
                    <span className="booking-id">{booking.id}</span>
                    <span className="booking-date">{booking.date}</span>
                  </div>
                  <div className="booking-details">
                    <div className="booking-pet">• {booking.pet}</div>
                    <div className="booking-issue">• {booking.issue}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="appointments-section">
            <h2 className="section-title">PREVIOUS APPOINTMENTS</h2>

            <div className="appointments-list">
              {previousAppointments.map((appointment) => (
                <div key={appointment.id} className="booking-card">
                  <div className="booking-header">
                    <span className="booking-id">{appointment.id}</span>
                    <span className="booking-date">{appointment.date}</span>
                  </div>
                  <div className="booking-details">
                    <div className="booking-pet">• {appointment.pet}</div>
                    <div className="booking-issue">• {appointment.issue}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
