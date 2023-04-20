import React, { useState } from 'react';
import styles from './Roadmap.module.css';

const roadmapSteps = [
  { id: 1, class: "one", title: 'Create an account' },
  { id: 2, class: "two", title: 'Upload exams' },
  { id: 3, class: "three", title: 'Await review' },
  { id: 4, class: "four", title: 'Three exams accepted' },
  { id: 5, class: "five", title: 'Browse exams' },
  { id: 6, class: "six", title: 'Ask questions regarding exams' },
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
        <div key={1} className={`${styles.roadmap_step_stort} ${activeStep === 1 ? 'active' : ''}`} onClick={() => handleStepClick(1)}> 
          <div className={styles.circle_one}>1</div>
          <div className={styles.roadmap_step_title}>{roadmapSteps[0].title}</div>
          {activeStep === 1 && (
            <div className={styles.roadmap_step_info}>
              {/* Add more information about the step here */}
              More information about {roadmapSteps[0].title}
            </div>
          )}
          </div>
        <div key={2} className={`${styles.roadmap_step_right} ${activeStep === 2 ? 'active' : ''}`} onClick={() => handleStepClick(2)}> 
          <div className={styles.circle_two}>2</div>
          <div className={styles.roadmap_step_title}>{roadmapSteps[1].title}</div>
          {activeStep === 2 && (
            <div className={styles.roadmap_step_info}>
              {/* Add more information about the step here */}
              More information about {roadmapSteps[1].title}
            </div>
          )}
        </div>
        <div key={3} className={`${styles.roadmap_step_left} ${activeStep === 3 ? 'active' : ''}`} onClick={() => handleStepClick(3)}> 
          <div className={styles.circle_three}>3</div>
          <div className={styles.roadmap_step_title}>{roadmapSteps[2].title}</div>
          {activeStep === 3 && (
            <div className={styles.roadmap_step_info}>
              {/* Add more information about the step here */}
              More information about {roadmapSteps[2].title}
            </div>
          )}
        </div>
        <div key={4} className={`${styles.roadmap_step_right} ${activeStep === 4 ? 'active' : ''}`} onClick={() => handleStepClick(4)}> 
          <div className={styles.circle_four}>4</div>
          <div className={styles.roadmap_step_title}>{roadmapSteps[3].title}</div>
          {activeStep === 4 && (
            <div className={styles.roadmap_step_info}>
              {/* Add more information about the step here */}
              More information about {roadmapSteps[3].title}
            </div>
          )}
        </div>
        <div key={1} className={`${styles.roadmap_step_left} ${activeStep === 5 ? 'active' : ''}`} onClick={() => handleStepClick(5)}> 
          <div className={styles.circle_five}>5</div>
          <div className={styles.roadmap_step_title}>{roadmapSteps[4].title}</div>
          {activeStep === 5 && (
            <div className={styles.roadmap_step_info}>
              {/* Add more information about the step here */}
              More information about {roadmapSteps[4].title}
            </div>
          )}
        </div>
        <div key={6} className={`${styles.roadmap_step_stort} ${activeStep === 6 ? 'active' : ''}`} onClick={() => handleStepClick(6)}> 
          <div className={styles.circle_six}>6</div>
          <div className={styles.roadmap_step_title}>{roadmapSteps[5].title}</div>
          {activeStep === 6 && (
            <div className={styles.roadmap_step_info}>
              {/* Add more information about the step here */}
              More information about {roadmapSteps[5].title}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Roadmap;
