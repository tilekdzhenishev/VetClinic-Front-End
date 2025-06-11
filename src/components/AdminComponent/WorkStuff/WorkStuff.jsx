import React, { useState } from 'react';
import styles from './WorkStuff.module.css';

const workstaffTranslations = {
  English: {
    pageTitle: 'Work staff',
    subtitle: 'MANAGE YOUR EMPLOYEES',
    chooseFunction: 'Choose function',
    addNewWorker: 'Add new worker',
    email: 'Email',
    findYourWorker: 'Find your worker',
    name: 'Name',
    provideFullName: 'Provide full name',
    position: 'Position',
    manager: 'Manager',
    veterinarian: 'Veterinarian',
    assistant: 'Assistant',
    saveButton: 'Save',
    fillAllFields: 'Please fill in all fields.',
  },
  Russian: {
    pageTitle: 'Сотрудники',
    subtitle: 'УПРАВЛЯЙТЕ ВАШИМИ СОТРУДНИКАМИ',
    chooseFunction: 'Выберите функцию',
    addNewWorker: 'Добавить нового сотрудника',
    email: 'Email',
    findYourWorker: 'Найдите сотрудника',
    name: 'Имя',
    provideFullName: 'Укажите полное имя',
    position: 'Должность',
    manager: 'Менеджер',
    veterinarian: 'Ветеринар',
    assistant: 'Ассистент',
    saveButton: 'Сохранить',
    fillAllFields: 'Пожалуйста, заполните все поля.',
  },
  Ukrainian: {
    pageTitle: 'Співробітники',
    subtitle: 'КЕРУЙТЕ ВАШИМИ СПІВРОБІТНИКАМИ',
    chooseFunction: 'Оберіть функцію',
    addNewWorker: 'Додати нового співробітника',
    email: 'Email',
    findYourWorker: 'Знайдіть співробітника',
    name: "Ім'я",
    provideFullName: "Вкажіть повне ім'я",
    position: 'Посада',
    manager: 'Менеджер',
    veterinarian: 'Ветеринар',
    assistant: 'Асистент',
    saveButton: 'Зберегти',
    fillAllFields: 'Будь ласка, заповніть усі поля.',
  },
};

const WorkStaff = ({ onSave, appLanguage }) => {
  const [functionValue, setFunctionValue] = useState('');
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [position, setPosition] = useState('Manager');

  const t = workstaffTranslations[appLanguage] || workstaffTranslations.English;

  const handleSave = () => {
    if (!functionValue || !email || !name || !position) {
      console.log(t.fillAllFields);
      return;
    }
    console.log({ functionValue, email, name, position });
    onSave();
  };

  return (
    <div>
      <div className={styles.header}>
        <h1 className={styles.pageTitle}>{t.pageTitle}</h1>
        <p className={styles.subtitle}>{t.subtitle}</p>
      </div>
      <div className={styles.formContainer}>
        <div className={styles.formGroup}>
          <label className={styles.label}>{t.chooseFunction}</label>
          <div className={styles.inputWrapper}>
            <input
              type="text"
              placeholder={t.addNewWorker}
              className={styles.input}
              value={functionValue}
              onChange={(e) => setFunctionValue(e.target.value)}
            />
            <button className={styles.iconButton}>✏️</button>
          </div>
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label}>{t.email}</label>
          <div className={styles.inputWrapper}>
            <input
              type="email"
              placeholder={t.findYourWorker}
              className={styles.input}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button className={styles.iconButton}>✏️</button>
          </div>
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label}>{t.name}</label>
          <div className={styles.inputWrapper}>
            <input
              type="text"
              placeholder={t.provideFullName}
              className={styles.input}
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <button className={styles.iconButton}>✏️</button>
          </div>
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label}>{t.position}</label>
          <div className={styles.inputWrapper}>
            <select
              className={styles.select}
              value={position}
              onChange={(e) => setPosition(e.target.value)}
            >
              <option value="Manager">{t.manager}</option>
              <option value="Veterinarian">{t.veterinarian}</option>
              <option value="Assistant">{t.assistant}</option>
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

export default WorkStaff;