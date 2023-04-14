import React, { useState, useEffect } from 'react';
import styles from './ActiveUserSection.module.css';
import CountUp from 'react-countup';

const ActiveUserSection = () => {
  const [activeUsers, setActiveUsers] = useState(0);

  // Replace this with a call to your API to get the active user count
  const fetchActiveUsers = async () => {
    try {
      const response = await fetch("http://localhost:5000/activeuser", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
  
      if (response.ok) {
        const data = await response.json();
        return data.active_users;
      } else {
        throw new Error("Failed to fetch active users");
      }
    } catch (error) {
      console.error(error);
      return 0;
    }
  };
  

  useEffect(() => {
    const fetchAndUpdateActiveUsers = async () => {
      const users = await fetchActiveUsers();
      setActiveUsers(users);
    };

    fetchAndUpdateActiveUsers();
  }, []);

  return (
    <div className={styles.active_user_section}>
      <h2 className={styles.active_user_title}>Active Users</h2>
      <CountUp className={styles.active_user_counter} start={0} end={activeUsers || 0} duration={10} />
    </div>
  );
};

export default ActiveUserSection;
