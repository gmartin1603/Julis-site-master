import { Tab, Tabs } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { useStateValue } from '../context/StateProvider';
import Product from '../Product/Product'
import './Products.css'

function Products(props) {

    const [{products}, dispatch] = useStateValue()

    const [category, setCategory] = useState("beauty")
    const [value, setValue] = useState(0)
    const [subValue, setSubValue] = useState(8)
    const [toys, setToys] = useState(false)
    const [subcategory, setSubcategory] = useState('malePleasure')

    useEffect(() => {
        if(category === "toys"){
            dispatch({
                type: 'SET_CATEGORY',
                category: subcategory
            })
        }
        else {
            dispatch({
                type: 'SET_CATEGORY',
                category: category,
            })
        }
    },[dispatch, category, toys, subcategory])

    const handleChange = (event, newCategory) => {
        switch(newCategory) {
            case 1:
                setCategory("wellness")
                setValue(1)
                setToys(false)
                break;
            case 2:
                setCategory("massage")
                setValue(2)
                setToys(false)
                break;
            case 3:
                setCategory("enhancments")
                setValue(3)
                setToys(false)
                break;
            case 4:
                setCategory("toys")
                setValue(4)
                setToys(true)
                break;
            case 6:
                setCategory("lubricant")
                setValue(6)
                setToys(false)
                break;
            case 5:
                setCategory("lingerie")
                setValue(5)
                setToys(false)
                break;
            case 7:
                setCategory("vaginalHealth")
                setValue(7)
                setToys(false)
                break;
            case 13:
                setCategory("rolePlay")
                setValue(13)
                setToys(false)
                break;
            case 8:
                setSubcategory("malePleasure")
                setSubValue(8)
                break;
            case 9:
                setSubcategory("clitoral")
                setSubValue(9)
                break;
            case 10:
                setSubcategory("gSpot")
                setSubValue(10)
                break;
            case 11:
                setSubcategory("dual")
                setSubValue(11)
                break;
            case 12:
                setSubcategory("booty")
                setSubValue(12)
                break;
            default:
                setCategory("beauty")
                setValue(0)
                setToys(false)
        } 
    }

    return (
        <div className="products">
            <div className="products__category">
                <h2>Browse products by category</h2>
                <Tabs value={value} onChange={handleChange} aria-label="simple tabs example">
                    <Tab value={0} label="beauty" /> 
                    <Tab value={1} label="wellness" />
                    <Tab value={2} label="massage" />
                    <Tab value={3} label="enhancments" />
                    <Tab value={13} label="role play" />
                    <Tab value={4} label="toys"/>
                    <Tab value={5} label="lingerie"/>
                    <Tab value={6} label="lubricant"/>
                    <Tab value={7} label="vaginal Health"/>
                </Tabs>
                {
                    toys? 

                    <Tabs value={subValue} onChange={handleChange} aria-label="simple tabs example">
                    <Tab value={8} label="male pleasure" /> 
                    <Tab value={9} label="clitoral" /> 
                    <Tab value={10} label="g-spot" /> 
                    <Tab value={11} label="dual" /> 
                    <Tab value={12} label="booty" /> 
                </Tabs>
                    :
                    ''
                }
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
                    size={item.size}
                    />
                    ))
                }
            </div>
        </div>
    );
}

export default Products;