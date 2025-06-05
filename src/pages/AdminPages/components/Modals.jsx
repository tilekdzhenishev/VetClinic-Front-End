import React from 'react';
import styles from './Modals.module.css';
import savedSuccessIcon from '../../../assets/saved_success_icon.png';
import logoutModalIcon from '../../../assets/logout_modal_icon.png';
import unsavedErrorIcon from '../../../assets/unsaved_error_icon.png';

export const ModalOverlay = ({ children, onClose }) => {
  return (
    <div className={styles.overlay}>
      <div className={styles.modalContent}>
        <button className={styles.closeButton} onClick={onClose}>
          &times;
        </button>
        {children}
      </div>
    </div>
  );
};
export const LoadingModal = ({ onClose }) => {
  return (
    <ModalOverlay onClose={onClose}>
      <h2 className={styles.loadingTitle}>Loading</h2>
      <div className={styles.spinner}></div>
      <p className={styles.loadingMessage}>Please do not close the window until loading won't be finish</p>
    </ModalOverlay>
  );
};

export const SavedModal = ({ onClose }) => (
  <ModalOverlay onClose={onClose}>
    <h2 className={styles.savedTitle}>Saved!</h2>
    <img src={savedSuccessIcon} alt="Saved Success Icon" className={styles.savedIcon} />
    <p className={styles.savedMessage}>Your personal information were saved</p>
  </ModalOverlay>
);

export const LoggedOutModal = ({ onClose }) => (
  <ModalOverlay onClose={onClose}>
    <h2 className={styles.loggedOutTitle}>Logging Out!</h2>
    <img src={logoutModalIcon} alt="Logging Out Icon" className={styles.loggedOutIcon} />
    <p className={styles.loggedOutMessage}>You were log out</p>
  </ModalOverlay>
);

export const UnsavedModal = ({ onClose }) => (
  <ModalOverlay onClose={onClose}>
    <h2 className={styles.unsavedTitle}>Unsaved!</h2>
    <img src={unsavedErrorIcon} alt="Unsaved Error Icon" className={styles.unsavedIcon} /> 
    <p className={styles.unsavedMessage}>Something went wrong! Check your internet network.</p> 
  </ModalOverlay>
);