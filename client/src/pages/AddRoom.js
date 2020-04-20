import React, { useState, useEffect } from 'react';
import { useQuery, useMutation } from '@apollo/react-hooks';
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

const ADD_NEW_ROOM = gql `
    mutation postRoom(
        $token: String!
        $BuildingId:Int!
        $price: Int!
        $ac: Boolean
        $bathroom: Boolean
        $carPort: Boolean
        $laundry: Boolean
        $gender: String
        $date_occupied: String
        $image: String
    ) {
        postRoom(
            token:$token
            BuildingId:$BuildingId
            price:$price
            ac:$ac
            bathroom:$bathroom
            carPort:$carPort
            laundry:$laundry
            gender:$gender
            date_occupied:$date_occupied
            image:$image
        ) {
            message
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
    // const [form, setForm] = useState({
    //     price: '',
    //     BuildingId: '',
    //     ac: '',
    //     bathroom: '',
    //     carPort: '',
    //     laundry: '',
    //     gender: '',
    // });

    const [bId, setbId] = useState(0)
    const [price, setPrice] = useState(0)
    const [ac, setAc] = useState(false)
    const [bathroom, setBathroom] = useState(false)
    const [carPort, setcarPort] = useState(false)
    const [laundry, setLaundry] = useState(false)
    const [gender, setGender] = useState('')

    const [addRoom] = useMutation(ADD_NEW_ROOM, {
        refetchQueries: [
            { query: GET_ALL_BUILDING }
        ]
    })

    // const formChange = (e) => {
    //     console.log(form)
    //     e.persist()
    //     setForm((prevState) => {
    //         return { ...prevState, [e.target.name] : e.target.value }
    //     })
    // };

    // const booleanForm = (e) => {
    //     console.log(form)
    //     e.persist()
    //     setForm((prevState) => {
    //         return { ...prevState, [e.target.name] : Number(e.target.value) }
    //     })
    // };

    const submitForm = async (e) => {
        e.preventDefault()
        // console.log('Form submit:', form)
        // if (!form.BuildingId) {
        //     alert('You need to select a building!')
        // } else {
        setIsLoading(true)
        const addNewRoom = await addRoom({
            variables: {
                token: localStorage.owner_token,
                BuildingId: bId,
                ac,
                bathroom,
                price,
                laundry,
                carPort,
                gender
            }
        })
        console.log(addNewRoom)
            // appAxios({
            //     method: 'POST',
            //     url: `/room/${form.BuildingId}`,
            //     data: form,
            //     headers: {
            //         token: user.token
            //     }
            // })
            // .then(({data}) => {
            //     setIsLoading(false)
            //     console.log('Add room successful!', data)
            //     props.history.push('/')
            // })
            // .catch((err) => {
            //     console.log('Add room failed!', err.response)
            //     dispatch(roomError(err.response.data))
            //     setIsLoading(false)
            // })
        
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
                <form onSubmit={(e) => submitForm(e)}>
                    <table>
                        <tbody>
                            <tr>
                                <td>Select Building</td>
                                <td>
                                    <select name="BuildingId">
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
                                <td><input type="number" name="price" onChange={(e) => setPrice(Number(e.target.value))} /></td>
                            </tr>
                            <tr>
                                <td>Air Conditioning?</td>
                                <td>
                                    <input type="radio" name="ac" value="0" onChange={(e) => setAc(false)} /> None<br />
                                    <input type="radio" name="ac" value="1" onChange={(e) => setAc(true)} /> Available<br />
                                </td>
                            </tr>
                            <tr>
                                <td>Bathroom</td>
                                <td>
                                    <input type="radio" name="bathroom" value="0" onChange={(e) => setBathroom(false)} /> Outside<br />
                                    <input type="radio" name="bathroom" value="1" onChange={(e) => setBathroom(true)} /> Inside<br />
                                </td>
                            </tr>
                            <tr>
                                <td>Laundry Service</td>
                                <td>
                                    <input type="radio" name="laundry" value="0" onChange={(e) => setLaundry(false)} /> None<br />
                                    <input type="radio" name="laundry" value="1" onChange={(e) => setLaundry(true)} /> Available<br />
                                </td>
                            </tr>
                            <tr>
                                <td>Gender</td>
                                <td>
                                    <input type="radio" name="gender" value="male" onChange={(e) => setGender('male')} /> Male-Only<br />
                                    <input type="radio" name="gender" value="female" onChange={(e) => setGender('female')} /> Female-Only<br />
                                    <input type="radio" name="gender" value="mixed" onChange={(e) => setGender('mix')} /> No Restriction<br />
                                </td>
                            </tr>
                            <tr>
                                <td>Car Parking</td>
                                <td>
                                    <input type="radio" name="carPort" value="0" onChange={(e) => setcarPort(false)} /> None<br />
                                    <input type="radio" name="carPort" value="1" onChange={(e) => setcarPort(true)} /> Available<br />
                                </td>
                            </tr>
                            <tr>
                                <td>Room Image (select one):<input type="file" name="image"  /></td>
                                <td><input type="text" name="image" /></td>
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