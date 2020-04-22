import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { userError, clearError } from '../slices/userSlice';
import appAxios from '../config/appAxios';

function UserRegister(props) {
    const dispatch = useDispatch()
    const [isLoading, setIsLoading] = useState(false)
    const user = useSelector(state => state.user)
    const [form, setForm] = useState({
        name: '',
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
            url: '/user/register',
            data: form,
        })
        .then(() => {
            setIsLoading(false)
            console.log('Register successful!')
            props.history.push('/login-user')
        })
        .catch((err) => {
            console.log('Register failed!', err.response)
            dispatch(userError(err.response.data))
            setIsLoading(false)
        })
    }

    if (isLoading) {
        return <h1>Loading...</h1>
    } else if (user.authenticated) {
        return <Redirect to='/' />
    } else {
        return (
            <div>
                <h1>Register form</h1>
                <p>We will help you find the best place in no time!!</p>
                {user.error
                ? <p>{JSON.stringify(user.error)}</p>
                : ''
                }
                <form onSubmit={submitForm}>
                    <table>
                        <tbody>
                            <tr>
                                <td>Name</td>
                                <td><input type="text" name="name" onChange={formChange} /></td>
                            </tr>
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
                <span>Trying to register your room? </span>
                <button onClick={() => props.history.push('/register-owner')}>Click here</button>
            </div>
        )
    }
}

export default UserRegister;