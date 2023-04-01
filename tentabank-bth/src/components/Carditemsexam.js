import React from 'react';
import {FaStar} from 'react-icons/fa';
import './Carditemsexam.css'
import StarRating from './Starrating';



function CardItemsexam(props) {
  
  return (
      <div className='master'>        
          <div className="cover">{props.courseCode.slice(0,1)}{props.courseCode.slice(1,2).toLowerCase()}</div>
          <div className='exam_info'>
            <div className='floor_1'>
              <div className='exam_text'>{props.courseCode}</div>
              <div className='exam_text'>Betyg: {props.grade}</div>
            </div>
            <div className='floor_2'>
              <div className='exam_text'>{props.date}</div>
              <StarRating rating={props.rating} exam_id={props.exam_id}/>
            </div>
          </div>
      </div>
  );
}

export default CardItemsexam;