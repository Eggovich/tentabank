import React from 'react';
import {FaStar} from 'react-icons/fa';
import styles from './Carditemsexam.module.css'
import StarRating from './Starrating';



function CardItemsexam(props) {
  
  return (
    <div className={styles.ag_courses_item}>
      <a href="#" className={styles.ag_courses_item_link}>
        <div className={styles.ag_courses_item_bg}></div>
        <div className={styles.ag_courses_item_title}>
          {props.courseCode.slice(0,1)}{props.courseCode.slice(1,2).toUpperCase()}
        </div>
        <div className={styles.ag_courses_item_date_box}>
          <div className={styles.ag_courses_item_date}>{props.courseCode}</div>
          <span className={styles.ag_courses_item_date}>
            {props.date}
          </span>
          <div className={styles.ag_courses_item_date}>Betyg: {props.grade}</div>
          <StarRating rating={props.rating} exam_id={props.exam_id}/>
        </div>
      </a>
    </div>
  );
}

export default CardItemsexam;