import React, { useState } from 'react';
import './starrating.css'

const StarRating = (props) => {
    return (
        <div className="star-rating">
            {[...Array(5)].map((star, index) => {
                index += 1;
                return (
                    <span className={(props.rating >= index) ? "on" : "off"}>&#9733;</span>
                );
            })}
        </div>
    );
};

export default StarRating;