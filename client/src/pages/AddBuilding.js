import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { buildingError, clearError } from '../slices/buildingSlice';
import appAxios from '../config/appAxios';
import { gql } from 'apollo-boost'
import { useMutation } from '@apollo/react-hooks'

const ADD_NEW_BUILDING = gql `
    postBuilding(
        $token: String!
        $OwnerId:Int!
        $area: String!
        $address: String!
        $coordinate: String!
        $image: String
    ) {
        postBuilding(
            token:$token
            OwnerId:$OwnerId
            area:$area
            address:$address
            coordinate:$coordinate
            image:$image
        ) {
            message
        }
    }
`

const GET_ALL_BUILDING = gql`
    query {
        getAllBuilding{
            id
            OwnerId
            area
            address
            coordinate
            image
            Rooms {
                id
                price
                UserId
                BuildingId
                bathroom
                carPort
                laundry
                gender
                date_occupied
                image
            }
        }
    }
`

function AddBuilding(props) {
    const dispatch = useDispatch()
    const [isLoading, setIsLoading] = useState(false)
    const user = useSelector(state => state.user)
    const building = useSelector(state => state.building)
    // const [form, setForm] = useState({
    //     area: '',
    //     address: '',
    //     coordinate: '',
    //     image: '',
    // });

    useEffect(() => {
        dispatch(clearError())
        // console.log('isLoading is now:', isLoading)
    }, []);

    // const formChange = (e) => {
    //     e.persist()
    //     setForm((prevState) => {
    //         return { ...prevState, [e.target.name] : e.target.value }
    //     })
    // };

    const [area, setArea] = useState('')
    const [address, setAddress] = useState('')
    const [coordinate, setCoordinate] = useState('')
    const [image, setImage] = useState('')

    const [postBuilding] = useMutation(ADD_NEW_BUILDING, {
        refetchQueries: [
            { query: GET_ALL_BUILDING }
        ]
    })

    const submitForm = async (e) => {
        e.preventDefault()
        const addNewBuilding = await postBuilding({
            variables: {
                area,
                address,
                coordinate,
                image,
                token: localStorage.owner_token
            }
        })
        // setIsLoading(true)
        // console.log('Form submit:', form)
        // appAxios({
        //     method: 'POST',
        //     url: '/building',
        //     data: form,
        //     headers: {
        //         token: user.token
        //     }
        // })
        // .then(({data}) => {
        //     setIsLoading(false)
        //     console.log('Add building successful!', data)
        //     props.history.push('/')
        // })
        // .catch((err) => {
        //     console.log('Add building failed!', err.response)
        //     dispatch(buildingError(err.response.data))
        //     setIsLoading(false)
        // })
    }
    if (isLoading) {
        return <h1>Loading...</h1>
    } else {
        return (
            <div>
                <h1>Add Building</h1>
                {building.error
                    ? <p>{JSON.stringify(building.error)}</p>
                    : ''
                }
                <form onSubmit={(e) => submitForm(e)}>
                    <table>
                        <tbody>
                            <tr>
                                <td>Area</td>
                                <td><input type="text" name="area" onChange={(e) => setArea(e.target.value) } /></td>
                            </tr>
                            <tr>
                                <td>Address</td>
                                <td><input type="text" name="address" onChange={(e) => setAddress(e.target.value)} /></td>
                            </tr>
                            <tr>
                                <td>Coordinate (insert Google Map here)</td>
                                <td><input type="text" name="coordinate" onChange={(e) => setCoordinate(e.target.value)} /></td>
                            </tr>
                            <tr>
                                <td>Building Image (select one):<input type="file" name="image" onChange={(e) => setImage(e.target.value)} /></td>
                                {/* <td><input type="text" name="image" onChange={formChange} /></td> */}
                            </tr>
                            <tr>
                                <td></td>
                                <td><input type="submit" value="Add Host Building"/></td>
                            </tr>
                        </tbody>
                    </table>
                </form>
                <span>Return to building list</span>
                <button onClick={() => props.history.push('/building')}>Go back</button>
            </div>
        );
    }
}

export default AddBuilding;