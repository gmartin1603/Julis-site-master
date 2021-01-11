import React, { useState } from 'react';
import './Product.css'
import {useStateValue} from '../context/StateProvider'
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import { InputLabel } from '@material-ui/core';

function Product({title, image, rating, price, id, size}) {

    const [cartSize, setSize] = useState(null)

    const [{ }, dispatch] = useStateValue()

    const translate = (size) => {
        switch (size) {
            case 0:
                size = "Small"
                break;
            case 1:
                size = "Medium"
                break;
            case 2:
                size = "Large"
                break;
            case 3:
                size = "XL"
                break;
            case 4:
                size = "2XL"
                break;
            case 5:
                size = "3XL"
                break;
            default:
                return null;
                break;
        }
        return size;

    }

    const addToCart = () => {
        dispatch({
            type: "ADD_TO_CART",
            item: {
            id: id,
            title: title,
            image: image,
            price: price,
            rating: rating,
            size: cartSize,
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
                {
                   size ? 
                <div className="price__left">
                    <InputLabel>Size</InputLabel>
                    <Select label='Size' onChange={e => setSize(e.target.value)}>
                        {
                            size.map(item => {
                                item = translate(item)
                                console.log(item)
                                return (
                                    <MenuItem value={item}>{item}</MenuItem>
                                )
                            })
                        }
                    </Select>
                </div>
                    :
                    ''
                }
            <div className="price__right">
                <small>$</small>
                <p>{price}</p>
               </div>
           </div>
           <button onClick={addToCart}>Add to Cart</button>
        </div>
    );
}

export default Product;