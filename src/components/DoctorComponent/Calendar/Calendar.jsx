import React, { useState, useEffect } from 'react';
import './Calendar.css';

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

  const [newEvent, setNewEvent] = useState({
    date: '',
    time: '',
    pet: '',
    color: 'blue'
  });

  const [editingEvent, setEditingEvent] = useState(null);
  const [eventToDelete, setEventToDelete] = useState(null);

  // Time slots from 7 AM to 6 PM
  const timeSlots = [
    '7:00', '8:00', '9:00', '10:00', '11:00', '12:00',
    '13:00', '14:00', '15:00', '16:00', '17:00', '18:00'
  ];

  const daysOfWeek = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];

  // Generate current week days
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
      alert('Please fill in all fields');
      return;
    }

    const newAppointment = {
      id: Date.now(),
      ...newEvent,
      fullDate: newEvent.date
    };

    setAppointments(prev => [...prev, newAppointment]);
    setNewEvent({ date: '', time: '', pet: '', color: 'blue' });
    setShowAddModal(false);
  };

  const handleEditEvent = (event) => {
    setEditingEvent({ ...event });
    setShowEditModal(true);
  };

  const handleUpdateEvent = () => {
    if (!editingEvent.date || !editingEvent.time || !editingEvent.pet) {
      alert('Please fill in all fields');
      return;
    }

    setAppointments(prev =>
      prev.map(app => app.id === editingEvent.id ? editingEvent : app)
    );
    setEditingEvent(null);
    setShowEditModal(false);
  };

  const handleDeleteEvent = (event) => {
    setEventToDelete(event);
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    setAppointments(prev => prev.filter(app => app.id !== eventToDelete.id));
    setEventToDelete(null);
    setShowDeleteModal(false);
    setShowEditModal(false);
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
      <div className="modal-overlay">
        <div className="modal-content">
          <div className="modal-header">
            <h2 className="modal-title">{title}</h2>
            <button className="modal-close" onClick={onClose}>×</button>
          </div>
          <div className="modal-body">
            {children}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="calendar-container">

      <div className="calendar-header">
        <h1 className="calendar-title">Calendar</h1>
        <button className="add-event-btn" onClick={handleAddEvent}>
          Add Event
        </button>
      </div>


      <div className="week-navigation">
        <button className="nav-btn" onClick={goToPreviousWeek}>‹</button>
        <span className="week-range">WEEK {getWeekRange()}</span>
        <button className="nav-btn" onClick={goToNextWeek}>›</button>
      </div>


      <div className="calendar-grid">

        <div className="day-headers">
          <div className="time-header"></div>
          {weekDays.map((day, index) => (
            <div key={index} className={`day-header ${day.isToday ? 'today' : ''}`}>
              <div className="day-name">{day.dayName}</div>
              <div className="day-number">{day.dayNumber}</div>
            </div>
          ))}
        </div>


        <div className="time-slots">
          {timeSlots.map((time, timeIndex) => (
            <div key={time} className="time-row">
              <div className="time-label">{time}</div>
              {weekDays.map((day, dayIndex) => {
                const slotAppointments = getAppointmentsForSlot(day.fullDate, time);

                return (
                  <div key={`${time}-${dayIndex}`} className="time-slot">
                    {slotAppointments.map((appointment, appIndex) => (
                      <div
                        key={appIndex}
                        className={`appointment appointment-${appointment.color}`}
                        onClick={() => handleEditEvent(appointment)}
                      >
                        <div className="appointment-time">{appointment.time}</div>
                        <div className="appointment-pet">{appointment.pet}</div>
                      </div>
                    ))}
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>


      <Modal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        title="Add New Event"
      >
        <div className="form-group">
          <label className="form-label">Date</label>
          <input
            type="date"
            className="form-input"
            value={newEvent.date}
            onChange={(e) => setNewEvent(prev => ({ ...prev, date: e.target.value }))}
          />
        </div>

        <div className="form-group">
          <label className="form-label">Time</label>
          <select
            className="form-select"
            value={newEvent.time}
            onChange={(e) => setNewEvent(prev => ({ ...prev, time: e.target.value }))}
          >
            <option value="">Select Time</option>
            {timeSlots.map(slot => (
              <option key={slot} value={slot}>{slot}</option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label className="form-label">Pet Name</label>
          <input
            type="text"
            className="form-input"
            value={newEvent.pet}
            onChange={(e) => setNewEvent(prev => ({ ...prev, pet: e.target.value }))}
            placeholder="e.g., Buddy (Golden Retriever)"
          />
        </div>

        <div className="form-group">
          <label className="form-label">Color</label>
          <select
            className="form-select"
            value={newEvent.color}
            onChange={(e) => setNewEvent(prev => ({ ...prev, color: e.target.value }))}
          >
            <option value="blue">Blue</option>
            <option value="green">Green</option>
            <option value="purple">Purple</option>
            <option value="orange">Orange</option>
          </select>
        </div>

        <button className="btn-primary" onClick={handleSaveNewEvent}>
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
            <div className="form-group">
              <label className="form-label">Date</label>
              <input
                type="date"
                className="form-input"
                value={editingEvent.date}
                onChange={(e) => setEditingEvent(prev => ({ ...prev, date: e.target.value }))}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Time</label>
              <select
                className="form-select"
                value={editingEvent.time}
                onChange={(e) => setEditingEvent(prev => ({ ...prev, time: e.target.value }))}
              >
                <option value="">Select Time</option>
                {timeSlots.map(slot => (
                  <option key={slot} value={slot}>{slot}</option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Pet Name</label>
              <input
                type="text"
                className="form-input"
                value={editingEvent.pet}
                onChange={(e) => setEditingEvent(prev => ({ ...prev, pet: e.target.value }))}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Color</label>
              <select
                className="form-select"
                value={editingEvent.color}
                onChange={(e) => setEditingEvent(prev => ({ ...prev, color: e.target.value }))}
              >
                <option value="blue">Blue</option>
                <option value="green">Green</option>
                <option value="purple">Purple</option>
                <option value="orange">Orange</option>
              </select>
            </div>

            <div className="btn-group">
              <button className="btn-primary" onClick={handleUpdateEvent}>
                Save Changes
              </button>
              <button className="btn-danger" onClick={() => handleDeleteEvent(editingEvent)}>
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
            <p className="delete-message">
              Are you sure you want to delete the appointment for{' '}
              <strong>{eventToDelete.pet}</strong> at{' '}
              <strong>{eventToDelete.time}</strong>?
            </p>

            <div className="btn-group">
              <button className="btn-danger" onClick={confirmDelete}>
                Confirm Delete
              </button>
              <button className="btn-secondary" onClick={cancelDelete}>
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