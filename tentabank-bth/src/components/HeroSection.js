import React from 'react';
import '../App.css';
import { Button } from './Button';
import './HeroSection.css';
import video from ".//videos/video-2.mp4"

function HeroSection() {
  return (
    <div className='hero-container'>
      <video src={video} autoPlay loop muted />
      <h1>Tentabanken</h1>
      <p>Sharing is caring!</p>
      <div className='hero-btns'>
        <Button
          className='btns'
          buttonStyle='btn--outline'
          buttonSize='btn--large'
        >
          Om oss
        </Button>
        <Button
          className='btns'
          buttonStyle='btn--primary'
          buttonSize='btn--large'
          onClick={console.log('hey')}
        >
          Kolla Trailer <i className='far fa-play-circle' />
        </Button>
      </div>
    </div>
  );
}

export default HeroSection;