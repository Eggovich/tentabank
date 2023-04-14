import React, { useEffect, useState } from 'react';
import './ExamsWithSolutions.css';

const ExamsWithSolutions = ({ setSelectedExam }) => {
  const [exams, setExams] = useState([]);

  useEffect(() => {
    fetchExams();
  }, []);

  const fetchExams = async () => {
    try {
      const response = await fetch('http://localhost:5000/browseExamsWithSolutions', {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();
      setExams(data.files);
    } catch (error) {
      console.error('Error fetching exams:', error);
    }
  };

  const handleExamClick = (exam) => {
    setSelectedExam(exam);
  };

  return (
    <div className="exams-with-solutions">
      <h2>Exams with Solutions</h2>
      <ul>
        {exams.map((exam, index) => (
          <li key={index} onClick={() => handleExamClick(exam)}>
            <div className="exam-info">
              <span className="subject">{exam.cource_code}</span>
              <span className="date">{exam.exam_date}</span>
              <span className="grade">{exam.grade}</span>
            </div>
            <div className="solution-info">
              <span className="rating">{exam.rating}</span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ExamsWithSolutions;
