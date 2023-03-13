import React from 'react';
import './Cards.css';
import CardItem from './Carditems';
import img10 from "./bilder/matte.png";
import img2 from "./bilder/fysik.png";
import img3 from "./bilder/tenta.png"
import img4 from "./bilder/signup-icon.png";
import img5 from "./bilder/omoss.png";

function Cards() {
  return (
    <div className='cards'>
      <h1 className='subtitle'>Kolla vårt utbud av tentor!</h1>
      <div className='cards__container'>
        <div className='cards__wrapper'>
          <ul className='cards__items'>
            <CardItem
              src={img10}
              text='Sätt Stefan på plats genom att acea tentan!'
              label='Matte'
              path='/Browse'
            />
            <CardItem
              src={img2}
              text='"Hihi, tentan är ju inte svår" - Mattias'
              label='Fysik'
              path='/Browse'
            />
          </ul>
          <ul className='cards__items'>
            <CardItem
              src={img3}
              text='Bidra till tentabanken genom att ladda upp en tenta!'
              label='Ladda upp'
              path='/upload'
            />
            <CardItem
              src={img4}
              text='Skapa ett konto!'
              label='Konto'
              path='/profile'
            />
            <CardItem
              src={img5}
              text='Kolla in vårt arbete och vilka vi är'
              label='Om oss'
              path='/about'
            />
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Cards;