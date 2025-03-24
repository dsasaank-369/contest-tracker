import React from 'react';
import './ContestCard.css';

const ContestCard = ({ contest }) => {
  const formatDate = (timestamp) => {
    if (!timestamp || isNaN(timestamp) || timestamp < 1000000000000) return "Invalid Date";
    const date = new Date(timestamp);
    return date.toLocaleString();
};


  const formatDuration = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    
    return hours > 0 
      ? `${hours} hour${hours > 1 ? 's' : ''} ${minutes > 0 ? minutes + ' min' : ''}`
      : `${minutes} minutes`;
  };

  const getTimeRemaining = (startTime) => {
    const now = Date.now();
    const diff = startTime - now;
    
    if (diff <= 0) return 'Started';
    
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    
    if (days > 0) {
      return `${days} day${days > 1 ? 's' : ''} ${hours} hr`;
    } else if (hours > 0) {
      return `${hours} hr ${minutes} min`;
    } else {
      return `${minutes} min`;
    }
  };

  const getPlatformColor = (platform) => {
    switch (platform.toLowerCase()) {
      case 'codechef':
        return '#5B4638';
      case 'leetcode':
        return '#FFA116';
      case 'codeforces':
        return '#1F8ACB';
      default:
        return '#333333';
    }
  };

  const getStatusClass = (status) => {
    switch (status) {
      case 'ONGOING':
        return 'status-ongoing';
      case 'UPCOMING':
        return 'status-upcoming';
      case 'FINISHED':
        return 'status-finished';
      default:
        return '';
    }
  };

  return (
    <div className="contest-card">
      <div 
        className="card-header" 
        style={{ backgroundColor: getPlatformColor(contest.platform) }}
      >
        <span className="platform-name">{contest.platform}</span>
        <span className={`contest-status ${getStatusClass(contest.status)}`}>
          {contest.status}
        </span>
      </div>
      
      <div className="card-body">
        <h3 className="contest-name">{contest.name}</h3>
        
        <div className="contest-details">
          <div className="detail-item">
            <span className="detail-label">Starts:</span>
            <span className="detail-value">{formatDate(contest.startTime)}</span>
          </div>
          
          <div className="detail-item">
            <span className="detail-label">Duration:</span>
            <span className="detail-value">{formatDuration(contest.duration)}</span>
          </div>
          
          {contest.status === 'UPCOMING' && (
            <div className="detail-item">
              <span className="detail-label">Starts in:</span>
              <span className="detail-value highlight">{getTimeRemaining(contest.startTime)}</span>
            </div>
          )}
        </div>
      </div>
      
      <div className="card-footer">
        <a 
          href={contest.url} 
          target="_blank" 
          rel="noopener noreferrer" 
          className="contest-link"
        >
          Visit Contest
        </a>
      </div>
    </div>
  );
};

export default ContestCard;