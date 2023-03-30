import React from 'react';
import './Cards.css';
import CardItemsexam from './Carditemsexam';
import img10 from "./bilder/matte.png";


function Cardsexam() {
  return (
    <div className='cards'>
      <div className='cards__container'>
        <div className='cards__wrapper'>
          <ul className='cards__items'>
            <CardItemsexam
              src={img10}
              courseCode='IY1442'
              grade='A'
              rating={2}
              date='2020-05-03'
              label='Ekonomi'
              path='/Browse'
            />
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Cardsexam;