import React from 'react';
import './Home.css'
import Ads from '../Ads/Ads'
import Products from '../Products/Products'

function Home(props) {
    return (
        <div className="home">
            <div className="home__products">
                <Products/>
            </div>
            
        </div>
    );
}

export default Home;