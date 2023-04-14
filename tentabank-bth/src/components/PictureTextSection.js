import React from 'react';
import styles from './PictureTextSection.module.css';

const PictureTextSection = ({ imagePosition, imageSrc, title, description, altText }) => {
  return (
    <div className={`${styles.picture_text_section} ${imagePosition}`}>
      <div className={styles.image_container}>
        <img src={imageSrc} alt={altText} />
      </div>
      <div className={styles.text_container}>
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
};

export default PictureTextSection;
