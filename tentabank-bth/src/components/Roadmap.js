import React, { useState } from 'react';
import styles from './Roadmap.module.css';

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
    <div className={styles.roadmap_section}>
      <h2 className={styles.roadmap_title}>Roadmap</h2>
      <div className={styles.roadmap_container}>
        {roadmapSteps.map((step, index) => (
          <div
            key={index}
            className={`${styles.roadmap_step} ${index % 2 === 0 ? 'left' : 'right'} ${
              activeStep === step.id ? 'active' : ''
            }`}
            onClick={() => handleStepClick(step.id)}
          >
            <div className={styles.roadmap_step_circle}>{step.id}</div>
            <div className={styles.roadmap_step_title}>{step.title}</div>
            {activeStep === step.id && (
              <div className={styles.roadmap_step_info}>
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
