import React, { useState, useEffect } from 'react';
import { Edit2, User } from 'lucide-react';
import './Settings.css'

export const Settings = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: ""
    });

    const [originalData, setOriginalData] = useState({});
    const [notifications, setNotifications] = useState({
        bookings: true
    });



    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [saving, setSaving] = useState(false);
    const [saveMessage, setSaveMessage] = useState("");
    const [userId, setUserId] = useState(null);



    useEffect(() => {
        const fetchUserData = async () => {
            try {
                setLoading(true);
                const token = localStorage.getItem("token");
                if (!token) {
                    setError("No token found");
                    setLoading(false);
                    return;
                }

                const userRes = await fetch("https://vetclinic-back-end.onrender.com/api/users/me", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (!userRes.ok) {
                    throw new Error("Failed to fetch user profile");
                }

                const user = await userRes.json();
                console.log("User data:", user);

                const userData = {
                    name: user.name || "",
                    email: user.email || "",
                    password: ""
                };

                setFormData(userData);
                setOriginalData(userData);
                setUserId(user.id);

            } catch (err) {
                console.error("Error fetching user data:", err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchUserData();
    }, []);

    const handleInputChange = (field, value) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }));

        if (saveMessage) {
            setSaveMessage("");
        }
    };

    const handleNotificationToggle = (key) => {
        setNotifications(prev => ({
            ...prev,
            [key]: !prev[key]
        }));
    };

    const handleSave = async () => {
        try {
            setSaving(true);
            setSaveMessage("");

            const token = localStorage.getItem("token");
            if (!token) {
                setError("No token found");
                return;
            }

            if (!userId) {
                setError("User ID not found");
                return;
            }

            const updateData = {
                name: formData.name,
                email: formData.email
            };


            if (formData.password && formData.password.trim() !== "") {
                updateData.password = formData.password;
            }

            const response = await fetch(`https://vetclinic-back-end.onrender.com/api/users/users/${userId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(updateData)
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Failed to update profile');
            }

            const updatedUser = await response.json();
            console.log('Profile updated:', updatedUser);


            setOriginalData({
                name: formData.name,
                email: formData.email,
                password: ""
            });


            setFormData(prev => ({
                ...prev,
                password: ""
            }));

            setSaveMessage("Settings saved successfully!");


            setTimeout(() => {
                setSaveMessage("");
            }, 3000);

        } catch (err) {
            console.error("Error saving settings:", err);
            setError(err.message);
        } finally {
            setSaving(false);
        }
    };

    const hasChanges = () => {
        return formData.name !== originalData.name ||
            formData.email !== originalData.email ||
            (formData.password && formData.password.trim() !== "");
    };

    if (loading) {
        return (
            <div className="settings-container">
                <div className="settings-header">
                    <h1 className="settings-title">Settings</h1>
                </div>
                <div className="loading-container">
                    <div className="loading-spinner"></div>
                    <p>Loading settings...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="settings-container">
                <div className="settings-header">
                    <h1 className="settings-title">Settings</h1>
                </div>
                <div className="error-container">
                    <div className="error-icon">⚠️</div>
                    <h3>Error Loading Settings</h3>
                    <p>{error}</p>
                </div>
            </div>
        );
    }

    return (
        <div className="settings-container">
            <div className="settings-header">
                <h1 className="settings-title">Settings</h1>
            </div>

            <div className="settings-content">
                <div className="personal-info-section">
                    <h2 className="section-title">PERSONAL INFORMATION</h2>

                    <div className="profile-card">
                        <div className="avatar-section">
                            <div className="avatar-container">
                                <User size={36} />

                            </div>
                            <div className="avatar-info">
                                <span className="edit-avatar-text">Edit Personal Information</span>

                            </div>
                        </div>

                        <div className="form-section">
                            <div className="form-group">
                                <label className="form-label">Name</label>
                                <div className="input-wrapper">

                                    <input
                                        type="text"
                                        className="form-input"
                                        value={formData.name}
                                        onChange={(e) => handleInputChange('name', e.target.value)}
                                        placeholder="Enter your name"
                                    />
                                    <Edit2 className="edit-icon" size={16} />
                                </div>
                            </div>

                            <div className="form-group">
                                <label className="form-label">Email</label>
                                <div className="input-wrapper">

                                    <input
                                        type="email"
                                        className="form-input verified"
                                        value={formData.email}
                                        onChange={(e) => handleInputChange('email', e.target.value)}
                                        placeholder="Enter your email"
                                    />
                                    <div className="verification-badge">
                                        <span className="verification-text">✓</span>
                                    </div>
                                    <Edit2 className="edit-icon" size={16} />
                                </div>
                            </div>

                            <div className="form-group">
                                <label className="form-label">Password</label>
                                <div className="input-wrapper">

                                    <input
                                        type="password"
                                        className="form-input"
                                        value={formData.password}
                                        onChange={(e) => handleInputChange('password', e.target.value)}
                                        placeholder="Enter new password (leave empty to keep current)"
                                    />
                                    <Edit2 className="edit-icon" size={16} />
                                </div>
                            </div>

                            <div className="form-group">
                                <label className="form-label">Notification</label>
                                <div className="notification-item">

                                    <span className="notification-text">Notify about Your Bookings</span>
                                    <div
                                        className={`toggle-switch ${notifications.bookings ? 'active' : ''}`}
                                        onClick={() => handleNotificationToggle('bookings')}
                                    >
                                        <div className="toggle-slider"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="bottom-section">
                    {saveMessage && (
                        <div className="save-message success">
                            {saveMessage}
                        </div>
                    )}

                    <button
                        className={`save-button ${!hasChanges() ? 'disabled' : ''}`}
                        onClick={handleSave}
                        disabled={saving || !hasChanges()}
                    >
                        {saving ? 'Saving...' : 'Save'}
                    </button>
                </div>
            </div>
        </div>
    );
};