import React from 'react';
import './Cart.css'
import CartProduct from '../CartProduct/CartProduct';
import { useStateValue } from '../context/StateProvider';
import Subtotal from '../Subtotal/Subtotal';

function Cart({show}) {

    const [{ cart, user }, dispatch] = useStateValue()
    

    return (
        <div className="cart">
            <div className="cart__top">
            <div className="cart__left">
              <h1>
                  {user? user.email + "'s cart" : "Guest's Cart"}
              </h1>
            </div>
            <div className="cart__right">

            <Subtotal/>
            </div>
            </div>
            <div className="cart__products">
            {
                cart.map(item => (
                    <CartProduct
                    title={item.title}
                    image={item.image}
                    price={item.price}
                    rating={item.rating}
                    id={item.id}
                    size={item.size}
                    />
                ))
            } 
            </div>
        </div>
    );
}

export default Cart;