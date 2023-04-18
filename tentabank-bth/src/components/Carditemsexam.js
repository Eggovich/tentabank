import React from 'react';
import {FaStar} from 'react-icons/fa';
import styles from './Carditemsexam.module.css'
import StarRating from './Starrating';



function CardItemsexam(props) {
  
  return (
      <div className={styles.master}>        
          <div className={styles.cover}>{props.courseCode.slice(0,1)}{props.courseCode.slice(1,2).toLowerCase()}</div>
          <div className={styles.exam_info}>
            <div className={styles.floor_1}>
              <div className={styles.exam_text}>{props.courseCode}</div>
              <div className={styles.exam_text}>Betyg: {props.grade}</div>
            </div>
            <div className={styles.floor_2}>
              <div className={styles.exam_text}>{props.date}</div>
              <StarRating rating={props.rating} exam_id={props.exam_id}/>
            </div>
          </div>
      </div>
  );
}

export default CardItemsexam;