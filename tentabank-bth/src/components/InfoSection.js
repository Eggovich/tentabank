import React from 'react';
import styles from './InfoSection.module.css';
import checkbox from './bilder/checkbox.png';

const InfoSection = () => {
  const infoItems = [
    {
      image: checkbox,
      text: 'Click on "Start Review". Make sure to check that there are no personal information or other inappropriate content included in the exam.'
    },
    {
      image: checkbox,
      text: 'Decision: If all information is correct and there is nothing inappropriate, check the box confirming the information is correct and then click the "Accept" button.'
    },
    {
      image: checkbox,
      text: 'If the information is not correct or if there are inappropriate information in the exam, write a comment explaining why the exam was denied and then click the "Deny" button.'
    },
    {
      image: checkbox,
      text: 'The next exam will be displayed and you will repeat the same procedure.'
    }
  ];

  return (
    <div className={styles.info_section}>
      <h2 className={styles.section_title}>How to Review an Exam?</h2>
      {infoItems.map((item, index) => (
        <div className={styles.info_item} key={index}>
          <img src={item.image} alt={`Step ${index + 1}`} />
          <div className={styles.info_text}>
            <p><strong>Step {index + 1}:</strong> {item.text}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default InfoSection;
