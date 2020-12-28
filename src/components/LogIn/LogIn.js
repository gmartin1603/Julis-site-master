import React, { useState } from 'react';
import './LogIn.css'
import {auth} from '../firebase/firebase'
import { useStateValue } from '../context/StateProvider';
import {useHistory} from 'react-router-dom'


function LogIn(props) {

    const history = useHistory()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [{ }, dispatch] = useStateValue()

    const handleSignIn = (e) => {
        e.preventDefault()
        auth.signInWithEmailAndPassword(email, password)
        .then((user) => {
            if (email === "admin@jjt.com") {
                dispatch({
                    type: 'SET_USER',
                    user: user,
                    admin: true
                })
                history.push('/Admin')
            } else {
                dispatch({
                    type: 'SET_USER',
                    user: user,
                    admin: false
                })
                history.push('/')
            }
        }).catch((error) => alert(error))
    }

    const createAccount = () => {
        auth.createUserWithEmailAndPassword(email, password)
        .then((user) => {
            dispatch({
                type: 'SET_USER',
                user: user
            })
        }).catch((error) => alert(error))
    }

    return (
        <div className="logIn">
            <div className="logIn__logo" onClick={() => history.push('/')}>
                Juli's Juicy Thoughts
            </div>
            <div className="logIn__container">
                <h5>Sign-in</h5>
                <form action="sign-in">
                    <h5>E-mail</h5>
                    <input type="text" value={email} placeholder="Email" onChange={(e) => setEmail(e.target.value)}/>

                    <h5>Password</h5>
                    <input type="password" value={password} placeholder="Password" onChange={(e) => setPassword(e.target.value)}/>
                    <button 
                    className="logIn__signInButton"
                    type="submit"
                    onClick={handleSignIn}
                    >
                        Log In
                    </button>
                </form>

                <button 
                className="logIn__registerButton"
                onClick={createAccount}
                >Create Account</button>
            </div>
        </div>
    );
}

export default LogIn;