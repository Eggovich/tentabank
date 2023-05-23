import React, { useEffect, useState } from 'react';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, Legend } from 'recharts';
import styles from './Dashboard.module.css';

const Dashboard = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch('http://localhost:5000/dashboardData')
      .then(response => response.json())
      .then(data => setData(data));
  }, []);

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

  return data ? (
    <div className={styles.container}>
      <h2 className={styles.title}>Dashboard</h2>
      <div className={styles.grid}>
        <div>Total Users: {data.total_users}</div>
        <div>Total Exams: {data.total_exams}</div>
        <div>Average Exam Rating: {data.avg_rating.toFixed(2)}</div>
        <div className={styles.chart}>
          <BarChart width={1000} height={500} data={data.uploads_per_user}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="username" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="uploads" fill="#8884d8" />
          </BarChart>
        </div>
        <div className={styles.chart}>
          <PieChart width={400} height={400}>
            <Pie
              data={data.exams_per_university}
              cx="50%"
              cy="50%"
              labelLine={false}
              outerRadius={100}
              fill="#8884d8"
              dataKey="exams"
              label={({ name, exams }) => `${name}: ${exams}`}
            >
              {data.exams_per_university.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
          </PieChart>
        </div>
      </div>
    </div>
  ) : (
    <h2>Loading...</h2>
  );
};

export default Dashboard;
