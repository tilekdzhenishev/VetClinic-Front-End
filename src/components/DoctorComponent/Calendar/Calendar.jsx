import React, { useState, useEffect } from 'react';
import styles from './Calendar.module.css';
import { ModalOverlay } from '../../AdminPages/components/Modals';

const Calendar = ({
  appointments = [],
  showAddEventModal,
  setShowAddEventModal,
  showEditEventModal,
  setShowEditEventModal,
  showConfirmDeleteModal,
  setShowConfirmDeleteModal,
  newEvent,
  setNewEvent,
  editingEvent,
  setEditingEvent,
  eventToDelete,
  setEventToDelete,
  handleAddEventClick,
  handleNewEventChange,
  handleSaveNewEvent,
  handleEditEventClick,
  handleEditingEventChange,
  handleUpdateEvent,
  handleDeleteClick,
  confirmDelete,
  cancelDelete,
}) => {

  const [currentWeekStart, setCurrentWeekStart] = useState(() => {
    const today = new Date();
    const dayOfWeek = today.getDay();
    const startOfWeek = new Date(today);
    startOfWeek.setDate(today.getDate() - dayOfWeek);
    startOfWeek.setHours(0, 0, 0, 0);
    return startOfWeek;
  });

  const getAppointmentClassName = (color) => {
    switch (color) {
      case 'blue': return styles.appointment;
      case 'green': return `${styles.appointment} ${styles.appointmentGreen}`;
      case 'purple': return `${styles.appointment} ${styles.appointmentPurple}`;
      case 'orange': return `${styles.appointment} ${styles.appointmentOrange}`;
      default: return styles.appointment;
    }
  };

  const timeSlots = Array.from({ length: 11 }, (_, i) => {
    const hour = i + 7;
    const displayHour = hour > 12 ? hour - 12 : hour;
    const ampm = hour >= 12 ? 'PM' : 'AM';
    return `${displayHour} ${ampm}`;
  });

  const daysOfWeekNames = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
  const today = new Date();

  const currentDisplayedWeekDays = Array.from({ length: 7 }, (_, i) => {
    const date = new Date(currentWeekStart);
    date.setDate(currentWeekStart.getDate() + i);
    
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const formattedDateString = `${year}-${month}-${day}`;

    return {
      dayName: daysOfWeekNames[date.getDay()],
      dayNumber: date.getDate(),
      isToday: date.toDateString() === today.toDateString(),
      fullDate: formattedDateString,
    };
  });

  const getWeekRange = () => {
    const start = currentDisplayedWeekDays[0].fullDate;
    const end = currentDisplayedWeekDays[6].fullDate;

    const startDate = new Date(start);
    const endDate = new Date(end);

    const startMonth = startDate.toLocaleString('en-US', { month: 'short' });
    const endMonth = endDate.toLocaleString('en-US', { month: 'short' });

    if (startDate.getFullYear() === endDate.getFullYear()) {
      if (startDate.getMonth() === endDate.getMonth()) {
        return `${startDate.getDate()} - ${endDate.getDate()} ${startMonth} ${startDate.getFullYear()}`;
      } else {
        return `${startDate.getDate()} ${startMonth} - ${endDate.getDate()} ${endMonth} ${startDate.getFullYear()}`;
      }
    } else {
      return `${startDate.getDate()} ${startMonth} ${startDate.getFullYear()} - ${endDate.getDate()} ${endMonth} ${endDate.getFullYear()}`;
    }
  };

  const goToPreviousWeek = () => {
    setCurrentWeekStart((prevStart) => {
      const newDate = new Date(prevStart);
      newDate.setDate(prevStart.getDate() - 7);
      return newDate;
    });
  };

  const goToNextWeek = () => {
    setCurrentWeekStart((prevStart) => {
      const newDate = new Date(prevStart);
      newDate.setDate(prevStart.getDate() + 7);
      return newDate;
    });
  };

  return (
    <div>
      <div className={styles.header}>
        <h1 className={styles.pageTitle}>Calendar</h1>
        <button className={styles.addEventButton} onClick={handleAddEventClick}>
          Add Event
        </button>
      </div>
      <div className={styles.calendarNav}>
        <button className={styles.navButton} onClick={goToPreviousWeek}>&lt;</button>
        <span>WEEK {getWeekRange()}</span>
        <button className={styles.navButton} onClick={goToNextWeek}>&gt;</button>
      </div>
      <div className={styles.weekDays}>
        <div className={styles.dayCell}></div>
        {currentDisplayedWeekDays.map((day, index) => (
          <div key={day.dayName + day.dayNumber} className={`${styles.dayCell} ${day.isToday ? styles.currentDay : ''}`}>
            <span>{day.dayName}</span> <br /> <span>{day.dayNumber}</span>
          </div>
        ))}
      </div>
      <div className={styles.calendarGrid}>
        {timeSlots.map((time, timeIndex) => (
          <React.Fragment key={time}>
            <div className={styles.timeColumn}>{time}</div>
            {currentDisplayedWeekDays.map((day, dayIndex) => {
              const dayAppointments = appointments.filter(
                (app) =>
                  app.fullDate === day.fullDate &&
                  app.time.startsWith(time.split(' ')[0])
              );
              return (
                <div key={`${time}-${dayIndex}`} className={styles.timeSlot}>
                  {dayAppointments.map((app, appIndex) => (
                    <div key={appIndex} className={getAppointmentClassName(app.color)} onClick={() => handleEditEventClick(app)}>
                      {app.time.split('-')[0]} <br /> {app.pet}
                    </div>
                  ))}
                </div>
              );
            })}
          </React.Fragment>
        ))}
      </div>

      {showAddEventModal && (
        <ModalOverlay onClose={() => setShowAddEventModal(false)}>
          <h2>Add New Event</h2>
          <div className={styles.modalFormGroup}>
            <label className={styles.modalLabel}>Date:</label>
            <input
              type="date"
              name="date"
              value={newEvent.date}
              onChange={handleNewEventChange}
              className={styles.modalInput}
            />
          </div>
          <div className={styles.modalFormGroup}>
            <label className={styles.modalLabel}>Time:</label>
            <select
              name="time"
              value={newEvent.time}
              onChange={handleNewEventChange}
              className={styles.modalSelect}
            >
              <option value="">Select Time</option>
              {timeSlots.map((slot) => (
                <option key={slot} value={`${slot}-${parseInt(slot.split(' ')[0]) + 0.45} AM/PM`}>
                  {slot}
                </option>
              ))}
            </select>
          </div>
          <div className={styles.modalFormGroup}>
            <label className={styles.modalLabel}>Pet Name:</label>
            <input
              type="text"
              name="pet"
              value={newEvent.pet}
              onChange={handleNewEventChange}
              className={styles.modalInput}
              placeholder="e.g., Buddy (Golden Retriever)"
            />
          </div>
          <div className={styles.modalFormGroup}>
            <label className={styles.modalLabel}>Color:</label>
            <select
              name="color"
              value={newEvent.color}
              onChange={handleNewEventChange}
              className={styles.modalSelect}
            >
              <option value="blue">Blue</option>
              <option value="green">Green</option>
              <option value="purple">Purple</option>
              <option value="orange">Orange</option>
            </select>
          </div>
          <button className={styles.modalSaveButton} onClick={handleSaveNewEvent}>
            Save Event
          </button>
        </ModalOverlay>
      )}

      {showEditEventModal && editingEvent && (
        <ModalOverlay onClose={() => setShowEditEventModal(false)}>
          <h2>Edit Event</h2>
          <div className={styles.modalFormGroup}>
            <label className={styles.modalLabel}>Date:</label>
            <input
              type="date"
              name="date"
              value={editingEvent.date}
              onChange={handleEditingEventChange}
              className={styles.modalInput}
            />
          </div>
          <div className={styles.modalFormGroup}>
            <label className={styles.modalLabel}>Time:</label>
            <select
              name="time"
              value={editingEvent.time}
              onChange={handleEditingEventChange}
              className={styles.modalSelect}
            >
              <option value="">Select Time</option>
              {timeSlots.map((slot) => (
                <option key={slot} value={`${slot}-${parseInt(slot.split(' ')[0]) + 0.45} AM/PM`}>
                  {slot}
                </option>
              ))}
            </select>
          </div>
          <div className={styles.modalFormGroup}>
            <label className={styles.modalLabel}>Pet Name:</label>
            <input
              type="text"
              name="pet"
              value={editingEvent.pet}
              onChange={handleEditingEventChange}
              className={styles.modalInput}
            />
          </div>
          <div className={styles.modalFormGroup}>
            <label className={styles.modalLabel}>Color:</label>
            <select
              name="color"
              value={editingEvent.color}
              onChange={handleEditingEventChange}
              className={styles.modalSelect}
            >
              <option value="blue">Blue</option>
              <option value="green">Green</option>
              <option value="purple">Purple</option>
              <option value="orange">Orange</option>
            </select>
          </div>
          <div className={styles.modalButtonsContainer}>
            <button className={styles.modalSaveButton} onClick={handleUpdateEvent}>
              Save Changes
            </button>
            <button className={styles.modalDeleteButton} onClick={() => handleDeleteClick(editingEvent)}>
              Delete Event
            </button>
          </div>
        </ModalOverlay>
      )}

      {showConfirmDeleteModal && eventToDelete && (
        <ModalOverlay onClose={cancelDelete}>
          <h2>Confirm Deletion</h2>
          <p>Вы уверены, что хотите удалить событие для **{eventToDelete.pet}** в **{eventToDelete.time}**?</p>
          <div className={styles.modalButtonsContainer}>
            <button className={styles.modalDeleteButton} onClick={confirmDelete}>
              Confirm
            </button>
            <button className={styles.modalSaveButton} onClick={cancelDelete}>
              Cancel
            </button>
          </div>
        </ModalOverlay>
      )}
    </div>
  );
};

export default Calendar;