import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { login, increment, decrement } from '../slices/userSlice';
import appAxios from '../config/appAxios';

const Login = (props) => {
    const dispatch = useDispatch()
    const number = useSelector(state => state.user.number)
    const user = useSelector(state => state.user)
    const { from } = props.location.state || { from: { pathname: '/'}}
    const [status, setStatus] = useState({
        redirectRefs: props.state || false,
    })

    useEffect(() => {
        console.log('Use effect', props)
    })

    const submitLogin = () => {
        console.log('Login button clicked!')
        appAxios({
            method: 'POST',
            url: '/user/login',
            data: {
                email: 'bambang@gmail.com',
                password: 'bambang'
            },
        })
        .then(({data}) => {
            console.log('Login successful!')
            console.log('Data from server:', data)
            setStatus({ redirectRefs: true })
            return dispatch(login(data))
        })
        .catch((err) => {
            console.log('Login failed!')
            console.log(err)
        })
        // login(() => {
        //     console.log('Auth login complete', status)
        //     setStatus({ redirectRefs: true }, console.log('Callback login', status))
        // })
    }

    if (status.redirectRefs === true) {
        console.log('Status redirect Refs is true')
        return <Redirect to={from} />
    }
    
    if (user.authenticated) {
        return <Redirect to='/' />
    } else if (props.location.state) {
        return (
            <div>
                <h1>Login form</h1>
                <p>You must log in to view this page</p>
                <button onClick={submitLogin}>Login</button>
            </div>
        )
    } else {
        return (
            <div>
                <h1>Login form</h1>
                <button onClick={submitLogin}>Login</button>
                <div>
                    <p>
                        Clicked: <span id="value">{number}</span> times
                        <button onClick={() => dispatch(increment())}>+</button>
                        <button onClick={() => dispatch(decrement())}>-</button>
                        <button id="incrementIfOdd">Increment if odd</button>
                        <button id="incrementAsync">Increment async</button>
                    </p>
                </div>
            </div>
        )
    }
}

export default Login;
