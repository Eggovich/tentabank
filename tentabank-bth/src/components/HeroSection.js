import React from 'react';
import '../App.css';
import { Button } from './Button';
import './HeroSection.css';


function HeroSection() {
  return (
    <div className='hero-container'>
      <div className='content-container'>
        <h1 className='title'>Tentabanken</h1>
        <b className='b'>Sharing is caring</b>
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
      <div className='login-container'>
        <h2 className='login-title'>Logga in</h2>
        <form className='login-form'>
          <input
            type='email'
            placeholder='Email'
            className='login-input'
          />
          <input
            type='password'
            placeholder='Lösenord'
            className='login-input'
          />
          <button type='submit' className='login-submit'>
            Logga in
          </button>
        </form>
      </div>
    </div>
  );
}

export default HeroSection;
