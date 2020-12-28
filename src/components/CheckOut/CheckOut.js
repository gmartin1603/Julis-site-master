import React from 'react';
import { useStateValue } from '../context/StateProvider';
import { PayPalButton } from "react-paypal-button-v2";
import './CheckOut.css'
import { getCartTotal } from '../context/StateReducer';
import {db} from '../firebase/firebase'

function CheckOut(props) {

    const [{cart, user}, dispatch] = useStateValue()

    const removeFromCart = (id) => {
        dispatch({
            type: 'REMOVE_FROM_CART',
            id: id
        })
    }

    return (
        <div className="checkOut">
            <div className="checkOut__info">
                <p>{cart?.length} Items in Order</p>
                <p>Total: ${getCartTotal(cart)} </p>
                <div className="checkOut__paypal">
                    <PayPalButton
                    createOrder={(data, actions) => {
                        return actions.order.create({
                            purchase_units: [{
                                currency_code: "USD",
                                amount: {value: getCartTotal(cart)}
                            }]
                        })
                    }}
                    onApprove={(data, actions) => {
                        return actions.order.capture()
                        .then(() => {
                            console.log(actions)
                            db.collection("users").doc(user?.email).collection("orders").doc(data?.orderID)
                            .set(
                                {
                                    cart: cart,
                                    amount: getCartTotal(cart),
                                    id: data.orderID
                                }
                            ).then(console.log("Order Written!"))
                            
                        })
                    }}
                    />
                </div>
            </div>
            <div className="checkOut__products">
                {
                    cart.map(item => (
                        <div key={item.id} className="item">
                            <span>
                            <h5>{item.title} </h5>
                            <h6>
                                ${item.price}
                            </h6>
                            </span>
                            <button onClick={() => removeFromCart(item.id)}>Remove from Order</button>
                        </div>
                    ))
                }
            </div>
        </div>
    );
}

export default CheckOut;