import React from 'react';
import '../App.css';
import { Button } from './Button';
import './HeroSection.css';
import video from ".//videos/video-3.mp4"
import img from ".//images/img-4.jpg"

function HeroSection() {
  return (
    <div className='hero-container'>
      <video src={video} autoPlay loop muted />
      <h1>Tentabanken</h1>
      <b className='b'> Sharing is caring</b>
      <div className='hero-btns'>
        <Button
          className='btns'
          buttonStyle='btn--outline'
          buttonSize='btn--large'
        >
          Läs mer om vårt arbete
        </Button>
      </div>
    </div>
  );
}

export default HeroSection;