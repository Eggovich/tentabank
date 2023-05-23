import React, { useState } from 'react';
import styles from './Roadmap.module.css';

const roadmapSteps = [
  { id: 1, class: "one", title: 'Skapa ett konto' },
  { id: 2, class: "two", title: 'Ladda upp tentor' },
  { id: 3, class: "three", title: 'Vänta på granskning' },
  { id: 4, class: "four", title: 'Tre tentor har blivet accepterade' },
  { id: 5, class: "five", title: 'Utforska tentalösningar' },
  { id: 6, class: "six", title: 'Ställ frågor' },
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
              Skapa ditt konto med hjälp av din skol mejl.
            </div>
          )}
          </div>
        <div key={2} className={`${styles.roadmap_step_right} ${activeStep === 2 ? 'active' : ''}`} onClick={() => handleStepClick(2)}> 
          <div className={styles.circle_two}>2</div>
          <div className={styles.roadmap_step_title}>{roadmapSteps[1].title}</div>
          {activeStep === 2 && (
            <div className={styles.roadmap_step_info}>
              {/* Add more information about the step here */}
              Ladda upp dina gamla tentor, du kan ladda upp alla typer av tentor oavsett betyg. 
              Oroa dig inte för att någon ska se att det är din tenta, för alla tentor är annonyma.
            </div>
          )}
        </div>
        <div key={3} className={`${styles.roadmap_step_left} ${activeStep === 3 ? 'active' : ''}`} onClick={() => handleStepClick(3)}> 
          <div className={styles.circle_three}>3</div>
          <div className={styles.roadmap_step_title}>{roadmapSteps[2].title}</div>
          {activeStep === 3 && (
            <div className={styles.roadmap_step_info}>
              {/* Add more information about the step here */}
              Vänta på att dina tentor ska bli godkända av våra granskare. Detta steg finns för att vi ska kunna garantera en hög kvalitet på alla våra tentor.
            </div>
          )}
        </div>
        <div key={4} className={`${styles.roadmap_step_right} ${activeStep === 4 ? 'active' : ''}`} onClick={() => handleStepClick(4)}> 
          <div className={styles.circle_four}>4</div>
          <div className={styles.roadmap_step_title}>{roadmapSteps[3].title}</div>
          {activeStep === 4 && (
            <div className={styles.roadmap_step_info}>
              {/* Add more information about the step here */}
              Du har fått tre tentor godkända! Nu har du grundbehörighet att utforska andras lösningar.
            </div>
          )}
        </div>
        <div key={1} className={`${styles.roadmap_step_left} ${activeStep === 5 ? 'active' : ''}`} onClick={() => handleStepClick(5)}> 
          <div className={styles.circle_five}>5</div>
          <div className={styles.roadmap_step_title}>{roadmapSteps[4].title}</div>
          {activeStep === 5 && (
            <div className={styles.roadmap_step_info}>
              {/* Add more information about the step here */}
              Nu kan du utforksa andras lösningar genom att navigera till "Blädra", där du kan söka, filterara och sortera på önskad tenta.
            </div>
          )}
        </div>
        <div key={6} className={`${styles.roadmap_step_stort} ${activeStep === 6 ? 'active' : ''}`} onClick={() => handleStepClick(6)}> 
          <div className={styles.circle_six}>6</div>
          <div className={styles.roadmap_step_title}>{roadmapSteps[5].title}</div>
          {activeStep === 6 && (
            <div className={styles.roadmap_step_info}>
              {/* Add more information about the step here */}
              Ställ frågor om en tenta genom att kommentera under tentan. Då ger du möjligheten till andra användare att hjälpa dig förstå någon annans lösningen eller lärarens bedömmning.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Roadmap;
