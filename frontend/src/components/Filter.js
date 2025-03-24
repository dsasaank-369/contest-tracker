import React from 'react';
import './Filter.css';

const Filter = ({ currentFilter, onFilterChange }) => {
  return (
    <div className="filter-container">
      <span className="filter-label">Filter by Platform:</span>
      <div className="filter-options">
        <button 
          className={`filter-btn ${currentFilter === 'all' ? 'active' : ''}`}
          onClick={() => onFilterChange('all')}
        >
          All
        </button>
        <button 
          className={`filter-btn ${currentFilter === 'codechef' ? 'active' : ''}`}
          onClick={() => onFilterChange('codechef')}
        >
          CodeChef
        </button>
        <button 
          className={`filter-btn ${currentFilter === 'leetcode' ? 'active' : ''}`}
          onClick={() => onFilterChange('leetcode')}
        >
          LeetCode
        </button>
        <button 
          className={`filter-btn ${currentFilter === 'codeforces' ? 'active' : ''}`}
          onClick={() => onFilterChange('codeforces')}
        >
          Codeforces
        </button>
      </div>
    </div>
  );
};

export default Filter;