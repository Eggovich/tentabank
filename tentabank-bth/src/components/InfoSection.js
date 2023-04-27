import React from 'react';
import styles from './InfoSection.module.css';
import team2Img from './bilder/simon.jpeg';

const InfoSection = () => {
  const infoItems = [
    {
      image: team2Img,
      text: 'Kolla så att det finns rätt uppgifter.'
    },
    {
      image: team2Img,
      text: 'Beslut: Stämmer uppgifterna, kryssa i checkrutan och godkänn.'
    },
    {
      image: team2Img,
      text: 'Stämmer inte uppgifterna, skriv en kommentar om varför uppgifterna inte stämmer och neka sedan tentan.'
    }
  ];

  return (
    <div className={styles.info_section}>
      <h2 className={styles.section_title}>Hur granskar man en tenta?</h2>
      {infoItems.map((item, index) => (
        <div className={styles.info_item} key={index}>
          <img src={item.image} alt={`Step ${index + 1}`} />
          <div className={styles.info_text}>
            <p><strong>{index + 1}.</strong> {item.text}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default InfoSection;
