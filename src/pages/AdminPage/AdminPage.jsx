import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import WorkStaff from './components/WorkStaff';
import Settings from './components/Settings';
import Calendar from './components/Calendar';
import { LoadingModal, SavedModal, LoggedOutModal, UnsavedModal, ModalOverlay } from './components/Modals';

const adminAppStyles = {
  adminContainer: {
    display: 'flex',
    width: '100%',
    minHeight: '100vh',
  },
  mainContent: {
    flex: 1,
    padding: '40px',
    backgroundColor: 'var(--bg-primary)',
    borderRadius: '16px',
    margin: '20px',
    marginLeft: 'calc(250px + 20px)',
    display: 'flex',
    flexDirection: 'column',
    boxShadow: '0 4px 12px var(--box-shadow-light)',
    transition: 'background-color 0.3s ease, box-shadow 0.3s ease',
  },
  pageTitle: {
    fontSize: '2em',
    fontWeight: '600',
    color: 'var(--text-primary)',
    marginBottom: '5px',
    transition: 'color 0.3s ease',
  },
  '@media (max-width: 1024px)': {
    mainContent: {
      marginLeft: '20px',
      padding: '20px',
    },
  },
  '@media (max-width: 768px)': {
    mainContent: {
      margin: '10px',
      padding: '15px',
    },
  },
};


function AdminApp() {
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [showModal, setShowModal] = useState(null);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [userName, setUserName] = useState('Better\'s Chatbot');
  const [userEmail, setUserEmail] = useState('Better\'s Chatbot');
  const [userAvatar, setUserAvatar] = useState('https://placehold.co/80x80/E0E7FF/007bff?text=MA');
  const [appLanguage, setAppLanguage] = useState('English');

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark-mode');
    } else {
      document.documentElement.classList.remove('dark-mode');
    }
  }, [isDarkMode]);

  const [appointments, setAppointments] = useState([]);
  const [showAddEventModal, setShowAddEventModal] = useState(false);
  const [showEditEventModal, setShowEditEventModal] = useState(false);
  const [showConfirmDeleteModal, setShowConfirmDeleteModal] = useState(false);
  const [newEvent, setNewEvent] = useState({
    date: '',
    time: '',
    pet: '',
    color: 'blue',
  });
  const [editingEvent, setEditingEvent] = useState(null);
  const [eventToDelete, setEventToDelete] = useState(null);

  const handleAddEventClick = () => {
    setNewEvent({ date: '', time: '', pet: '', color: 'blue' });
    setShowAddEventModal(true);
  };

  const handleNewEventChange = (e) => {
    const { name, value } = e.target;
    setNewEvent((prev) => ({ ...prev, [name]: value }));
  };

  const handleSaveNewEvent = () => {
    if (!newEvent.date || !newEvent.time || !newEvent.pet) {
      console.log('Пожалуйста, заполните все поля для события.');
      return;
    }

    const [year, month, day] = newEvent.date.split('-').map(Number);
    const eventDate = new Date(year, month - 1, day);
    const dayIndex = eventDate.getDay();

    setAppointments((prev) => [
        ...prev,
        {
            id: Date.now(),
            time: newEvent.time,
            day: dayIndex,
            pet: newEvent.pet,
            color: newEvent.color,
            date: newEvent.date,
            fullDate: newEvent.date,
        },
    ]);

    setNewEvent({ date: '', time: '', pet: '', color: 'blue' });
    setShowAddEventModal(false);
  };

  const handleEditEventClick = (event) => {
    setEditingEvent({ ...event });
    setShowEditEventModal(true);
  };

  const handleEditingEventChange = (e) => {
    const { name, value } = e.target;
    setEditingEvent((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdateEvent = () => {
    if (!editingEvent.date || !editingEvent.time || !editingEvent.pet) {
      console.log('Пожалуйста, заполните все поля для события.');
      return;
    }
    setAppointments((prev) =>
      prev.map((app) => (app.id === editingEvent.id ? editingEvent : app))
    );
    setEditingEvent(null);
    setShowEditEventModal(false);
  };

  const handleDeleteClick = (event) => {
    setEventToDelete(event);
    setShowConfirmDeleteModal(true);
  };

  const confirmDelete = () => {
    setAppointments((prev) => prev.filter((app) => app.id !== eventToDelete.id));
    setEventToDelete(null);
    setShowConfirmDeleteModal(false);
    setShowEditEventModal(false);
  };

  const cancelDelete = () => {
    setEventToDelete(null);
    setShowConfirmDeleteModal(false);
  };

  const handleNavigate = (page) => {
    if (page === 'logout') {
      setShowModal('loggedOut');
    } else if (page === 'back') {
      setCurrentPage('dashboard');
    } else {
      setCurrentPage(page);
    }
  };

  const handleSaveAction = () => {
    setShowModal('loading');
    setTimeout(() => {
      const success = Math.random() > 0.5;
      if (success) {
        setShowModal('saved');
      } else {
        setShowModal('unsaved');
      }
    }, 1500);
  };

  const closeModal = () => {
    setShowModal(null);
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'workstaff':
        return <WorkStaff onSave={handleSaveAction} />;
      case 'settings':
        return (
          <Settings
            onSave={handleSaveAction}
            userName={userName}
            setUserName={setUserName}
            userEmail={userEmail}
            setUserEmail={setUserEmail}
            userAvatar={userAvatar}
            setUserAvatar={setUserAvatar}
            appLanguage={appLanguage}
            setAppLanguage={setAppLanguage}
          />
        );
      case 'dashboard':
        return (
          <Calendar
            appointments={appointments}
            setAppointments={setAppointments}
            showAddEventModal={showAddEventModal}
            setShowAddEventModal={setShowAddEventModal}
            showEditEventModal={showEditEventModal}
            setShowEditEventModal={setShowEditEventModal}
            showConfirmDeleteModal={showConfirmDeleteModal}
            setShowConfirmDeleteModal={setShowConfirmDeleteModal}
            newEvent={newEvent}
            setNewEvent={setNewEvent}
            editingEvent={editingEvent}
            setEditingEvent={setEditingEvent}
            eventToDelete={eventToDelete}
            setEventToDelete={setEventToDelete}
            handleAddEventClick={handleAddEventClick}
            handleNewEventChange={handleNewEventChange}
            handleSaveNewEvent={handleSaveNewEvent}
            handleEditEventClick={handleEditEventClick}
            handleEditingEventChange={handleEditingEventChange}
            handleUpdateEvent={handleUpdateEvent}
            handleDeleteClick={handleDeleteClick}
            confirmDelete={confirmDelete}
            cancelDelete={cancelDelete}
          />
        );
      default:
        return (
          <div>
            <h1 style={adminAppStyles.pageTitle}>Dashboard</h1>
            <p>Welcome to your admin dashboard!</p>
            <p>Select a page from the sidebar to manage your clinic.</p>
          </div>
        );
    }
  };

  return (
    <div style={adminAppStyles.adminContainer}>
      <Sidebar
        currentPage={currentPage}
        onNavigate={handleNavigate}
        isDarkMode={isDarkMode}
        setIsDarkMode={setIsDarkMode}
        appLanguage={appLanguage}
      />
      <div style={adminAppStyles.mainContent}>
        {renderPage()}
      </div>

      {showModal === 'loading' && <LoadingModal onClose={closeModal} />}
      {showModal === 'saved' && <SavedModal onClose={closeModal} />}
      {showModal === 'loggedOut' && <LoggedOutModal onClose={closeModal} />}
      {showModal === 'unsaved' && <UnsavedModal onClose={closeModal} />}
    </div>
  );
}

export default AdminApp;
