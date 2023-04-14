import React, { useState, useEffect } from 'react';
import { useCookies } from 'react-cookie';
import Setstarrating from '../components/Setstarrating';
import Comments from '../components/comments';

const ExamDetails = ({ selectedExam, setSelectedExam }) => {
  const [cookies] = useCookies(['User']);

  useEffect(() => {
    if (!selectedExam) return;

    // Fetch exam details if needed
    // ...
  }, [selectedExam]);

  if (!selectedExam) return null;

  return (
    <div className="exam-details">
      <button className="back-button" onClick={() => setSelectedExam(null)}>
        Go back to exam list
      </button>
      <h1>{selectedExam.name}</h1>
      <div className="exam-info">
        <p>Course Code: {selectedExam.cource_code}</p>
        <p>Exam Date: {selectedExam.exam_date}</p>
        <p>Grade: {selectedExam.grade}</p>
      </div>
      <iframe className="exam-iframe" src={selectedExam.file_data}>
        Tentan
      </iframe>
      <div className="rating">
        <Setstarrating
          rating={selectedExam.rating}
          exam_id={selectedExam.id}
        />
      </div>
      <div className="comments-wrapper">
        <Comments examId={selectedExam.id} userId={cookies.user_id} />
      </div>
    </div>
  );
};

export default ExamDetails;
