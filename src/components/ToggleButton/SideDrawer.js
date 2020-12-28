import React from 'react';
import { NavLink } from 'react-router-dom';
import { useStateValue } from '../context/StateProvider';
import './SideDrawer.css'

function SideDrawer({logOut, show, click}) {
    let drawerClass = 'side__drawer'

    const [{user, isAdmin}, dispatch] = useStateValue()

    if(show) {
        drawerClass = 'side__drawer open'
    }

    return (
        <div className={drawerClass}>
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