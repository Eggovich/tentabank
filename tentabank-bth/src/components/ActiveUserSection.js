import React, { useState, useEffect } from 'react';
import './ActiveUserSection.css';

const ActiveUserSection = () => {
  const [activeUsers, setActiveUsers] = useState(0);

  // Replace this with a call to your API to get the active user count
  const fetchActiveUsers = () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(Math.floor(Math.random() * 1000));
      }, 1000);
    });
  };

  useEffect(() => {
    const fetchAndUpdateActiveUsers = async () => {
      const users = await fetchActiveUsers();
      setActiveUsers(users);
    };

    fetchAndUpdateActiveUsers();
  }, []);

  return (
    <div className="active-user-section">
      <h2 className="active-user-title">Active Users</h2>
      <div className="active-user-counter">{activeUsers}</div>
    </div>
  );
};

export default ActiveUserSection;
