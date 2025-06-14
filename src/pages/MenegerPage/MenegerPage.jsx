import React, { useState, useEffect } from 'react';
import ManagerSidebar from '../../components/ManagerComponent/Sidebar/Sidebar';
import ManagerDashboard from '../../components/ManagerComponent/Dashboard/Dashboard';
import Reports from '../../components/ManagerComponent/ReportsComponent/Reports';
import Settings from '../../components/ManagerComponent/SettingComponent/Settings';
import { LoadingModal, SavedModal, LoggedOutModal, UnsavedModal } from '../../components/AdminComponent/Modals/Modals';

const managerAppStyles = {
  container: {
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

function ManagerApp() {
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [showModal, setShowModal] = useState(null);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [appLanguage, setAppLanguage] = useState('English');

  useEffect(() => {
    document.documentElement.classList.toggle('dark-mode', isDarkMode);
  }, [isDarkMode]);

  const handleNavigate = (page) => {
    if (page === 'logout') {
      setShowModal('loggedOut');
    } else {
      setCurrentPage(page);
    }
  };

  const handleSaveAction = () => {
    setShowModal('loading');
    setTimeout(() => {
      const success = Math.random() > 0.5;
      setShowModal(success ? 'saved' : 'unsaved');
    }, 1500);
  };

  const closeModal = () => {
    setShowModal(null);
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <ManagerDashboard />;
      case 'reports':
        return <Reports />;
      case 'settings':
        return (
          <Settings
            onSaveSettings={handleSaveAction}
            appLanguage={appLanguage}
            setAppLanguage={setAppLanguage}
          />
        );
      default:
        return (
          <div>
            <h1 style={managerAppStyles.pageTitle}>Dashboard</h1>
            <p>Welcome to your manager dashboard!</p>
            <p>Select a section from the sidebar to manage schedules, reports, and preferences.</p>
          </div>
        );
    }
  };

  return (
    <div className="container">
      <ManagerSidebar
        currentPage={currentPage}
        onNavigate={handleNavigate}
        isDarkMode={isDarkMode}
        setIsDarkMode={setIsDarkMode}
        appLanguage={appLanguage}
      />
      <div className="main-content">
        {renderPage()}
      </div>

      {showModal === 'loading' && <LoadingModal onClose={closeModal} />}
      {showModal === 'saved' && <SavedModal onClose={closeModal} />}
      {showModal === 'loggedOut' && <LoggedOutModal onClose={closeModal} />}
      {showModal === 'unsaved' && <UnsavedModal onClose={closeModal} />}
    </div>
  );
}

export default ManagerApp;
