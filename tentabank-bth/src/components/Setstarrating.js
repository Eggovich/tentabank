import React, { useState } from 'react';
import { useCookies } from 'react-cookie';
import styles from './starrating.module.css'

const Setstarrating = (props) => {
    const [cookies, setCookies] = useCookies(['User'])
    const [rating, setRating] = useState(props.rating);
    const [hover, setHover] = useState(0);
    function handleRating (rating) {
        const Formdata = new FormData()
        Formdata.append('rating', rating)
        Formdata.append('exam_id', props.exam_id)
        Formdata.append('user_id', cookies.user_id)
        fetch("http://localhost:5000/update_rating", {
            method: "POST",
            body: Formdata,
          })
          .then((res) => res.json())
          .then((data) => {
            setRating(data.rating)
          })
    }
    return (
        <div>
            {[...Array(5)].map((star, index) => {
                index += 1;
                return (
                    <button
                        type="button"
                        key={index}
                        className={index <= (hover || rating) ? styles.on : styles.off}
                        onClick={() => handleRating(index)}
                        onMouseEnter={() => setHover(index)}
                        onMouseLeave={() => setHover(rating)}
                    >
                        <span className="star">&#9733;</span>
                    </button>
                );
            })}
        </div>
    );
};

export default Setstarrating;