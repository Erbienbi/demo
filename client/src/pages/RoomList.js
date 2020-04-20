import React, { useEffect, useState } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { useDispatch, useSelector } from 'react-redux';
import { storeAllBuilding } from '../slices/buildingSlice';
import { gql } from 'apollo-boost';
import { Link } from 'react-router-dom';

// Kok aku nggak nemu endpoint untuk Get All Rooms from All Building ya :thonk:
const GET_ALL_ROOM = gql`
    query {
        getAllRoom {
            id
            price
            UserId
            BuildingId
            ac
            bathroom
            carPort
            laundry
            gender
            date_occupied
            image
        }
    }
`
// Jadi ya, sekarang masih kosong

function RoomList() {
    const dispatch = useDispatch()
    const [isLoading, setIsLoading] = useState(true)
    const room = useSelector(state => state.room)

    const { error, loading, data } = useQuery(GET_ALL_ROOM)
    console.log(data)
    if (loading) return <p> Loading....</p>
    if (error) return <p> {error.message} </p>

    return (
        <div>
            <h1>All Room List</h1>
            <section className="results">
                {data.getAllRoom.map(result => (
                    <Link to={`/host/${result.BuildingId}/${result.id}`}>
                        <div key={result.id} result={result}>
                            <h5>Price: {result.price}</h5>
                            <h5>Ac: {result.ac}</h5>
                            <h5>Bathroom: {result.bathroom}</h5>
                            <h5>Car Port: {result.carPort}</h5>
                            <h5>Laundry: {result.laundy}</h5>
                            <h5>Gender: {result.gender}</h5>
                            <h5>Status: {result.date_occupied ? 'Not availabe' : 'Available'}</h5>
                            <img src={result.image} />
                            <br></br>
                        </div>
                    </Link>
                ))}
            </section>
        </div>
    );
}

export default RoomList;