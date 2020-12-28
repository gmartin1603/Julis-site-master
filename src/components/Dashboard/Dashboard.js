import React, { useState } from 'react';
import './Dashboard.css'
import {db} from '../firebase/firebase'
import { useStateValue } from '../context/StateProvider';

function Dashboard(props) {

    const [{ products, category }, dispatch] = useStateValue()

    const [id, setId] = useState('')
    const [upId, setUpId] = useState('')
    const [upQuantity, setUpQuantity] = useState(null)
    const [quantity, setQuantity] = useState(null)
    const [name, setName] = useState('')
    const [image, setImage] = useState('')
    const [price, setPrice] = useState(null)
    const [rating, setRating] = useState(null)
    const [_category, setCategory] = useState(null)
    const [variation, setVariation] = useState(null)

    const clearForm = () => {
        setId('')
        setUpId('')
        setUpQuantity(null)
        setQuantity(null)
        setName('')
        setImage('')
        setPrice(null)
        setRating(null)
    }

    const setInventory = (value) => {
        dispatch({
            type: 'SET_CATEGORY',
            category: value
        })
    }

    const addProduct = (e) => {
        e.preventDefault()
        db.collection("products").doc(_category).collection("all").doc(id).set({
            name,
            QOH: Number(quantity),
            img: image,
            price: Number(price),
            rating: Number(rating),
            id,
            category: _category,
            variation,
        }).then(() => {
            console.log("document written")
            clearForm()
        })
        .catch(error => alert(error))
        
    }

    const updateQuantity = (e) => {
        e.preventDefault()
        db.collection("products").doc(category).collection("all").doc(upId).update({
            QOH: upQuantity
        })
        .then(() => {
            console.log("QOH Updated")
            clearForm()
            setInventory('blank')
            setInventory(category)
        })
        .catch(error => alert(error))
    } 
    return (
        <div className="dashboard">
            <form 
            className="dashboard__addForm"
            action="Add Product">
                <h3>Add Product to Database</h3>
                <div className="dashbord__input">
                <h5>Product Id:</h5>
                <input type="text" value={id} onChange={(e) => setId(e.target.value)} />
                </div>
                <div className="dashbord__input">
                <h5>Product Catagory:</h5>
                <select type="text" value={_category} onChange={(e) => setCategory(e.target.value)} >
                    <option value={null}>Select</option>
                    <option value="lingerie">Lingerie</option>
                    <option value="beauty">Beauty</option>
                    <option value="bath">Bath</option>
                    <option value="games">Games</option>
                    <option value="lubricant">Lubricant</option>
                    <option value="gift">Gift</option>
                    <option value="euforia">Euforia</option>
                    <option value="vaginalHealth">Vaginal Health</option>
                </select>
                </div>
                <div>
                <h5>Product Variation:</h5>
                <select type="text" onChange={(e) => setVariation(e.target.value)} >
                    <option value={null}>None</option>
                    <option value="small">Small</option>
                    <option value="medium">Medium</option>
                    <option value="large">Large</option>
                    <option value="1xl">1XL</option>
                    <option value="2xl">2XL</option>
                    <option value="3xl">3XL</option>
                    <option value="4oz">4oz</option>
                    <option value="8oz">8oz</option>
                </select>
                </div>
                <div className="dashbord__input">
                <h5>Quantity on hand:</h5>
                <input type="number" value={quantity} onChange={(e) => setQuantity(e.target.value)}/>
                </div>
                <div className="dashbord__input">
                <h5>Name:</h5>
                <input type="text" value={name} onChange={(e) => setName(e.target.value)}/>
                </div>
                <div className="dashbord__input">
                <h5>Image:</h5>
                <input type="text" value={image} onChange={(e) => setImage(e.target.value)}/>
                </div>
                <div className="dashbord__input">
                <h5>Price:</h5>
                <input type="number" value={price} onChange={(e) => setPrice(e.target.value)}/>
                </div>
                <div className="dashbord__input">
                <h5>Rating:</h5>
                <input type="number" value={rating} onChange={(e) => setRating(e.target.value)}/>
                </div>
                <button type="submit" onClick={addProduct}>Add Product</button>
            </form>
            <form
            className="dashboard__modifyForm" 
            action="Modify Inventory">
                <h3>Modify Quantity on hand</h3>
                <div className="dashbord__input">
                <h5>Product Id:</h5>
                <input type="text" value={upId} onChange={(e) => setUpId(e.target.value)}/>
                </div>
                <div className="dashbord__input">
                <h5>New QOH:</h5>
                <input type="number" value={upQuantity} onChange={(e) => setUpQuantity(e.target.value)}/>
                </div>
                <button type="submit" onClick={updateQuantity}>Update Quantity</button>
            </form>
            <div className="dashboard__inventory">
                <div className="dashbord__category">
                <select name="category" onChange={(e)=> setInventory(e.target.value)}>
                    <option value="beauty">Beauty</option>
                    <option value="bath">Bath</option>
                    <option value="euforia">Euforia</option>
                    <option value="games">Games</option>
                    <option value="lingerie">Lingerie</option>
                    <option value="lubricant">Lubricant</option>
                    <option value="vaginalHealth">Vaginal Health</option>
                </select>
                </div>
                {
                    products?.map(product => 
                         (
                            <div 
                            key={product.id}
                            calssName="dashboard__product">
                                <h4>{product.name}</h4>
                                <p>Id: {product.id}</p>
                                <p>QOH: <strong>{product.QOH}</strong></p>
                            </div>
                        )
                    )
                }
            </div>
        </div>
    );
}

export default Dashboard;