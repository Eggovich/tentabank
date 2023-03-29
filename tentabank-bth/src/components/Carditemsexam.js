import React from 'react';
import { Link } from 'react-router-dom';
import {FaStar} from 'react-icons/fa';


function CardItemsexam(props) {
  return (
    <>
      <li className='cards__item'>
        <Link className='cards__item__link' to={props.path}>          <figure className='cards__item__pic-wrap' data-category={props.label}>
            <img
              className='cards__item__img'
              alt='Travel Image'
              src={props.src}
            />
          </figure>
          <div className='cards__item__info'>
            <div className='displayStack__1'>
              <div className='cards_item_text'>{props.courseCode}</div>
              <div className='cards_item_text'>Betyg: {props.Grade}</div>
            </div>
            <div className='displayStack__2'>
              <div className='cards_item_text'>{props.Date}</div>
              <div className='productRating'>
                {[...Array(+props.Rating)].map((index) => (
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
        </Link>
      </li>
    </>
  );
}

export default CardItemsexam;