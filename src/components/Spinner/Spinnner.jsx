// src/components/common/Spinner/Spinner.jsx
import React from 'react';
import './Spinner.css';

const Spinner = ({ asOverlay = false, color = '#FFD700', size = '40px' }) => {
  const spinnerStyle = {
    borderTopColor: color,
    width: size,
    height: size,
  };

  if (asOverlay) {
    return (
      <div className="spinner-overlay">
        <div className="spinner" style={spinnerStyle}></div>
      </div>
    );
  }

  return (
    <div className="spinner-container">
      <div className="spinner" style={spinnerStyle}></div>
    </div>
  );
};

export default Spinner;