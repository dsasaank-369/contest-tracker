import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import ContestList from './components/ContestList';
import Filter from './components/Filter';
import Toggle from './components/Toggle';
import SortingVisualizer from "./components/SortingVisualizer";


const API_BASE_URL = 'https://contest-tracker-qzab.onrender.com/api/contests';

function App() {
  const [contests, setContests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState('all');
  const [isUpcoming, setIsUpcoming] = useState(true);

  useEffect(() => {
    fetchContests();
  }, [filter, isUpcoming]);

  const fetchContests = async () => {
    setLoading(true);
    try {
      let url = API_BASE_URL;
      
      if (isUpcoming) {
        if (filter !== 'all') {
          url = `${API_BASE_URL}/${filter}`;
        }
      } else {
        url = filter === 'all' ? `${API_BASE_URL}/past` : `${API_BASE_URL}/${filter}?past=true`;
      }
      
      const response = await axios.get(url);
      
      let filteredContests = response.data;
      if (isUpcoming) {
        const now = Date.now();
        filteredContests = filteredContests.filter(contest => 
            contest.status === "UPCOMING" && contest.startTime > now
        );
    }
    

      
      setContests(filteredContests);
      setError(null);
    } catch (err) {
      console.error('Error fetching contests:', err);
      setError('Failed to fetch contests. Please try again later.');
      setContests([]);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (selectedFilter) => {
    setFilter(selectedFilter);
  };

  const handleToggleChange = () => {
    setIsUpcoming(!isUpcoming);
  };

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>Coding Contest Tracker</h1>
        <div className="controls">
          <Toggle 
            isUpcoming={isUpcoming} 
            onToggleChange={handleToggleChange} 
          />
          <Filter 
            currentFilter={filter} 
            onFilterChange={handleFilterChange} 
          />
        </div>
      </header>
      
      <main>
        {error && <div className="error-message">{error}</div>}
        
        <h2>{isUpcoming ? 'Upcoming' : 'Past'} Contests</h2>
        {filter !== 'all' && <h3>Platform: {filter.charAt(0).toUpperCase() + filter.slice(1)}</h3>}
        
        {loading ? (
          <div className="loading">Loading contests...</div>
        ) : contests.length > 0 ? (
          <ContestList contests={contests} />
        ) : (
          <div className="no-contests">No contests found</div>
        )}
      </main>

             {/* <SortingVisualizer /> */}

      
      <footer>
        <p>Data sourced from CodeChef, LeetCode, and Codeforces</p>
      </footer>
    </div>
  );
}

export default App;
