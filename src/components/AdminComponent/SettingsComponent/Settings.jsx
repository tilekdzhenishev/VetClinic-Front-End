import React, { useRef } from 'react';
import styles from './Settings.module.css';

const Settings = ({
  onSave,
  userName,
  setUserName,
  userEmail,
  setUserEmail,
  userAvatar,
  setUserAvatar,
  appLanguage,
  setAppLanguage,
}) => {
  const fileInputRef = useRef(null);

  const handleAvatarChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setUserAvatar(imageUrl);
      console.log('Selected avatar file:', file);
    }
  };

  const handleEditAvatarClick = () => {
    fileInputRef.current.click();
  };

  const handleSave = () => {
    console.log('Saving settings:', { userName, userEmail, userAvatar, appLanguage });
    onSave();
  };

  const settingsTranslations = {
    English: {
      pageTitle: 'Settings',
      subtitle: 'PERSONAL INFORMATION',
      editAvatar: 'Edit Avatar',
      lastUpdated: 'Last updated',
      nameLabel: 'Name',
      emailLabel: 'Email',
      languageLabel: 'Language',
      saveButton: 'Save',
    },
    Russian: {
      pageTitle: 'Настройки',
      subtitle: 'ЛИЧНАЯ ИНФОРМАЦИЯ',
      editAvatar: 'Изменить аватар',
      lastUpdated: 'Последнее обновление',
      nameLabel: 'Имя',
      emailLabel: 'Email',
      languageLabel: 'Язык',
      saveButton: 'Сохранить',
    },
    Ukrainian: {
      pageTitle: 'Налаштування',
      subtitle: 'ОСОБИСТА ІНФОРМАЦІЯ',
      editAvatar: 'Змінити аватар',
      lastUpdated: 'Останнє оновлення',
      nameLabel: "Ім'я",
      emailLabel: 'Email',
      languageLabel: 'Мова',
      saveButton: 'Зберегти',
    },
  };

  const t = settingsTranslations[appLanguage] || settingsTranslations.English;

  return (
    <div>
      <div className={styles.header}>
        <h1 className={styles.pageTitle}>{t.pageTitle}</h1>
        <p className={styles.subtitle}>{t.subtitle}</p>
      </div>
      <div className={styles.formContainer}>
        <div className={styles.avatarSection}>
          <img src={userAvatar} alt="Avatar" className={styles.avatar} />
          <div className={styles.avatarText}>
            <a href="#" onClick={handleEditAvatarClick} className={styles.editAvatarLink}>
              {t.editAvatar}
            </a>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleAvatarChange}
              style={{ display: 'none' }}
              accept="image/*"
            />
            <span className={styles.lastUpdated}>Last updated : {lastUpdated}</span>
          </div>
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label}>{t.nameLabel}</label>
          <div className={styles.inputWrapper}>
            <input
              type="text"
              className={styles.input}
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
            />
            <button className={styles.iconButton}>✏️</button>
          </div>
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label}>{t.emailLabel}</label>
          <div className={styles.inputWrapper}>
            <input
              type="email"
              className={styles.input}
              value={userEmail}
              onChange={(e) => setUserEmail(e.target.value)}
            />
            <button className={styles.iconButton}>✏️</button>
          </div>
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label}>{t.languageLabel}</label>
          <div className={styles.inputWrapper}>
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
        </div>

        <button className={styles.saveButton} onClick={handleSave}>
          {t.saveButton}
        </button>
      </div>
    </div>
  );
};

export default Settings;
