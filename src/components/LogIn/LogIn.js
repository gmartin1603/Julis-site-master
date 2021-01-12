import React, { useEffect, useState } from 'react';
import './LogIn.css'
import {auth} from '../firebase/firebase'
import { useStateValue } from '../context/StateProvider';
import {useHistory} from 'react-router-dom'


function LogIn(props) {

    const history = useHistory()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmedPassword, setConfirmedPassword] = useState('')
    const [signUp, setSignUp] = useState(false)
    const [disabled, setDisabled] = useState(true)
    const [{ }, dispatch] = useStateValue()

    useEffect(() => {
        if (signUp && confirmedPassword === password && password !== '') {
            setDisabled(false)
        }
        else if (!signUp && password !== '' && email !== '') {
            setDisabled(false)
        }
    }, [email, password, confirmedPassword, signUp])

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

    const createAccount = (email, password, e) => {
        e.preventDefault()
        auth.createUserWithEmailAndPassword(email, password)
        .then((user) => {
            console.log("User created!")
            dispatch({
                type: 'SET_USER',
                user: user
            })
            history.push('./')
        }).catch((error) => alert(error))
    }

    return (
        <div className="logIn">
            <div className="logIn__logo" onClick={() => history.push('/')}>
                Juli's Juicy Thoughts
            </div>
            <div className="logIn__container">
                    <form action="sign-in">
                    <h5>{signUp? "Sign Up" : "Sign In"}</h5>
                    <h5>E-mail</h5>
                    <input type="text" value={email} placeholder="Email" onChange={(e) => setEmail(e.target.value)}/>

                    {signUp? 
                    <div className="password__container">
                        <h5>Password</h5>
                        <input type="password" value={password} placeholder="Password" onChange={(e) => setPassword(e.target.value)}/>
                        <h5>Confirm Password</h5>
                        <input type="password" value={confirmedPassword} placeholder="Password" onChange={(e) => setConfirmedPassword(e.target.value)}/>
                        <button 
                                className="logIn__button"
                                type="submit"
                                onClick={(e) => createAccount(email, password, e)}
                                disabled={disabled}
                                >Sign Up
                                </button>

                    </div>
                        :
                        <div className="password__container">
                        <h5>Password</h5>
                        <input type="password" value={password} placeholder="Password" onChange={(e) => setPassword(e.target.value)}/>
                                <button 
                                className="logIn__button"
                                type="submit"
                                onClick={handleSignIn}
                                disabled={disabled}
                                >Log In
                                </button>
                        </div>
                    }
                        <span><input type="checkbox" onChange={() => setSignUp(!signUp)}/> <h5>Sign Up</h5> </span>
                    </form>
            </div>
        </div>
    );
}

export default LogIn;