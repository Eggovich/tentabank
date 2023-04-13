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
        <h2 className='slogan'>Sharing is caring</h2>
        <div className='hero-btns'>
          <Button
            className='btns'
            buttonStyle='btn--outline'
            buttonSize='btn--large'
          >
            About Us
          </Button>
        </div> 
      {!cookies.loggedIn && <LoginForm></LoginForm>}
      </div>
      <div className="svg"></div>
    </div>
  );
}

export default HeroSection;
