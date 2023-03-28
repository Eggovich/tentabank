import React from 'react';
import { Link } from 'react-router-dom';

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
          <thead>
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
            </thead>

            {/* <h5 className='cards__item__text'>{props.courseCode}</h5> */}
            {/* <h5 className='cards__item__text'>{props.Grade}</h5> */}
          </div>
        </Link>
      </li>
    </>
  );
}

export default CardItemsexam;