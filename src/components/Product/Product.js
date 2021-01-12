import React, { useState } from 'react';
import './Product.css'
import {useStateValue} from '../context/StateProvider'
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import { InputLabel } from '@material-ui/core';

function Product({title, image, rating, price, id, size}) {

    const [disabled, setDisabled] = useState(size? true : false)

    const [{ }, dispatch] = useStateValue()

    const translate = (size) => {
        switch (parseInt(size)) {
            case "None":
                size = "None"
                break;
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
                
        }
        return size;

    }

    const [cartSize, setSize] = useState(translate())

    const handleChange = (e) => {
        setSize(e.target.value)
        if (e.target.value === "None") {
            setDisabled(true)
        }
        else {
            setDisabled(false)
        }
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
                    <InputLabel className="select">Size </InputLabel>
                    <Select id="sizeCheck" className="select" label='Size' defaultValue="None" onChange={e => handleChange(e)}>
                        <MenuItem value="None">Select</MenuItem> 
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
           <button onClick={addToCart} disabled={disabled}>Add to Cart</button>
        </div>
    );
}

export default Product;