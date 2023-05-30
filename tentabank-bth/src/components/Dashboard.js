import React, { useEffect, useState } from 'react';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, Legend, LineChart, Line } from 'recharts';
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
      <h2 className={styles.title}>Statistik</h2>
      <div className={styles.grid}>
        <div className={styles.card}>
          <h3>Antal Användare</h3>
          <p>{data.total_users}</p>
        </div>
        <div className={styles.card}>
          <h3>Antal Tentor</h3>
          <p>{data.total_exams}</p>
        </div>
        <div className={styles.card}>
          <h3>Antal Kommentarer</h3>
          <p>{data.total_comments}</p>
        </div>
        <div className={styles.card}>
          <h3>Genomsnittligt Omdöme</h3>
          <p>{data.avg_rating}</p>
        </div>
        <div className={styles.chart}>
            <h3>Uppladdningar per Dag</h3>
            <LineChart width={1000} height={500} data={data.uploads_per_day}>
                <Line type="monotone" dataKey="uploads_per_day" stroke="#8884d8" />
                <CartesianGrid stroke="#ccc" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
            </LineChart>
        </div>
        <div className={styles.chart}>
            <h3>Top 5 Aktiva Användare</h3>
            <BarChart width={500} height={300} data={data.top_users}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="username" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="uploads" fill="#8884d8" />
            </BarChart>
        </div>
        <div className={styles.chart}>
          <h3>Användarregistreringar över tid</h3>
          <LineChart width={500} height={300} data={data.user_signups_over_time}>
            <Line type="monotone" dataKey="count" stroke="#8884d8" />
            <CartesianGrid stroke="#ccc" />
            <XAxis dataKey="time" />
            <YAxis />
            <Tooltip />
            <Legend />
          </LineChart>
        </div>
        <div className={styles.chart}>
            <h3>Top 5 Kurskoder</h3>
            <BarChart width={500} height={300} data={data.top_course_codes}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="cource_code" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="count" fill="#8884d8" />
            </BarChart>
        </div>
          
        <div className={styles.chart}>
          <h3>Tentor per kategori</h3>
          <PieChart width={500} height={500}>
            <Pie
              data={data.exams_per_category}
              cx="50%"
              cy="50%"
              labelLine={false}
              outerRadius={100}
              fill="#8884d8"
              dataKey="exams"
              label={({ category, exams }) => `${category}: ${exams}`}
            >
              {(data.exams_per_category || []).map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
          </PieChart>
        </div>
      </div>
    </div>
  ) : (
    <h2>Loading Dashboard Data...</h2>
  );
};

export default Dashboard;
