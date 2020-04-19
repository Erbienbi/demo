import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { ownerLogin, userError, clearError } from '../slices/userSlice';
import appAxios from '../config/appAxios';

const OwnerLogin = (props) => {
    const dispatch = useDispatch()
    const [isLoading, setIsLoading] = useState(false)
    const user = useSelector(state => state.user)
    const { from } = props.location.state || { from: { pathname: '/'}}
    const [status, setStatus] = useState({
        redirectRefs: props.state || false,
    });
    const [form, setForm] = useState({
        email: '',
        password: '',
    });

    useEffect(() => {
        dispatch(clearError())
        // console.log('isLoading is now:', isLoading)
    }, [user.isAuthenticated]);

    const formChange = (e) => {
        e.persist()
        setForm((prevState) => {
            return { ...prevState, [e.target.name] : e.target.value }
        })
    };

    const submitForm = async (e) => {
        e.preventDefault()
        setIsLoading(true)
        console.log('Form submit:', form)
        appAxios({
            method: 'POST',
            url: '/owner/login',
            data: form,
        })
        .then(({data}) => {
            console.log('Login successful!', data)
            return dispatch(ownerLogin(data))
        })
        .then(() => {
            console.log('Data has been dispatched!')
            setStatus({ redirectRefs: true })
            setIsLoading(false)
        })
        .catch((err) => {
            console.log('Login failed!', err.response)
            dispatch(userError(err.response.data))
            setIsLoading(false)
        })
    }

    if (isLoading) {
        return <h1>Loading...</h1>
    } else if (status.redirectRefs === true) {
        console.log('Status redirect Refs is true', from)
        return <Redirect to={from} />
    } else if (user.authenticated) {
        console.log('Enter from user.authenticated')
        return <Redirect to='/' />
    } else {
        return (
            <div>
                <h1>Owner Login form</h1>
                {user.error
                ? <p>{JSON.stringify(user.error)}</p>
                : ''
                }
                {props.location.state
                ? <p>You must log in to view this page</p>
                : ''
                }
                <form onSubmit={submitForm}>
                    <table>
                        <tbody>
                            <tr>
                                <td>Email</td>
                                <td><input type="text" name="email" onChange={formChange} /></td>
                            </tr>
                            <tr>
                                <td>Password</td>
                                <td><input type="password" name="password" onChange={formChange} /></td>
                            </tr>
                            <tr>
                                <td></td>
                                <td><input type="submit" value="Sign in"/></td>
                            </tr>
                        </tbody>
                    </table>
                </form>
                <span>Not a room owner? </span>
                <button onClick={() => props.history.push('/login-user')}>Click here</button>
            </div>
        )
    }
}

export default OwnerLogin;
