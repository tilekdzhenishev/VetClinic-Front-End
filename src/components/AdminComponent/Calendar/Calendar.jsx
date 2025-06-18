import React, { useState, useEffect } from 'react';

const Calendar = () => {
  const [currentWeekStart, setCurrentWeekStart] = useState(() => {
    const today = new Date();
    const dayOfWeek = today.getDay();
    const startOfWeek = new Date(today);
    startOfWeek.setDate(today.getDate() - dayOfWeek);
    startOfWeek.setHours(0, 0, 0, 0);
    return startOfWeek;
  });

  const [appointments, setAppointments] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null); // For custom message box

  const [newEvent, setNewEvent] = useState({
    date: '',
    time: '',
    pet: '',
    color: 'blue'
  });

  const [editingEvent, setEditingEvent] = useState(null);
  const [eventToDelete, setEventToDelete] = useState(null);


  const timeSlots = [
    '07:00', '08:00', '09:00', '10:00', '11:00', '12:00',
    '13:00', '14:00', '15:00', '16:00', '17:00', '18:00'
  ];

  const daysOfWeek = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];

  // Custom message box function
  const showMessage = (msg, type = 'info') => {
    setMessage({ text: msg, type });
    setTimeout(() => setMessage(null), 3000); // Hide after 3 seconds
  };

  // Helper to format date to YYYY-MM-DD
  const formatDateToYYYYMMDD = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };


  const formatTimeToHH00 = (timeString) => {
    const [hours, minutes] = timeString.split(':');
    return `${hours.padStart(2, '0')}:00`;
  };


  const fetchApprovedAppointments = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('https://vetclinic-back-end.onrender.com/api/appointments/approved');

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const approvedAppointments = await response.json();

  
      const transformedAppointments = approvedAppointments
        .filter(appointment => appointment.date && appointment.time) 
        .map(appointment => ({
          id: appointment.id,
          date: formatDateToYYYYMMDD(appointment.date), 
          time: formatTimeToHH00(appointment.time),     
          pet: `${appointment.pet_name} (${appointment.first_name} ${appointment.last_name})`,
          petType: appointment.pet_type,
          breed: appointment.breed,
          problem: appointment.problem,
          ownerInfo: {
            firstName: appointment.first_name,
            lastName: appointment.last_name,
            email: appointment.email,
            phone: appointment.phone,
            address: appointment.address
          },
          fullDate: formatDateToYYYYMMDD(appointment.date), 
          color: 'green', 
          isFromAPI: true 
        }));


      setAppointments(prev => {
        const manualAppointments = prev.filter(app => !app.isFromAPI);
        const newApiAppointments = transformedAppointments.filter(newApp =>
          !manualAppointments.some(manualApp => manualApp.id === newApp.id)
        );
        return [...manualAppointments, ...newApiAppointments];
      });

    } catch (err) {
      console.error('Error fetching approved appointments:', err);
      setError('Failed to load approved appointments. Please try again.');
      showMessage('Failed to load approved appointments.', 'error');
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchApprovedAppointments();
  }, []);

  const getCurrentWeekDays = () => {
    return Array.from({ length: 7 }, (_, i) => {
      const date = new Date(currentWeekStart);
      date.setDate(currentWeekStart.getDate() + i);

      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      const formattedDate = `${year}-${month}-${day}`;

      const today = new Date();
      const isToday = date.toDateString() === today.toDateString();

      return {
        dayName: daysOfWeek[date.getDay()],
        dayNumber: date.getDate(),
        fullDate: formattedDate,
        isToday
      };
    });
  };

  const weekDays = getCurrentWeekDays();

  const getWeekRange = () => {
    const start = new Date(currentWeekStart);
    const end = new Date(currentWeekStart);
    end.setDate(start.getDate() + 6);

    const startMonth = start.toLocaleString('en-US', { month: 'short' });
    const endMonth = end.toLocaleString('en-US', { month: 'short' });

    if (start.getMonth() === end.getMonth()) {
      return `${start.getDate()} - ${end.getDate()} ${startMonth} ${start.getFullYear()}`;
    } else {
      return `${start.getDate()} ${startMonth} - ${end.getDate()} ${endMonth} ${start.getFullYear()}`;
    }
  };

  const goToPreviousWeek = () => {
    setCurrentWeekStart(prev => {
      const newDate = new Date(prev);
      newDate.setDate(prev.getDate() - 7);
      return newDate;
    });
  };

  const goToNextWeek = () => {
    setCurrentWeekStart(prev => {
      const newDate = new Date(prev);
      newDate.setDate(prev.getDate() + 7);
      return newDate;
    });
  };

  const handleAddEvent = () => {
    setNewEvent({ date: '', time: '', pet: '', color: 'blue' });
    setShowAddModal(true);
  };

  const handleSaveNewEvent = () => {
    if (!newEvent.date || !newEvent.time || !newEvent.pet) {
      showMessage('Please fill in all fields to add a new event.', 'error');
      return;
    }

    const newAppointment = {
      id: Date.now(), // Use a unique ID for manually added events
      ...newEvent,
      fullDate: newEvent.date,
      isFromAPI: false
    };

    setAppointments(prev => [...prev, newAppointment]);
    setNewEvent({ date: '', time: '', pet: '', color: 'blue' });
    setShowAddModal(false);
    showMessage('Event added successfully!', 'success');
  };

  const handleEditEvent = (event) => {
    setEditingEvent({ ...event });
    setShowEditModal(true);
  };

  const handleUpdateEvent = () => {
    if (!editingEvent.date || !editingEvent.time || !editingEvent.pet) {
      showMessage('Please fill in all fields to update the event.', 'error');
      return;
    }

    setAppointments(prev =>
      prev.map(app => app.id === editingEvent.id ? editingEvent : app)
    );
    setEditingEvent(null);
    setShowEditModal(false);
    showMessage('Event updated successfully!', 'success');
  };

  const handleDeleteEvent = (event) => {
    setEventToDelete(event);
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    setAppointments(prev => prev.filter(app => app.id !== eventToDelete.id));
    setEventToDelete(null);
    setShowDeleteModal(false);
    setShowEditModal(false); // Close edit modal if open
    showMessage('Event deleted successfully!', 'success');
  };

  const cancelDelete = () => {
    setEventToDelete(null);
    setShowDeleteModal(false);
  };

  const getAppointmentsForSlot = (date, time) => {
    return appointments.filter(app =>
      app.fullDate === date && app.time === time
    );
  };

  const Modal = ({ isOpen, onClose, title, children }) => {
    if (!isOpen) return null;

    return (
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1000
      }}>
        <div style={{
          backgroundColor: 'white',
          borderRadius: '8px',
          width: '90%',
          maxWidth: '500px',
          maxHeight: '80vh',
          overflow: 'auto',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
        }}>
          <div style={{
            padding: '20px',
            borderBottom: '1px solid #e5e7eb',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            <h2 style={{ margin: 0, fontSize: '1.25rem', fontWeight: 'bold' }}>{title}</h2>
            <button
              onClick={onClose}
              style={{
                background: 'none',
                border: 'none',
                fontSize: '1.5rem',
                cursor: 'pointer',
                padding: '0',
                width: '30px',
                height: '30px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#6b7280'
              }}
            >
              &times;
            </button>
          </div>
          <div style={{ padding: '20px' }}>
            {children}
          </div>
        </div>
      </div>
    );
  };

  const Messagebox = ({ message }) => {
    if (!message) return null;

    const bgColor = message.type === 'error' ? '#fee2e2' : '#dcfce7';
    const borderColor = message.type === 'error' ? '#fca5a5' : '#86efad';
    const textColor = message.type === 'error' ? '#dc2626' : '#16a34a';

    return (
      <div style={{
        position: 'fixed',
        top: '20px',
        left: '50%',
        transform: 'translateX(-50%)',
        backgroundColor: bgColor,
        border: `1px solid ${borderColor}`,
        color: textColor,
        padding: '12px 20px',
        borderRadius: '8px',
        zIndex: 1001,
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        fontSize: '0.9rem',
        fontWeight: 'bold',
        animation: 'fadeInOut 3s forwards'
      }}>
        {message.text}
        <style>{`
          @keyframes fadeInOut {
            0% { opacity: 0; transform: translateX(-50%) translateY(-20px); }
            10% { opacity: 1; transform: translateX(-50%) translateY(0); }
            90% { opacity: 1; transform: translateX(-50%) translateY(0); }
            100% { opacity: 0; transform: translateX(-50%) translateY(-20px); }
          }
        `}</style>
      </div>
    );
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Inter, sans-serif', minWidth: '320px' }}>
      <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap" rel="stylesheet" />


      <Messagebox message={message} />

 
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '15px',
        marginBottom: '20px',
        padding: '10px',
        borderBottom: '1px solid #e5e7eb',
        '@media (min-width: 640px)': {
          flexDirection: 'row',
          justifyContent: 'space-between',
        }
      }}>
        <h1 style={{ margin: 0, fontSize: '2rem', fontWeight: 'bold', textAlign: 'center' }}>Calendar</h1>
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', justifyContent: 'center' }}>
          <button
            onClick={fetchApprovedAppointments}
            disabled={loading}
            style={{
              padding: '10px 18px',
              backgroundColor: '#10b981',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              cursor: loading ? 'not-allowed' : 'pointer',
              opacity: loading ? 0.6 : 1,
              fontWeight: '600',
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
              transition: 'background-color 0.3s ease'
            }}
          >
            {loading ? 'Loading...' : 'Refresh Approved'}
          </button>
          <button
            onClick={handleAddEvent}
            style={{
              padding: '10px 18px',
              backgroundColor: '#3b82f6',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              fontWeight: '600',
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
              transition: 'background-color 0.3s ease'
            }}
          >
            Add Event
          </button>
        </div>
      </div>


      {error && (
        <div style={{
          backgroundColor: '#fee2e2',
          border: '1px solid #fca5a5',
          color: '#dc2626',
          padding: '12px',
          borderRadius: '4px',
          marginBottom: '20px'
        }}>
          {error}
        </div>
      )}

  
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '15px',
        marginBottom: '20px',
        flexWrap: 'wrap'
      }}>
        <button
          onClick={goToPreviousWeek}
          style={{
            padding: '8px 12px',
            border: '1px solid #d1d5db',
            borderRadius: '4px',
            backgroundColor: 'white',
            cursor: 'pointer',
            boxShadow: '0 1px 2px rgba(0,0,0,0.05)',
            transition: 'background-color 0.3s ease'
          }}
        >‹</button>
        <span style={{ fontSize: '1.1rem', fontWeight: 'bold', textAlign: 'center' }}>
          WEEK {getWeekRange()}
        </span>
        <button
          onClick={goToNextWeek}
          style={{
            padding: '8px 12px',
            border: '1px solid #d1d5db',
            borderRadius: '4px',
            backgroundColor: 'white',
            cursor: 'pointer',
            boxShadow: '0 1px 2px rgba(0,0,0,0.05)',
            transition: 'background-color 0.3s ease'
          }}
        >›</button>
      </div>

      {/* Calendar Grid */}
      <div style={{ border: '1px solid #e5e7eb', borderRadius: '8px', overflowX: 'auto', boxShadow: '0 4px 6px rgba(0,0,0,0.05)' }}>
        <div style={{ minWidth: '700px' }}> {/* Minimum width to prevent crushing */}
          {/* Day Headers */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: '80px repeat(7, 1fr)', /* Adjusted time column width */
            backgroundColor: '#f9fafb',
            borderBottom: '1px solid #e5e7eb'
          }}>
            <div style={{ padding: '12px' }}></div>
            {weekDays.map((day, index) => (
              <div
                key={index}
                style={{
                  padding: '12px',
                  textAlign: 'center',
                  backgroundColor: day.isToday ? '#eff6ff' : 'transparent', /* Lighter blue for today */
                  fontWeight: day.isToday ? 'bold' : 'normal',
                  borderRight: index < weekDays.length - 1 ? '1px solid #e5e7eb' : 'none'
                }}
              >
                <div style={{ fontSize: '0.875rem', color: '#6b7280' }}>{day.dayName}</div>
                <div style={{ fontSize: '1.25rem', marginTop: '4px', color: day.isToday ? '#3b82f6' : '#1f2937' }}>{day.dayNumber}</div>
              </div>
            ))}
          </div>

          {/* Time Slots */}
          {timeSlots.map((time, timeIndex) => (
            <div
              key={time}
              style={{
                display: 'grid',
                gridTemplateColumns: '80px repeat(7, 1fr)', /* Adjusted time column width */
                borderBottom: timeIndex < timeSlots.length - 1 ? '1px solid #e5e7eb' : 'none'
              }}
            >
              <div style={{
                padding: '12px',
                fontSize: '0.875rem',
                color: '#6b7280',
                backgroundColor: '#f9fafb',
                borderRight: '1px solid #e5e7eb',
                display: 'flex',
                alignItems: 'flex-start'
              }}>
                {time}
              </div>
              {weekDays.map((day, dayIndex) => {
                const slotAppointments = getAppointmentsForSlot(day.fullDate, time);

                return (
                  <div
                    key={`${time}-${dayIndex}`}
                    style={{
                      padding: '4px',
                      minHeight: '60px',
                      borderRight: dayIndex < weekDays.length - 1 ? '1px solid #e5e7eb' : 'none',
                      backgroundColor: day.fullDate === formatDateToYYYYMMDD(new Date()) ? '#f0f9ff' : 'transparent', // Highlight today's cells
                    }}
                  >
                    {slotAppointments.map((appointment, appIndex) => (
                      <div
                        key={appIndex}
                        onClick={() => handleEditEvent(appointment)}
                        style={{
                          backgroundColor: appointment.color === 'blue' ? '#e0efff' :
                            appointment.color === 'green' ? '#e6faee' :
                              appointment.color === 'purple' ? '#f0e6ff' :
                                appointment.color === 'orange' ? '#fff0e5' : '#e0efff',
                          border: `1px solid ${appointment.color === 'blue' ? '#60a5fa' :
                              appointment.color === 'green' ? '#34d399' :
                                appointment.color === 'purple' ? '#a78bfa' :
                                  appointment.color === 'orange' ? '#fb923c' : '#60a5fa'
                            }`,
                          borderRadius: '6px', /* Slightly more rounded */
                          padding: '6px',
                          marginBottom: '4px',
                          cursor: 'pointer',
                          fontSize: '0.75rem',
                          boxShadow: '0 1px 2px rgba(0,0,0,0.05)',
                          transition: 'transform 0.1s ease',
                          ':hover': {
                            transform: 'scale(1.02)'
                          }
                        }}
                      >
                        <div style={{ fontWeight: 'bold', color: '#1f2937' }}>{appointment.time}</div>
                        <div style={{ marginTop: '2px', color: '#374151' }}>{appointment.pet}</div>
                        {appointment.isFromAPI && appointment.problem && (
                          <div style={{
                            fontSize: '0.625rem',
                            color: '#6b7280',
                            marginTop: '2px',
                            whiteSpace: 'nowrap',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis'
                          }}>
                            {appointment.problem}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>

      {/* Add Event Modal */}
      <Modal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        title="Add New Event"
      >
        <div style={{ marginBottom: '16px' }}>
          <label style={{ display: 'block', marginBottom: '4px', fontWeight: 'bold', color: '#374151' }}>Date</label>
          <input
            type="date"
            value={newEvent.date}
            onChange={(e) => setNewEvent(prev => ({ ...prev, date: e.target.value }))}
            style={{
              width: '100%',
              padding: '10px',
              border: '1px solid #d1d5db',
              borderRadius: '6px',
              fontSize: '1rem'
            }}
          />
        </div>

        <div style={{ marginBottom: '16px' }}>
          <label style={{ display: 'block', marginBottom: '4px', fontWeight: 'bold', color: '#374151' }}>Time</label>
          <select
            value={newEvent.time}
            onChange={(e) => setNewEvent(prev => ({ ...prev, time: e.target.value }))}
            style={{
              width: '100%',
              padding: '10px',
              border: '1px solid #d1d5db',
              borderRadius: '6px',
              fontSize: '1rem',
              backgroundColor: 'white'
            }}
          >
            <option value="">Select Time</option>
            {timeSlots.map(slot => (
              <option key={slot} value={slot}>{slot}</option>
            ))}
          </select>
        </div>

        <div style={{ marginBottom: '16px' }}>
          <label style={{ display: 'block', marginBottom: '4px', fontWeight: 'bold', color: '#374151' }}>Pet Name</label>
          <input
            type="text"
            value={newEvent.pet}
            onChange={(e) => setNewEvent(prev => ({ ...prev, pet: e.target.value }))}
            placeholder="e.g., Buddy (Golden Retriever)"
            style={{
              width: '100%',
              padding: '10px',
              border: '1px solid #d1d5db',
              borderRadius: '6px',
              fontSize: '1rem'
            }}
          />
        </div>

        <div style={{ marginBottom: '16px' }}>
          <label style={{ display: 'block', marginBottom: '4px', fontWeight: 'bold', color: '#374151' }}>Color</label>
          <select
            value={newEvent.color}
            onChange={(e) => setNewEvent(prev => ({ ...prev, color: e.target.value }))}
            style={{
              width: '100%',
              padding: '10px',
              border: '1px solid #d1d5db',
              borderRadius: '6px',
              fontSize: '1rem',
              backgroundColor: 'white'
            }}
          >
            <option value="blue">Blue</option>
            <option value="green">Green</option>
            <option value="purple">Purple</option>
            <option value="orange">Orange</option>
          </select>
        </div>

        <button
          onClick={handleSaveNewEvent}
          style={{
            width: '100%',
            padding: '12px',
            backgroundColor: '#3b82f6',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            fontSize: '1rem',
            fontWeight: '600',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
            transition: 'background-color 0.3s ease'
          }}
        >
          Save Event
        </button>
      </Modal>


      <Modal
        isOpen={showEditModal}
        onClose={() => setShowEditModal(false)}
        title="Edit Event"
      >
        {editingEvent && (
          <>
            {editingEvent.isFromAPI && (
              <div style={{
                backgroundColor: '#eff6ff',
                border: '1px solid #93c5fd',
                padding: '16px',
                borderRadius: '8px',
                marginBottom: '16px',
                boxShadow: '0 1px 3px rgba(0,0,0,0.05)'
              }}>
                <h3 style={{ margin: '0 0 10px 0', fontSize: '1.1rem', fontWeight: 'bold', color: '#1f2937' }}>Appointment Details</h3>
                <p style={{ margin: '6px 0', fontSize: '0.875rem', color: '#374151' }}>
                  <strong>Owner:</strong> {editingEvent.ownerInfo?.firstName} {editingEvent.ownerInfo?.lastName}
                </p>
                <p style={{ margin: '6px 0', fontSize: '0.875rem', color: '#374151' }}>
                  <strong>Email:</strong> {editingEvent.ownerInfo?.email}
                </p>
                <p style={{ margin: '6px 0', fontSize: '0.875rem', color: '#374151' }}>
                  <strong>Phone:</strong> {editingEvent.ownerInfo?.phone}
                </p>
                <p style={{ margin: '6px 0', fontSize: '0.875rem', color: '#374151' }}>
                  <strong>Address:</strong> {editingEvent.ownerInfo?.address}
                </p>
                <p style={{ margin: '6px 0', fontSize: '0.875rem', color: '#374151' }}>
                  <strong>Pet Type:</strong> {editingEvent.petType} ({editingEvent.breed})
                </p>
                <p style={{ margin: '6px 0', fontSize: '0.875rem', color: '#374151' }}>
                  <strong>Problem:</strong> {editingEvent.problem}
                </p>
              </div>
            )}

            <div style={{ marginBottom: '16px' }}>
              <label style={{ display: 'block', marginBottom: '4px', fontWeight: 'bold', color: '#374151' }}>Date</label>
              <input
                type="date"
                value={editingEvent.date}
                onChange={(e) => setEditingEvent(prev => ({ ...prev, date: e.target.value }))}
                style={{
                  width: '100%',
                  padding: '10px',
                  border: '1px solid #d1d5db',
                  borderRadius: '6px',
                  fontSize: '1rem'
                }}
              />
            </div>

            <div style={{ marginBottom: '16px' }}>
              <label style={{ display: 'block', marginBottom: '4px', fontWeight: 'bold', color: '#374151' }}>Time</label>
              <select
                value={editingEvent.time}
                onChange={(e) => setEditingEvent(prev => ({ ...prev, time: e.target.value }))}
                style={{
                  width: '100%',
                  padding: '10px',
                  border: '1px solid #d1d5db',
                  borderRadius: '6px',
                  fontSize: '1rem',
                  backgroundColor: 'white'
                }}
              >
                <option value="">Select Time</option>
                {timeSlots.map(slot => (
                  <option key={slot} value={slot}>{slot}</option>
                ))}
              </select>
            </div>

            <div style={{ marginBottom: '16px' }}>
              <label style={{ display: 'block', marginBottom: '4px', fontWeight: 'bold', color: '#374151' }}>Pet Name</label>
              <input
                type="text"
                value={editingEvent.pet}
                onChange={(e) => setEditingEvent(prev => ({ ...prev, pet: e.target.value }))}
                style={{
                  width: '100%',
                  padding: '10px',
                  border: '1px solid #d1d5db',
                  borderRadius: '6px',
                  fontSize: '1rem'
                }}
              />
            </div>

            <div style={{ marginBottom: '16px' }}>
              <label style={{ display: 'block', marginBottom: '4px', fontWeight: 'bold', color: '#374151' }}>Color</label>
              <select
                value={editingEvent.color}
                onChange={(e) => setEditingEvent(prev => ({ ...prev, color: e.target.value }))}
                style={{
                  width: '100%',
                  padding: '10px',
                  border: '1px solid #d1d5db',
                  borderRadius: '6px',
                  fontSize: '1rem',
                  backgroundColor: 'white'
                }}
              >
                <option value="blue">Blue</option>
                <option value="green">Green</option>
                <option value="purple">Purple</option>
                <option value="orange">Orange</option>
              </select>
            </div>

            <div style={{ display: 'flex', gap: '10px', flexDirection: 'column', '@media (min-width: 640px)': { flexDirection: 'row' } }}>
              <button
                onClick={handleUpdateEvent}
                style={{
                  flex: 1,
                  padding: '12px',
                  backgroundColor: '#3b82f6',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  fontWeight: '600',
                  boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                  transition: 'background-color 0.3s ease'
                }}
              >
                Save Changes
              </button>
              <button
                onClick={() => handleDeleteEvent(editingEvent)}
                style={{
                  flex: 1,
                  padding: '12px',
                  backgroundColor: '#dc2626',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  fontWeight: '600',
                  boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                  transition: 'background-color 0.3s ease'
                }}
              >
                Delete
              </button>
            </div>
          </>
        )}
      </Modal>

     
      <Modal
        isOpen={showDeleteModal}
        onClose={cancelDelete}
        title="Confirm Deletion"
      >
        {eventToDelete && (
          <>
            <p style={{ marginBottom: '20px', color: '#374151' }}>
              Are you sure you want to delete the appointment for{' '}
              <strong>{eventToDelete.pet}</strong> at{' '}
              <strong>{eventToDelete.time}</strong> on{' '}
              <strong>{eventToDelete.date}</strong>?
            </p>

            <div style={{ display: 'flex', gap: '10px', flexDirection: 'column', '@media (min-width: 640px)': { flexDirection: 'row' } }}>
              <button
                onClick={confirmDelete}
                style={{
                  flex: 1,
                  padding: '12px',
                  backgroundColor: '#dc2626',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  fontWeight: '600',
                  boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                  transition: 'background-color 0.3s ease'
                }}
              >
                Confirm Delete
              </button>
              <button
                onClick={cancelDelete}
                style={{
                  flex: 1,
                  padding: '12px',
                  backgroundColor: '#6b7280',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  fontWeight: '600',
                  boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                  transition: 'background-color 0.3s ease'
                }}
              >
                Cancel
              </button>
            </div>
          </>
        )}
      </Modal>
    </div>
  );
};

export default Calendar;
