import React from 'react';
import '../App.css';
import { Button } from './Button';
import styles from './HeroSection.module.css';
import LoginForm from './loginForm.js';
import { useCookies } from 'react-cookie';

function HeroSection() {
  const [cookies, setCookie] = useCookies(["User"])
  return (
    <div className={styles.hero_container}>
      <div className={styles.content_container}>
        <h1 className={styles.title}>Tentabanken</h1>
        <h2 className={styles.slogan}>Sharing is caring</h2>
        <div className={styles.hero_btns}>
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
    </div>
  );
}

export default HeroSection;
