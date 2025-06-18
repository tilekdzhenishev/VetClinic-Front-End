import React, { useState, useEffect } from 'react';
import './Consultations.css'

function Consultations() {
    const [appointments, setAppointments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);


    const fetchAppointments = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await fetch('https://vetclinic-back-end.onrender.com/api/appointments');
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            setAppointments(data);
        } catch (e) {
            setError("Failed to load appointments: " + e.message);
            console.error("Error loading appointments:", e);
        } finally {
            setLoading(false);
        }
    };


    const updateAppointmentStatus = async (id, newStatus) => {
        try {
            const token = localStorage.getItem("token");
            if (!token) {
                throw new Error("No token available");
            }

            console.log("Updating status for ID:", id, "with status:", newStatus);

            const response = await fetch(`https://vetclinic-back-end.onrender.com/api/appointments/status/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify({ status: newStatus }),
            });

            const responseBody = await response.text(); // 👈 покажет тело ошибки
            if (!response.ok) {
                console.error("Server response:", response.status, responseBody);
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            fetchAppointments();
        } catch (e) {
            setError(`Failed to update appointment status for ${id}: ${e.message}`);
            console.error("Error updating status:", e);
        }
    };


    useEffect(() => {
        fetchAppointments();
    }, []);

    const pendingAppointments = appointments.filter(app => app.status === 'pending');
    const confirmedAppointments = appointments.filter(app => app.status === 'approved');
    const rejectedAppointments = appointments.filter(app => app.status === 'rejected');


    return (
        <div className="admin-appointments-container">


            <h1 className="admin-appointments-header">Appointments for Confirmation</h1>

            {loading && <div className="loading-message">Loading appointments...</div>}
            {error && <div className="error-message">{error}</div>}

            {!loading && !error && (
                <>
                    <div className="appointments-section">
                        <h3 className="section-title">In Progress ({pendingAppointments.length})</h3>
                        {pendingAppointments.length > 0 ? (
                            pendingAppointments.map(app => (
                                <div key={app.id} className="appointment-card">
                                    <span className={`status-badge ${app.status}`}>#{app.id}</span>
                                    <div className="appointment-info">
                                        <div><strong>Name:</strong> {app.first_name} {app.last_name}</div>
                                        <div><strong>Email:</strong> {app.email}</div>
                                        {app.phone && <div><strong>Phone:</strong> {app.phone}</div>}
                                        <div><strong>Address:</strong> {app.address}</div>
                                        <div><strong>Pet:</strong> {app.pet_name} ({app.pet_type})</div>
                                        {app.breed && <div><strong>Breed:</strong> {app.breed}</div>}
                                        {app.pet_age && <div><strong>Pet Age:</strong> {app.pet_age}</div>}
                                        {app.illness_period && <div><strong>Illness Period:</strong> {app.illness_period}</div>}
                                        {app.date && app.time && <div><strong>Date/Time:</strong> {new Date(app.date).toLocaleDateString()} {app.time.substring(0, 5)}</div>}
                                        <div><strong>Created At:</strong> {new Date(app.created_at).toLocaleString()}</div>
                                    </div>
                                    <p className="problem-description"><strong>Problem:</strong> {app.problem}</p>
                                    <div className="card-actions">
                                        <button
                                            className="status-button approve"
                                            onClick={() => updateAppointmentStatus(app.id, 'approved')}
                                        >
                                            Approve
                                        </button>
                                        <button
                                            className="status-button reject"
                                            onClick={() => updateAppointmentStatus(app.id, 'rejected')}
                                        >
                                            Reject
                                        </button>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p>No appointments in progress.</p>
                        )}
                    </div>

                    <div className="appointments-section">
                        <h3 className="section-title">Confirmed Appointments ({confirmedAppointments.length})</h3>
                        {confirmedAppointments.length > 0 ? (
                            confirmedAppointments.map(app => (
                                <div key={app.id} className="appointment-card">
                                    <span className={`status-badge ${app.status}`}>#{app.id}</span>
                                    <div className="appointment-info">
                                        <div><strong>Name:</strong> {app.first_name} {app.last_name}</div>
                                        <div><strong>Email:</strong> {app.email}</div>
                                        {app.phone && <div><strong>Phone:</strong> {app.phone}</div>}
                                        <div><strong>Address:</strong> {app.address}</div>
                                        <div><strong>Pet:</strong> {app.pet_name} ({app.pet_type})</div>
                                        {app.breed && <div><strong>Breed:</strong> {app.breed}</div>}
                                        {app.pet_age && <div><strong>Pet Age:</strong> {app.pet_age}</div>}
                                        {app.illness_period && <div><strong>Illness Period:</strong> {app.illness_period}</div>}
                                        {app.date && app.time && <div><strong>Date/Time:</strong> {new Date(app.date).toLocaleDateString()} {app.time.substring(0, 5)}</div>}
                                        <div><strong>Created At:</strong> {new Date(app.created_at).toLocaleString()}</div>
                                    </div>
                                    <p className="problem-description"><strong>Problem:</strong> {app.problem}</p>
                                </div>
                            ))
                        ) : (
                            <p>No confirmed appointments.</p>
                        )}
                    </div>

                    <div className="appointments-section">
                        <h3 className="section-title">Rejected Appointments ({rejectedAppointments.length})</h3>
                        {rejectedAppointments.length > 0 ? (
                            rejectedAppointments.map(app => (
                                <div key={app.id} className="appointment-card">
                                    <span className={`status-badge ${app.status}`}>#{app.id}</span>
                                    <div className="appointment-info">
                                        <div><strong>Name:</strong> {app.first_name} {app.last_name}</div>
                                        <div><strong>Email:</strong> {app.email}</div>
                                        {app.phone && <div><strong>Phone:</strong> {app.phone}</div>}
                                        <div><strong>Address:</strong> {app.address}</div>
                                        <div><strong>Pet:</strong> {app.pet_name} ({app.pet_type})</div>
                                        {app.breed && <div><strong>Breed:</strong> {app.breed}</div>}
                                        {app.pet_age && <div><strong>Pet Age:</strong> {app.pet_age}</div>}
                                        {app.illness_period && <div><strong>Illness Period:</strong> {app.illness_period}</div>}
                                        {app.date && app.time && <div><strong>Date/Time:</strong> {new Date(app.date).toLocaleDateString()} {app.time.substring(0, 5)}</div>}
                                        <div><strong>Created At:</strong> {new Date(app.created_at).toLocaleString()}</div>
                                    </div>
                                    <p className="problem-description"><strong>Problem:</strong> {app.problem}</p>
                                </div>
                            ))
                        ) : (
                            <p>No rejected appointments.</p>
                        )}
                    </div>
                </>
            )}
        </div>
    );
}

export default Consultations;
