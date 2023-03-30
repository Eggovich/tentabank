import React from 'react';
import {FaStar} from 'react-icons/fa';
import './Carditemsexam.css'


function CardItemsexam(props) {
  return (
      <div className='master'>        
          <figure className='fig' data-category={props.label}>
            <img
              className='image'
              alt='Travel Image'
              src={props.src}
            />
          </figure>
          <div className='exam_info'>
            <div className='floor_1'>
              <div className='exam_text'>{props.courseCode}</div>
              <div className='exam_text'>Betyg: {props.grade}</div>
            </div>
            <div className='floor_2'>
              <div className='exam_text'>{props.date}</div>
              <div className='productRating'>
                {[...Array(+props.rating)].map((index) => (
                  <FaStar id={index + 1 } key={index} />
                ))}
              </div>
            </div>
          {/*<thead>
              <tr>
                <th><h5 className='cards__item__text'>{props.courseCode}</h5></th>
                <th><h5 className='cards__item__text'>{props.Grade}</h5></th>
              </tr>
            </thead>
            <thead>
              <tr>
                <th><h5 className='cards__item__text'>{props.Date}</h5></th>
                <th><h5 className='cards__item__text'>{props.Rating}</h5></th>
              </tr>
  </ thead>*/}

            {/* <h5 className='cards__item__text'>{props.courseCode}</h5> */}
            {/* <h5 className='cards__item__text'>{props.Grade}</h5> */}
          </div>
      </div>
  );
}

export default CardItemsexam;