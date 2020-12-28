import React from 'react';
import './Order.css'
import CartProduct from '../CartProduct/CartProduct';

function Order({order}) {
    return (
        <div className="order">
            <h3>Order ID: {order.id}</h3>
            <div className="order__items">
                {order.data.cart?.map(item => (
                    <CartProduct
                    key={item.id}
                    id={item.id}
                    title={item.title}
                    image={item.image}
                    price={item.price}
                    rating={item.rating}
                    hideButton
                    />
                    ))}
            </div>
        </div>
    );
}

export default Order;