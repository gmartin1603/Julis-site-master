import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import ToggleButton from '../ToggleButton/ToggleButton';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import FacebookIcon from '@material-ui/icons/Facebook';
import InstagramIcon from '@material-ui/icons/Instagram';
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import './Toolbar.css'
import { useStateValue } from '../context/StateProvider';

function Toolbar({logOut, handleDrawerClick, handleCartClick}) {

    const [{cart, isAdmin, user}, dispatch] = useStateValue()

    return (
        <div className="toolbar">
            <header className="toolbar">
                <nav className="toolbar__navigation">
                    <div className="toggle__button">
                        <ToggleButton click={handleDrawerClick}/>
                    </div>
                    <div className="toolbar__logo">
                        <Link to="/">
                            <img src="https://i.ibb.co/DKsMXnh/logo-transparent.png" alt="Logo"/>
                        </Link>
                            <img 
                                id='paypal'
                                src="https://cdn.shopify.com/s/files/1/2005/6615/files/Webp.net-resizeimage_large.png?v=1501670750" 
                                alt="Paypal Logo"
                            />
                        
                    </div>
                    <div className="toolbar__navigation__items">
                        <NavLink to="/">Home</NavLink> 
                        {
                            isAdmin?  
                            <NavLink to="/Admin">Dashboard</NavLink> : ''
                        }
                        <NavLink to="/Orders">Orders</NavLink>
                        {
                            user? 
                            <NavLink to="/Log In" onClick={logOut}>Log Out</NavLink>
                            : 
                            <NavLink to="/Log In">Log In</NavLink> 
                        } 
                    {
                        isAdmin? '' :

                        <div className="toolbar__cart" onClick={handleCartClick}>
                            <a href=""><FacebookIcon/></a>
                            <a href=""><InstagramIcon/></a>
                            <a href=""><MailOutlineIcon/></a>
                            <Link to="/cart">
                                    <ShoppingCartIcon/>
                                    <p>{cart.length}</p>
                            </Link>
                        </div>
                    }
                    </div>
                </nav>
            </header>
        </div>
    );
}

export default Toolbar;