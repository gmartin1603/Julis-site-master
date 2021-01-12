import { MenuItem, Select } from '@material-ui/core';
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useStateValue } from '../context/StateProvider';
import './SideDrawer.css'

function SideDrawer({logOut, show, click}) {
    let drawerClass = 'side__drawer'

    const [category, setCategory] = useState("beauty");
    const [subValue, setSubValue] = useState(9)
    const [value, setValue] = useState(0)

    const [{user, isAdmin}, dispatch] = useStateValue()
    const [subcategory, setSubcategory] = useState('malePleasure')
    const [toys, setToys] = useState(false)

    const handleChange = (newCategory) => {
        
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

    },[dispatch, category, subcategory, toys])

    if(show) {
        drawerClass = 'side__drawer open'
    }


    return (
        <div className={drawerClass}>
            <h4>PROUDUCT CATEGORIES</h4>
            <Select
                value={value}
                onChange={(e) => handleChange(e.target.value)}
            >
                <MenuItem value={0} label="beauty">Beauty</MenuItem> 
                <MenuItem value={1} label="wellness" >Wellness</MenuItem>
                <MenuItem value={2} label="massage" >Massage</MenuItem>
                <MenuItem value={3} label="enhancments" >Enhancments</MenuItem>
                <MenuItem value={13} label="role play" >Role Play</MenuItem>
                <MenuItem value={4} label="toys" >Toys</MenuItem>
                <MenuItem value={5} label="lingerie">Lingerie</MenuItem>
                <MenuItem value={6} label="lubricant">Lubricant</MenuItem>
                <MenuItem value={7} label="vaginal Health">Vaginal Health</MenuItem>
            </Select>
            {
                toys? 
                <Select
                value={subValue}
                onChange={handleChange}
            >
                <MenuItem key={8}value="malePleasure">Male Pleasure</MenuItem>
                <MenuItem key={9} value="clitoral">Clitoral</MenuItem>
                <MenuItem key={10} value="g-spot">G-Spot</MenuItem>
                <MenuItem key={11} value="dual">Dual</MenuItem>
                <MenuItem key={12} value="booty">Booty</MenuItem>
            </Select>
                :
                ''
            }
            <NavLink to="/" onClick={click}>Home</NavLink> 
            <NavLink to="/Videos" onClick={click}>Videos</NavLink>
            <NavLink to="/Review" onClick={click}>Reviews</NavLink> 
            <NavLink to="/Orders" onClick={click}>Orders</NavLink>
            {
                            isAdmin?  
                            <NavLink to="/Admin" onClick={click}>Dashboard</NavLink> : ''
                        }
            {
                user? 
                <NavLink to="/Log In" onClick={logOut}>Log Out</NavLink>
                :
                <NavLink to="/Log In" onClick={click}>Log In</NavLink>
            }
        </div>
    );
}

export default SideDrawer;