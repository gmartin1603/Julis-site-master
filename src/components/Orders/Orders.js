import React, { useEffect, useState } from 'react';
import './Orders.css'
import {db} from '../firebase/firebase'
import { useStateValue } from '../context/StateProvider';
import Order from '../Order/Order';

function Orders(props) {

    const [{user, isAdmin}, dispatch] = useStateValue()
    const [orders, setOrders] = useState([])
    const [date, setDate] = useState('na')

    const handleChange = (e) => {
        console.log(e)
        e.toString()
        console.log(e)
        setDate(e)
    }
    

    useEffect(() => {
        if (isAdmin) {
            db.collection("orders").doc("all").collection(date).orderBy("date", "asc")
            .onSnapshot(snapshot => (
                setOrders(snapshot.docs.map( doc => ({
                    id: doc.id,
                    data: doc.data()
                })))
                )) 
            }
            else if (user) {
                db.collection("users").doc(user.email).collection("orders").orderBy("date", "desc")
                .onSnapshot(snapshot => (
                    setOrders(snapshot.docs.map( doc => ({
                        id: doc.id,
                        data: doc.data()
                    })))
                ))
            }
            else {
                setOrders([])
            }
            
    }, [date, user, isAdmin])
            
    return (
        <div className="orders">
            <h1>Orders</h1>
            {
                isAdmin? 
                    <input type="date" onChange={e => handleChange(e.target.value)}/> 
                    :
                    ''
            }
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