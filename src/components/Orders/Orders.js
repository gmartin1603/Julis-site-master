import React, { useEffect, useState } from 'react';
import './Orders.css'
import {db} from '../firebase/firebase'
import { useStateValue } from '../context/StateProvider';
import Order from '../Order/Order';

function Orders(props) {

    const [{user}, dispatch] = useStateValue()
    const [orders, setOrders] = useState([])

    useEffect(() => {
        if (user) {
            db.collection("users").doc(user.email).collection("orders").orderBy("id", "desc")
            .onSnapshot(snapshot => (
                setOrders(snapshot.docs.map( doc => ({
                    id: doc.id,
                    data: doc.data()
                })))
            ))
            } else {
                setOrders([])
            }
            
    }, [user])
            
    return (
        <div className="orders">
            <h1>Orders</h1>
            <div className="orders__order">
                {
                orders?.map(order => (
                    <Order
                    key={order.id}
                    order={order}
                    />
                    ))
                }
            </div>
        </div>
    );
}

export default Orders;