import React, { useEffect, useState } from 'react';
import './App.css';
import { Route, Switch } from 'react-router-dom';
import ToolBar from './Toolbar/Toolbar'
import BackDrop from './BackDrop/BackDrop';
import SideDrawer from './ToggleButton/SideDrawer';
import Home from './Home/Home';
import Cart from './Cart/Cart';
import { useStateValue } from './context/StateProvider';
import LogIn from './LogIn/LogIn';
import Dashboard from './Dashboard/Dashboard'
import {auth, db} from './firebase/firebase'
import CheckOut from './CheckOut/CheckOut';
import Orders from './Orders/Orders';


function App() {
  let backDrop = null

  const [drawerOpen, setDrawerOpen] = useState(false)
  const [cartOpen, setCartOpen] = useState(false)

  const [{cart, isAdmin, category}, dispatch] = useStateValue()

  let products = []

  useEffect(() => {
    auth.onAuthStateChanged(user => {
      if (user?.uid === "llTfkhnbjJPyD5XuTm6iptZGS4h1") {
        dispatch({
          type: 'SET_USER',
          user,
          admin: true
        })
      } else if (user) {
        dispatch({
          type: 'SET_USER',
          user,
          admin: false
        })
      } else (
        dispatch({
          type: 'SET_USER',
          user: null,
          admin: false
        })
      )
    })
  }, [isAdmin])

  useEffect(() => {
    db.collection("products").doc(category).collection("all").get().then((querySnapshot) => {
      querySnapshot.forEach(doc => {
        products.push(doc.data())
        dispatch({
          type: 'SET_PRODUCTS',
          products
        })
      })
    })
  }, [category])
  
  const handleDrawerClick = () => {
    setDrawerOpen(!drawerOpen)
  }

  const handleCartClick = () => {
    if (cart.length > 0) {
      setCartOpen(!cartOpen)
    } else {
      setCartOpen(false)
    }
  }

  const backDropClick = () => {
    setDrawerOpen(false)
  }
  const logOut = () => {
    auth.signOut()
    setDrawerOpen(false)
    console.log("logged out")
  }

  if (drawerOpen) {
    backDrop = <BackDrop click={backDropClick}/>
  }
  return(
    <div className="App">
      <Switch>
        <Route exact path="/Cart">
          <ToolBar 
          logOut={logOut}
          handleDrawerClick={handleDrawerClick}
          handleCartClick={handleCartClick}
          />
          <SideDrawer
          logOut={logOut} 
          show={drawerOpen}
          click={backDropClick}
          />
          {backDrop}
          <Cart/>
        </Route>
        <Route exact path="/Orders">
          <ToolBar 
          logOut={logOut}
          handleDrawerClick={handleDrawerClick}
          handleCartClick={handleCartClick}
          />
          <SideDrawer
          logOut={logOut} 
          show={drawerOpen}
          click={backDropClick}
          />
          {backDrop}
          <Orders/>
        </Route>
        <Route exact path="/CheckOut">
          <ToolBar 
          logOut={logOut}
          handleDrawerClick={handleDrawerClick}
          handleCartClick={handleCartClick}
          />
          <SideDrawer
          logOut={logOut} 
          show={drawerOpen}
          click={backDropClick}
          />
          {backDrop}
          <CheckOut/>
        </Route>
        <Route exact path="/Log In">
          <LogIn/>
          </Route>
          <Route exact path="/Admin">
          <ToolBar 
          logOut={logOut}
          handleDrawerClick={handleDrawerClick}
          handleCartClick={handleCartClick}
          />
          <SideDrawer
          logOut={logOut} 
          show={drawerOpen}
          click={backDropClick}
          />
          {backDrop}
          <Dashboard/> 
        </Route>
        <Route exact path="/">
          <ToolBar 
          logOut={logOut}
          handleDrawerClick={handleDrawerClick}
          handleCartClick={handleCartClick}
          />
          <SideDrawer
          logOut={logOut} 
          show={drawerOpen}
          click={backDropClick}
          />
          {backDrop}
          <Home/> 
        </Route>
         
      </Switch>
    </div>
  )
}

export default App;
