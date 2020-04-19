import React from 'react';
import { useQuery } from '@apollo/react-hooks';
// import BuildingCard from '../components/BuildingCard';
import { gql } from 'apollo-boost';
import { Link } from 'react-router-dom';

const GET_ALL_BUILDING = gql`
  query {
    getAllBuilding {
      id
      OwnerId
      area
      address
      Rooms {
        price
        ac
        bathroom
        carPort
        laundry
        gender
      }
    }
  }
`

function BuildingList() {
    const { error, loading, data } = useQuery(GET_ALL_BUILDING)

    if (loading) return <p> Loading....</p>
    if (error) return <p> {error.message} </p>
    console.log('All buildings:', data)
    return (
        <div>
            <h1>Movie List</h1>
            <section className="results">
                {data.getAllBuilding.map(result => (
                    <Link to={`/building/${result.id}`}>
                        <div key={result._id} result={result}>
                            <h5>Area: {result.area}</h5>
                            <h6>Address: {result.address}</h6>
                        </div>
                    </Link>
                ))}
            </section>
        </div>
    );
}

export default BuildingList;