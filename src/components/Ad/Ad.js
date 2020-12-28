import React from 'react';
import './Ad.css'

function Ad({title, image, url, rating, price}) {
    return (
        <div className="ad">
            <h5>{title}</h5>
            <div className="ad__image">
                <img 
                src={image} 
                alt="Prouduct"
                />
            </div>
            <div className="ad__rating">
                <p>{rating}</p>
            </div>
            <div className="ad__link">
                <p><a href={url} >See price on Amazon</a></p>
            </div>
        </div>
    );
}

export default Ad;