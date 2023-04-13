import React, { useState, useEffect } from 'react';
import './StatisticsBar.css';
import CountUp from 'react-countup';

const StatisticsBar = ({ stats }) => {
  const [statisticsData, setStatisticsData] = useState({});

  useEffect(() => {
    const fetchStatisticsData = async () => {
      const response = await fetch('http://localhost:5000/statistics'); // Replace with your backend URL
      const data = await response.json();
      setStatisticsData(data);
    };

    fetchStatisticsData();
  }, []);


  
  return (
    <div className="statistics-bar">
      {stats.map((stat, index) => (
        <div key={index} className="statistics-item">
          <h4>
            <CountUp start={0} end={statisticsData[stat.key] || 0} duration={10} />
          </h4>
          <p>{stat.text}</p>
        </div>
      ))}
    </div>
  );
};

export default StatisticsBar;
