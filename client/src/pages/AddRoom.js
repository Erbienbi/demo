import React, { useState, useEffect } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { roomError, clearError } from '../slices/roomSlice';
import { gql } from 'apollo-boost';
import appAxios from '../config/appAxios';

const GET_ALL_BUILDING = gql`
    query {
        getAllBuilding{
            id
            OwnerId
            area
            address
        }
    }
`

function AddRoom(props) {
    const dispatch = useDispatch()
    const [isLoading, setIsLoading] = useState(false)
    const user = useSelector(state => state.user)
    const { error, loading, data } = useQuery(GET_ALL_BUILDING)
    // const building = useSelector(state => state.building.allBuildings)

    const room = useSelector(state => state.room)
    const [form, setForm] = useState({
        price: '',
        BuildingId: '',
        ac: '',
        bathroom: '',
        carPort: '',
        laundry: '',
        gender: '',
    });

    const formChange = (e) => {
        console.log(form)
        e.persist()
        setForm((prevState) => {
            return { ...prevState, [e.target.name] : e.target.value }
        })
    };

    const booleanForm = (e) => {
        console.log(form)
        e.persist()
        setForm((prevState) => {
            return { ...prevState, [e.target.name] : Number(e.target.value) }
        })
    };

    const submitForm = async (e) => {
        e.preventDefault()
        console.log('Form submit:', form)
        if (!form.BuildingId) {
            alert('You need to select a building!')
        } else {
            setIsLoading(true)
            appAxios({
                method: 'POST',
                url: `/room/${form.BuildingId}`,
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
    }

    if (loading) {
        return <h1>Loading...</h1>
    } else if (isLoading) {
        return <h1>Loading...</h1>
    } else {
        console.log('Building:', data)
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
                                <td>Select Building</td>
                                <td>
                                    <select name="BuildingId" onChange={booleanForm}>
                                        <option disabled selected>Select one</option>
                                    
                                        {data && data.getAllBuilding
                                            .filter(each => each.OwnerId === user.id)
                                            .map(each => (
                                                <option key={each.id} value={Number(each.id)}>{each.area}</option>
                                            )
                                        )}
                                    </select>
                                </td>
                            </tr>
                            <tr>
                                <td>Rent Price</td>
                                <td><input type="text" name="price" onChange={formChange} /></td>
                            </tr>
                            <tr>
                                <td>Air Conditioning?</td>
                                <td>
                                    <input type="radio" name="ac" value="0" onChange={booleanForm} /> None<br />
                                    <input type="radio" name="ac" value="1" onChange={booleanForm} /> Available<br />
                                </td>
                            </tr>
                            <tr>
                                <td>Bathroom</td>
                                <td>
                                    <input type="radio" name="bathroom" value="0" onChange={booleanForm} /> Outside<br />
                                    <input type="radio" name="bathroom" value="1" onChange={booleanForm} /> Inside<br />
                                </td>
                            </tr>
                            <tr>
                                <td>Laundry Service</td>
                                <td>
                                    <input type="radio" name="laundry" value="0" onChange={booleanForm} /> None<br />
                                    <input type="radio" name="laundry" value="1" onChange={booleanForm} /> Available<br />
                                </td>
                            </tr>
                            <tr>
                                <td>Gender</td>
                                <td>
                                    <input type="radio" name="gender" value="male" onChange={formChange} /> Male-Only<br />
                                    <input type="radio" name="gender" value="female" onChange={formChange} /> Female-Only<br />
                                    <input type="radio" name="gender" value="mixed" onChange={formChange} /> No Restriction<br />
                                </td>
                            </tr>
                            <tr>
                                <td>Car Parking</td>
                                <td>
                                    <input type="radio" name="carPort" value="0" onChange={booleanForm} /> None<br />
                                    <input type="radio" name="carPort" value="1" onChange={booleanForm} /> Available<br />
                                </td>
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