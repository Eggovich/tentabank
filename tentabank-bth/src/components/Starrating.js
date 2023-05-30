import React, { useState } from 'react';
import styles from './starrating.module.css'

const StarRating = (props) => {
    return (
        <div>
            {[...Array(5)].map((star, index) => {
                index += 1;
                return (
                    <span key={props.exam_id + ":" + index} className={(props.rating >= index) ? styles.on : styles.off}>&#9733;</span>
                );
            })}
        </div>
    );
};

export default StarRating;