import React from 'react'

export const Settings = () => {
    return (

        <div className="main-content">
            <div className="header">
                <h1 className="page-title">Settings</h1>
            </div>

            <div className="content-wrapper">
                <div className="settings-section">
                    <h2 className="section-title">USER SETTINGS</h2>

                    <div className="settings-list">
                        <div className="setting-item">
                            <span className="setting-label">Profile Information</span>
                            <span className="setting-arrow">→</span>
                        </div>

                        <div className="setting-item">
                            <span className="setting-label">Notifications</span>
                            <span className="setting-arrow">→</span>
                        </div>

                        <div className="setting-item">
                            <span className="setting-label">Privacy</span>
                            <span className="setting-arrow">→</span>
                        </div>

                        <div className="setting-item">
                            <span className="setting-label">Account</span>
                            <span className="setting-arrow">→</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};


