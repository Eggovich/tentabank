import React, { useState, useEffect } from 'react';
import './StatisticsBar.css';

const StatisticsBar = ({ stats }) => {
  const [statisticsData, setStatisticsData] = useState({});

  useEffect(() => {
    const fetchStatisticsData = async () => {
        const response = await fetch('http://localhost:5000/statistics'); // Replace with your backend URL
        const data = await response.json();
        console.log('Statistics Data:', data); // Add this line to log the data
        setStatisticsData(data);
      };
      

    fetchStatisticsData();
  }, []);

  return (
    <div className="statistics-bar">
      {stats.map((stat, index) => (
        <div key={index} className="statistics-item">
          <h4>{statisticsData[stat.key]}</h4>
          <p>{stat.text}</p>
        </div>
      ))}
    </div>
  );
};

export default StatisticsBar;
