import React, { useState, useRef, useEffect } from 'react';
import styles from './Settings.module.css';
import { ModalOverlay } from '../../AdminPages/components/Modals'; 
import savedSuccessIcon from '../../../assets/saved_success_icon.png'; 

const Settings = ({ onSaveSettings, appLanguage, setAppLanguage }) => {
  const [avatarInitials, setAvatarInitials] = useState('MA');
  const [avatarUrl, setAvatarUrl] = useState('');
  const [doctorName, setDoctorName] = useState('Better\'s Chatbot');
  const [doctorEmail, setDoctorEmail] = useState('Better\'s Chatbot');
  const [showContacts, setShowContacts] = useState(true);
  const [notifyNewPatients, setNotifyNewPatients] = useState(true);
  const [lastUpdated, setLastUpdated] = useState('');

  const [showSavedModal, setShowSavedModal] = useState(false);

  const fileInputRef = useRef(null);

  const getFormattedDate = () => {
    const today = new Date();
    const day = String(today.getDate()).padStart(2, '0');
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const year = today.getFullYear();
    return `${day}/${month}/${year}`;
  };

  useEffect(() => {
    setLastUpdated(getFormattedDate());
  }, []);

  useEffect(() => {
    if (avatarUrl) {
      setLastUpdated(getFormattedDate());
    }
  }, [avatarUrl]);

  const handleAvatarChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarUrl(reader.result);
        setAvatarInitials('');
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAvatarClick = () => {
    fileInputRef.current.click();
  };

  const handleSave = () => {
    console.log('Saving settings:', {
      avatarUrl,
      doctorName,
      doctorEmail,
      showContacts,
      appLanguage,
      notifyNewPatients,
      lastUpdated,
    });
    setShowSavedModal(true);
  };

  const closeModal = () => {
    setShowSavedModal(false);
  };

  return (
    <div className={styles.settingsContainer}>
      <h1 className={styles.pageTitle}>Settings</h1>

      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>PERSONAL INFORMATION</h2>
        <div className={styles.avatarSection}>
          <div className={styles.avatarPlaceholder} onClick={handleAvatarClick}>
            {avatarUrl ? (
              <img src={avatarUrl} alt="Doctor Avatar" className={styles.avatarImage} />
            ) : (
              <span className={styles.avatarInitials}>{avatarInitials}</span>
            )}
            <input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              onChange={handleAvatarChange}
              style={{ display: 'none' }}
            />
          </div>
          <div className={styles.avatarInfo}>
            <span className={styles.editAvatarText}>Edit Agents' Avatar</span>
            <span className={styles.lastUpdated}>Last updated : {lastUpdated}</span>
          </div>
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label}>Doctor's Name</label>
          <div className={styles.inputWithIcon}>
            <input
              type="text"
              className={styles.input}
              value={doctorName}
              onChange={(e) => setDoctorName(e.target.value)}
            />
            <span className={styles.editIcon}>✏️</span>
          </div>
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label}>Doctor's Email</label>
          <div className={styles.inputWithIcon}>
            <input
              type="email"
              className={styles.input}
              value={doctorEmail}
              onChange={(e) => setDoctorEmail(e.target.value)}
            />
            <span className={styles.editIcon}>✏️</span>
          </div>
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label}>Contacts</label>
          <div className={styles.toggleContainer}>
            <span className={styles.toggleLabel}>Show Contacts in Bio</span>
            <label className={styles.switch}>
              <input
                type="checkbox"
                checked={showContacts}
                onChange={() => setShowContacts(!showContacts)}
              />
              <span className={styles.slider}></span>
            </label>
          </div>
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label}>Language</label>
          <select
            className={styles.select}
            value={appLanguage}
            onChange={(e) => setAppLanguage(e.target.value)}
          >
            <option value="English">English</option>
            <option value="Russian">Russian</option>
            <option value="Ukrainian">Ukrainian</option>
          </select>
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label}>Notification</label>
          <div className={styles.toggleContainer}>
            <span className={styles.toggleLabel}>Notify about New Patients</span>
            <label className={styles.switch}>
              <input
                type="checkbox"
                checked={notifyNewPatients}
                onChange={() => setNotifyNewPatients(!notifyNewPatients)}
              />
              <span className={styles.slider}></span>
            </label>
          </div>
        </div>

        <button className={styles.saveButton} onClick={handleSave}>
          Save
        </button>
      </div>

      {showSavedModal && (
        <ModalOverlay onClose={closeModal}>
          <div className={styles.customSavedModalContent}>
            <h2 className={styles.modalTitle}>Saved!</h2>
            <img src={savedSuccessIcon} alt="Saved Success Icon" className={styles.modalIcon} />
            <p className={styles.modalMessage}>Your personal information were saved</p>
            <button onClick={closeModal} className={styles.modalCloseButton}>Close</button>
          </div>
        </ModalOverlay>
      )}
    </div>
  );
};

export default Settings;