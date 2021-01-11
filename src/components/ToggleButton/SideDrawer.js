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

    const [{user, isAdmin}, dispatch] = useStateValue()

    const handleChange = (e) => {
        setCategory(e.target.value)
    }

    useEffect(() => {
        dispatch({
            type: 'SET_CATEGORY',
            category: category,
        })

    },[dispatch, category])

    if(show) {
        drawerClass = 'side__drawer open'
    }

    return (
        <div className={drawerClass}>
            <h4>PROUDUCT CATEGORIES</h4>
            <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={category}
                onChange={handleChange}
            >
                <MenuItem key="1" value="beauty">Beauty</MenuItem>
                <MenuItem key="2" value="bath">Bath</MenuItem>
                <MenuItem key="3" value="euforia">Euforia</MenuItem>
                <MenuItem key="4" value="games">Games</MenuItem>
                <MenuItem key="5" value="lingerie">Lingerie</MenuItem>
                <MenuItem key="6" value="lubricant">Lubricant</MenuItem>
                <MenuItem key="7" value="vaginalhealth">Vaginal Health</MenuItem>
                <MenuItem key="8" value=""></MenuItem>
            </Select>
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