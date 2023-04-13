import React from 'react';
import './PictureTextSection.css';

const PictureTextSection = ({ imagePosition, imageSrc, title, description, altText }) => {
  return (
    <div className={`picture-text-section ${imagePosition}`}>
      <div className="image-container">
        <img src={imageSrc} alt={altText} />
      </div>
      <div className="text-container">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
};

export default PictureTextSection;
