import React from 'react';
import './Order.css'
import CartProduct from '../CartProduct/CartProduct';

function Order({order}) {
    console.log(isNaN(order.data.date.toString()))
    let date = new Date(order.data.date)
    let month = date.getMonth() + 1 
    let day = date.getDate()
    let year = date.getFullYear()
    let minutes = date.getMinutes()
    let hours = date.getHours()

    const formatTime = () => {
        if (minutes < 10) {
            return (
                `${hours}:0${minutes}`
            )
        }
        else {
            return (
                `${hours}:${minutes}`
            )}
    }

    return (
        <div className="order">
            <h3>Order Date: {`${month}-${day}-${year} at ${formatTime()}`}</h3>
            <h5>Order ID: {order.data.id}</h5>
            
            <div className="order__items">
                {order.data.cart?.map(item => (
                    <CartProduct
                    key={item.id}
                    id={item.id}
                    title={item.title}
                    image={item.image}
                    price={item.price}
                    rating={item.rating}
                    size={item.size}
                    hideButton
                    />
                    ))}
            </div>
        </div>
    );
}

export default Order;