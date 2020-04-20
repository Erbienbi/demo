import React, { useEffect, useState } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { useDispatch, useSelector } from 'react-redux';
import { storeAllBuilding } from '../slices/buildingSlice';
import { gql } from 'apollo-boost';
import { Link } from 'react-router-dom';

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

function BuildingList() {
    const dispatch = useDispatch()
    const [isLoading, setIsLoading] = useState(true)
    const building = useSelector(state => state.building)
    const { error, loading, data } = useQuery(GET_ALL_BUILDING)

    useEffect(() => {
        if (data) {
            dispatch(storeAllBuilding(data.getAllBuilding))
            setIsLoading(false)
        }
    }, [data])

    if (loading) return <p> Loading....</p>
    if (error) return <p> {error.message} </p>

    if (isLoading) {
        return <p> Loading...</p>
    } else {
        return (
            <div>
                <h1>Building List</h1>
                <section className="results">
                    {building.allBuildings.map(result => (
                        <Link to={`/host/${result.id}`}>
                            <div key={result.id} result={result}>
                                <h5>Area: {result.area}</h5>
                                <h6>Address: {result.address}</h6>
                            </div>
                        </Link>
                    ))}
                </section>
            </div>
        );
    }
}

export default BuildingList;