import React from 'react';
import ContestCard from './ContestCard';
import './ContestList.css';

const ContestList = ({ contests }) => {
  return (
    <div className="contest-list">
      {contests.map(contest => (
        <ContestCard key={`${contest.platform}-${contest.id}`} contest={contest} />
      ))}
    </div>
  );
};

export default ContestList;