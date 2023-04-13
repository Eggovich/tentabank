import React, { useState } from 'react';
import './Roadmap.css';

const roadmapSteps = [
  { id: 1, title: 'Create an account' },
  { id: 2, title: 'Upload exams' },
  { id: 3, title: 'Await review' },
  { id: 4, title: 'Three exams accepted' },
  { id: 5, title: 'Browse exams' },
  { id: 6, title: 'Ask questions regarding exams' },
];

const Roadmap = () => {
  const [activeStep, setActiveStep] = useState(null);

  const handleStepClick = (id) => {
    setActiveStep(id === activeStep ? null : id);
  };

  return (
    <div className="roadmap-section">
      <h2 className="roadmap-title">Roadmap</h2>
      <div className="roadmap-container">
        {roadmapSteps.map((step, index) => (
          <div
            key={index}
            className={`roadmap-step ${index % 2 === 0 ? 'left' : 'right'} ${
              activeStep === step.id ? 'active' : ''
            }`}
            onClick={() => handleStepClick(step.id)}
          >
            <div className="roadmap-step-circle">{step.id}</div>
            <div className="roadmap-step-title">{step.title}</div>
            {activeStep === step.id && (
              <div className="roadmap-step-info">
                {/* Add more information about the step here */}
                More information about {step.title}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Roadmap;
