import React from 'react';
import './Product.css'
import {useStateValue} from '../context/StateProvider'

function Product({title, image, rating, price, id, qoh}) {

    const [{ }, dispatch] = useStateValue()


    const addToCart = () => {
        dispatch({
            type: "ADD_TO_CART",
            item: {
            id: id,
            title: title,
            image: image,
            price: price,
            rating: rating,
            }
        })
    }

    return (
        <div className='product'>
           <div className="product__image">
           <img 
            src={image} 
            alt={title}
            />
           </div>
           <div className="spacer"/>
           <div className="product__title">
               <h5>{title}</h5>
           </div>
           <div className="product__rating">
          {Array(rating)
            .fill()
            .map((_, i) => (
              <p key={i}>⭐</p>
            ))}
        </div>
           <div className="product__price">
               <small>$</small>
               <p>{price}</p>
           </div>
           <button onClick={addToCart}>Add to Cart</button>
        </div>
    );
}

export default Product;