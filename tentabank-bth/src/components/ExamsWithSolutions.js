import React from 'react';
import './ExamsWithSolutions.css';

const ExamsWithSolutions = ({ exams, setSelectedExam }) => {
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
