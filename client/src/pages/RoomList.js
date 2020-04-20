import React, { useEffect, useState } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { useDispatch, useSelector } from 'react-redux';
import { storeAllBuilding } from '../slices/buildingSlice';
import { gql } from 'apollo-boost';
import { Link } from 'react-router-dom';

// Belum ada endpoint untuk Get All Rooms from All Building

function RoomList() {
    const dispatch = useDispatch()
    const [isLoading, setIsLoading] = useState(true)
    const room = useSelector(state => state.room)
    const data = []

    // const { error, loading, data } = useQuery(GET_ALL_ROOM)

    // if (loading) return <p> Loading....</p>
    // if (error) return <p> {error.message} </p>

    return (
        <div>
            <h1>All Room List</h1>
            <section className="results">
                {/* {data && data.map(result => (
                    <Link to={`/host/${result.BuildingId}/${result.id}`}>
                        <div key={result.id} result={result}>
                            <h5>Price: {result.area}</h5>
                        </div>
                    </Link>
                ))} */}
            </section>
        </div>
    );
}

export default RoomList;