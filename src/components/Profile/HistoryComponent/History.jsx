import React from 'react';
import './Hostory.css'

export const History = ({ currentBookings, previousAppointments }) => {
  return (
    <div className="main-content">
      <div className="header">
        <h1 className="page-title">History</h1>
      </div>

      <div className="content-wrapper">
        <div className="bookings-section">
          <h2 className="section-title">CURRENT BOOKINGS ({currentBookings?.length || 0})</h2>

          <div className="bookings-list">
            {currentBookings?.map((booking) => (
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
            {previousAppointments?.map((appointment) => (
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
  );
};