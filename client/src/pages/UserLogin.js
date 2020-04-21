import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { login, userError, clearError } from '../slices/userSlice';
import { useMutation } from '@apollo/react-hooks'
import { gql } from 'apollo-boost';
import appAxios from '../config/appAxios';

const USER_LOGIN = gql`
    mutation userLogin($email: String!, $password: String!){
        userLogin(
            email: $email,
            password: $password
        ) {
            token
            user{
                id
                name
                email
            }
        }
    }

`

const UserLogin = (props) => {
    const dispatch = useDispatch()
    const [isLoading, setIsLoading] = useState(false)
    const user = useSelector(state => state.user)
    const { from } = props.location.state || { from: { pathname: '/'}}
    const [status, setStatus] = useState({
        redirectRefs: props.state || false,
    });
    
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    useEffect(() => {
        dispatch(clearError())
        // console.log('isLoading is now:', isLoading)
    }, [user.isAuthenticated]);

    const [userLogin] = useMutation(USER_LOGIN)

    const submitForm = async (e) => {
        e.preventDefault()
        try {
            const feedback = await userLogin({
                variables: {
                    email,
                    password
                }
            })
            const loginFeedback = feedback.data.userLogin
            await dispatch(login(loginFeedback))
        } catch(err) {
            console.log('Error here', err)
            // await dispatch(userError(err.response.data))
        }
    }
    // const formChange = (e) => {
    //     e.persist()
    //     console.log(e.taget.value)
    //     setForm((prevState) => {
    //         return { ...prevState, [e.target.name] : e.target.value }
    //     })
    // };

    // const submitForm = async (e) => {
    //     e.preventDefault()
    //     setIsLoading(true)
    //     console.log('Form submit:', form)
    //     appAxios({
    //         method: 'POST',
    //         url: '/user/login',
    //         data: form,
    //     })
    //     .then(({data}) => {
    //         return dispatch(login(data))
    //     })
    //     .then(() => {
    //         console.log('Data has been dispatched!')
    //         setStatus({ redirectRefs: true })
    //         setIsLoading(false)
    //     })
    //     .catch((err) => {
    //         console.log('Login failed!', err.response)
    //         dispatch(userError(err.response.data))
    //         setIsLoading(false)
    //     })
    // }

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
                <h1>Login form</h1>
                {user.error
                ? <p>{JSON.stringify(user.error)}</p>
                : ''
                }
                {props.location.state
                ? <p>You must log in to view this page</p>
                : ''
                }
                <form onSubmit={(e) => submitForm(e)}>
                    <table>
                        <tbody>
                            <tr>
                                <td>Email</td>
                                <td><input type="text" name="email" onChange={(e) => setEmail(e.target.value)} /></td>
                            </tr>
                            <tr>
                                <td>Password</td>
                                <td><input type="password" name="password" onChange={(e) => setPassword(e.target.value)} /></td>
                            </tr>
                            <tr>
                                <td></td>
                                <td><input type="submit" value="Sign in"/></td>
                            </tr>
                        </tbody>
                    </table>
                </form>
                <span>Logging in as Erbienbi room owner? </span>
                <button onClick={() => props.history.push('/login-owner')}>Click here</button>
            </div>
        )
    }
}

export default UserLogin;
