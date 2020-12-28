import { Tab, Tabs } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { useStateValue } from '../context/StateProvider';
import Product from '../Product/Product'
import './Products.css'

function Products(props) {

    const [{products}, dispatch] = useStateValue()

    const [category, setCategory] = useState("beauty")
    const [value, setValue] = useState(0)

    useEffect(() => {
        dispatch({
            type: 'SET_CATEGORY',
            category: category,
        })
    },[dispatch, category])

    const handleChange = (event, newCategory) => {
        switch(newCategory) {
            case 1:
                setCategory("bath")
                setValue(1)
                break;
            case 2:
                setCategory("euforia")
                setValue(2)
                break;
            case 3:
                setCategory("games")
                setValue(3)
                break;
            case 4:
                setCategory("lingerie")
                setValue(4)
                break;
            case 5:
                setCategory("lubricant")
                setValue(5)
                break;
            case 6:
                setCategory("vaginalHealth")
                setValue(6)
                break;
            default:
                setCategory("beauty")
                setValue(0)
        } 
    }

    return (
        <div className="products">
            <div className="products__category">
                <h2>Browse products by category</h2>
                <Tabs value={value} onChange={handleChange} aria-label="simple tabs example">
                    <Tab label="beauty" />
                    <Tab label="bath" />
                    <Tab label="euforia" />
                    <Tab label="games"/>
                    <Tab label="lingerie"/>
                    <Tab label="lubricant"/>
                    <Tab label="vaginal Health"/>
                </Tabs>
        </div>
            <div className="products__items">
            {
                products?.map(item => (
                    <Product
                    key={item.id}
                    id={item.id}
                    title={item.name}
                    image={item.img}
                    price={item.price}
                    rating={item.rating}
                    category={item.catagory}
                    qoh={item.QOH}
                    />
                    ))
                }
            </div>
        </div>
    );
}

export default Products;