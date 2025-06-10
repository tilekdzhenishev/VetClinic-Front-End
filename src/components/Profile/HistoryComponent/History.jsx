import React, { useEffect, useState } from 'react';
import './Hostory.css';

export const History = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserAppointments = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem("token");
        if (!token) {
          setError("No token found");
          setLoading(false);
          return;
        }

        const userRes = await fetch("https://vetclinic-back-end.onrender.com/api/users/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!userRes.ok) {
          throw new Error("Failed to fetch user profile");
        }

        const user = await userRes.json();
        console.log("User data:", user);

        const appointmentsRes = await fetch(
          `https://vetclinic-back-end.onrender.com/api/appointments/user/${user.id}`
        );

        if (!appointmentsRes.ok) {
          throw new Error("Failed to fetch appointments");
        }

        const data = await appointmentsRes.json();
        setAppointments(data);
      } catch (err) {
        console.error("Error fetching appointments:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUserAppointments();
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getStatusBadge = (status) => {
    const statusClasses = {
      'pending': 'status-pending',
      'confirmed': 'status-confirmed',
      'completed': 'status-completed',
      'cancelled': 'status-cancelled'
    };

    return (
      <span className={`status-badge ${statusClasses[status?.toLowerCase()] || 'status-pending'}`}>
        {status || 'Pending'}
      </span>
    );
  };

  if (loading) {
    return (
      <div className="main-content">
        <div className="header">
          <h1 className="page-title">Appointment History</h1>
        </div>
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading appointments...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="main-content">
        <div className="header">
          <h1 className="page-title">Appointment History</h1>
        </div>
        <div className="error-container">
          <div className="error-icon">⚠️</div>
          <h3>Error Loading Appointments</h3>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="main-content">
      <div className="header">
        <h1 className="page-title">Appointment History</h1>
      </div>

      <div className="content-wrapper">
        <div className="appointments-section">
          <div className="section-header">
            <h2 className="section-title">Your Appointments</h2>
            <span className="appointment-count">{appointments.length} total</span>
          </div>

          {appointments.length === 0 ? (
            <div className="empty-state">
              <div className="empty-icon">📅</div>
              <h3>No Appointments Found</h3>
              <p>You haven't made any appointments yet.</p>
            </div>
          ) : (
            <div className="appointments-grid">
              {appointments.map((appointment) => (
                <div key={appointment.id} className="appointment-card">
                  <div className="appointment-header">
                    <div className="appointment-id">#{appointment.id}</div>
                    {getStatusBadge(appointment.status)}
                  </div>

                  <div className="appointment-date">
                    <div className="date-main">{formatDate(appointment.date)}</div>
                    <div className="time-main">{appointment.time}</div>
                  </div>

                  <div className="appointment-details">
                    <div className="detail-row">
                      <span className="detail-label">Client:</span>
                      <span className="detail-value">{appointment.first_name} {appointment.last_name}</span>
                    </div>

                    <div className="detail-row">
                      <span className="detail-label">Contact:</span>
                      <span className="detail-value">{appointment.email}</span>
                    </div>

                    <div className="detail-row">
                      <span className="detail-label">Phone:</span>
                      <span className="detail-value">{appointment.phone}</span>
                    </div>
                  </div>

                  <div className="pet-info">
                    <div className="pet-header">
                      <span className="pet-icon">🐾</span>
                      <span className="pet-name">{appointment.pet_name}</span>
                    </div>
                    <div className="pet-details">
                      {appointment.pet_type} • {appointment.breed} • {appointment.pet_age} years old
                    </div>
                  </div>

                  <div className="medical-info">
                    <div className="medical-row">
                      <span className="medical-label">Issue:</span>
                      <span className="medical-value">{appointment.problem}</span>
                    </div>
                    <div className="medical-row">
                      <span className="medical-label">Duration:</span>
                      <span className="medical-value">{appointment.illness_period}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};