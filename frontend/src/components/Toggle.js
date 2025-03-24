import React from 'react';
import './Toggle.css';

const Toggle = ({ isUpcoming, onToggleChange }) => {
  return (
    <div className="toggle-container">
      <span className="toggle-label">Contest Type:</span>
      <div className="toggle-switch">
        <button 
          className={`toggle-option ${isUpcoming ? 'active' : ''}`}
          onClick={() => onToggleChange(true)}
        >
          Upcoming
        </button>
        <button 
          className={`toggle-option ${!isUpcoming ? 'active' : ''}`}
          onClick={() => onToggleChange(false)}
        >
          Past
        </button>
      </div>
    </div>
  );
};

export default Toggle;