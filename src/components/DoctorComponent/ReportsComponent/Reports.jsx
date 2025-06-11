import React, { useState } from 'react';
import styles from './Reports.module.css';
import { ModalOverlay } from '../../AdminPages/components/Modals';
const sampleReports = [];


const Reports = () => {
    const [selectedReport, setSelectedReport] = useState(null);
    const [showDetailsModal, setShowDetailsModal] = useState(false);

    const handleReportDoubleClick = (report) => {
        setSelectedReport(report);
        setShowDetailsModal(true);
    };

    const closeModal = () => {
        setShowDetailsModal(false);
        setSelectedReport(null);
    };

    const currentBookings = sampleReports.filter(report => report.type === 'CURRENT BOOKINGS');
    const confirmedAppointments = sampleReports.filter(report => report.type === 'CONFIRMED APPOINTMENTS');

    return (
        <div className={styles.reportsContainer}>
            <h1 className={styles.pageTitle}>History</h1>

            <div className={styles.section}>
                <h2 className={styles.sectionTitle}>CURRENT BOOKINGS ({currentBookings.length})</h2>
                {currentBookings.length > 0 ? (
                    currentBookings.map(report => (
                        <div key={report.id} className={styles.reportCard} onDoubleClick={() => handleReportDoubleClick(report)}>
                            <div className={styles.reportHeader}>
                                <span className={styles.reportId}>#{report.id}</span>
                                <span className={styles.reportDate}>{report.date}</span>
                            </div>
                            <div className={styles.reportContent}>
                                <span className={styles.reportPetType}>{report.petType}</span>
                                <p className={styles.reportIssue}>{report.issue}</p>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className={styles.noRecordsMessage}>No current bookings.</p>
                )}
            </div>

            <div className={styles.section}>
                <h2 className={styles.sectionTitle}>CONFIRMED APPOINTMENTS</h2>
                {confirmedAppointments.length > 0 ? (
                    confirmedAppointments.map(report => (
                        <div key={report.id} className={styles.reportCard} onDoubleClick={() => handleReportDoubleClick(report)}>
                            <div className={styles.reportHeader}>
                                <span className={styles.reportId}>#{report.id}</span>
                                <span className={styles.reportDate}>{report.date}</span>
                            </div>
                            <div className={styles.reportContent}>
                                <span className={styles.reportPetType}>{report.petType}</span>
                                <p className={styles.reportIssue}>{report.issue}</p>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className={styles.noRecordsMessage}>No confrimed appointments.</p>
                )}
            </div>

            {showDetailsModal && selectedReport && (
                <ModalOverlay onClose={closeModal}>
                    <h2 className={styles.modalTitle}>Report Details: #{selectedReport.id}</h2>
                    <p className={styles.modalDetail}>**Type:** {selectedReport.type}</p>
                    <p className={styles.modalDetail}>**Pet Type:** {selectedReport.petType}</p>
                    <p className={styles.modalDetail}>**Problem:** {selectedReport.issue}</p>
                    <p className={styles.modalDetail}>**Date:** {selectedReport.date}</p>
                    <p className={styles.modalDetail}>**Description:** {selectedReport.details}</p>
                    <button onClick={closeModal} className={styles.modalCloseButton}>Close</button>
                </ModalOverlay>
            )}
        </div>
    );
};

export default Reports;