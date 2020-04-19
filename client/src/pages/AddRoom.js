import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { roomError, clearError } from '../slices/roomSlice';
import appAxios from '../config/appAxios';

function AddRoom(props) {
    const dispatch = useDispatch()
    const [isLoading, setIsLoading] = useState(false)
    const user = useSelector(state => state.user)
    const room = useSelector(state => state.room)
    const [form, setForm] = useState({
        area: '',
        address: '',
        coordinate: '',
        image: '',
    });

    useEffect(() => {
        dispatch(clearError())
        // console.log('isLoading is now:', isLoading)
    }, []);

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
            url: '/room',
            data: form,
            headers: {
                token: user.token
            }
        })
        .then(({data}) => {
            setIsLoading(false)
            console.log('Add room successful!', data)
            props.history.push('/')
        })
        .catch((err) => {
            console.log('Add room failed!', err.response)
            dispatch(roomError(err.response.data))
            setIsLoading(false)
        })
    }
    if (isLoading) {
        return <h1>Loading...</h1>
    } else {
        return (
            <div>
                <h1>Add Room</h1>
                {room.error
                    ? <p>{JSON.stringify(room.error)}</p>
                    : ''
                    }
                    <form onSubmit={submitForm}>
                        <table>
                            <tbody>
                                <tr>
                                    <td>Area</td>
                                    <td><input type="text" name="area" onChange={formChange} /></td>
                                </tr>
                                <tr>
                                    <td>Address</td>
                                    <td><input type="text" name="address" onChange={formChange} /></td>
                                </tr>
                                <tr>
                                    <td>Coordinate (insert Google Map here)</td>
                                    <td><input type="text" name="coordinate" onChange={formChange} /></td>
                                </tr>
                                <tr>
                                    <td>Room Image (select one):<input type="file" name="image" onChange={formChange} /></td>
                                    <td><input type="text" name="image" onChange={formChange} /></td>
                                </tr>
                                <tr>
                                    <td></td>
                                    <td><input type="submit" value="Add Room"/></td>
                                </tr>
                            </tbody>
                        </table>
                    </form>
            </div>
        );
    }
}

export default AddRoom;