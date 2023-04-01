import React from 'react';
import '../App.css';
import { Button } from './Button';
import './HeroSection.css';
import LoginForm from './loginForm.js';
import { useCookies } from 'react-cookie';


function HeroSection() {
  const [cookies, setCookie] = useCookies(["User"])
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
      {!cookies.loggedIn && <LoginForm></LoginForm>}
      </div>
     
    </div>
  );
}

export default HeroSection;
