import React from 'react';
import styles from './InfoSection.module.css';
import checkbox from './bilder/checkbox.png';

const InfoSection = () => {
  const infoItems = [
    {
      image: checkbox,
      text: 'Klicka på "Börja granska tentor". Kontrollera noga att det inte finns någon personlig information eller annat olämpligt innehåll inkluderat i tentan.'
    },
    {
      image: checkbox,
      text: 'Beslut: Om all information är korrekt och det inte finns något olämpligt, kryssa i rutan som bekräftar att informationen är korrekt och klicka sedan på "Godkänn tenta"-knappen.'
    },
    {
      image: checkbox,
      text: 'Om informationen inte är korrekt eller om det finns olämplig information i tentan, skriv en kommentar som förklarar varför tentan nekades och klicka sedan på "Neka tenta"-knappen.'
    },
    {
      image: checkbox,
      text: 'Nästa tenta kommer att visas och du upprepar samma procedur.'
    },
    {
      image: checkbox,
      text: 'Om det inte finns fler tentor att granska, kommer ett meddelande att visas för att informera dig om detta.'
    },
    {
      image: checkbox,
      text: 'Kom ihåg att ditt beslut är slutgiltigt. Var noga med att du har all nödvändig information innan du godkänner eller nekar en tenta.'
    }
  ];


  return (
    <div className={styles.info_section}>
      <h2 className={styles.section_title}>How to Review an Exam?</h2>
      {infoItems.map((item, index) => (
        <div className={styles.info_item} key={index}>
          <img src={item.image} alt={`Step ${index + 1}`} />
          <div className={styles.info_text}>
            <p><strong>Steg {index + 1}:</strong> {item.text}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default InfoSection;
