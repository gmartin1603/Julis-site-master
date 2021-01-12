import React from 'react';
import { useStateValue } from '../context/StateProvider';
import { PayPalButton } from "react-paypal-button-v2";
import './CheckOut.css'
import { getCartTotal } from '../context/StateReducer';
import {db} from '../firebase/firebase'
import { useHistory } from 'react-router-dom';

function CheckOut(props) {

    const history = useHistory()

    const [{cart, user}, dispatch] = useStateValue()
    let timestamp = Date.now()
    let date = new Date(timestamp)
    let month = (date.getMonth() + 1)
    let day = date.getDate().toString()
    let year = date.getFullYear().toString()
    let minutes = date.getMinutes().toString()
    let hours = date.getHours().toString()
    
    const formatDate = () => {
        console.log(month)
        if (month < 10) {
            return (
                `${year}-${"0" + month}-${day}`
            )
        }
        else {
            return (
                `${year}-${month}-${day}`
            )
        }
    }

    

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
                            console.log(data, actions)
                            db.collection("users").doc(user?.email).collection("orders").doc(`${month}-${day}-${year} ${hours}:${minutes}`).set(
                                {
                                    cart: cart,
                                    amount: getCartTotal(cart),
                                    id: data.orderID,
                                    date: Date.now()
                                }
                            ).then(() => {
                                db.collection("orders").doc("all").collection(formatDate()).doc(data.orderID).set(
                                {
                                    cart: cart,
                                    amount: getCartTotal(cart),
                                    id: data.orderID,
                                    date: Date.now()
                                }
                            ).then(history.push('./Orders'))})
                            
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