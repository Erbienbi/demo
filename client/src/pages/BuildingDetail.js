import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import { Link } from 'react-router-dom';

const GET_ONE_BUILDING = gql`
    query getOneBuilding($id: Int!) {
        getOneBuilding(id:$id){
            id
            OwnerId
            area
            address
            Rooms {
                id
                price
            }
        }
    }
`

function BuildingDetail(props) {
    const { BuildingId } = useParams()
    const [isLoading, setIsLoading] = useState(false)
    const { error, loading, data } = useQuery(GET_ONE_BUILDING, {
        variables: {
            id: Number(BuildingId),
        }
    })

    // Taruh card untuk setiap room yang ada di building ini
    // ketika card di-click, bisa redirect ke page RoomDetail atau nggak, bebas
    // Pass props ke card component

    if (loading) return <p> Loading....</p>
    if (error) return <p> {error.message} </p>

    if (isLoading) {
        return <p> Loading...</p>
    } else {
        console.log('Data of one building:', data.getOneBuilding)
        return (
            <div>
                <div>
                    <span>Have a room to rent?</span>
                    <button onClick={() => props.history.push('/add-room')}>Add New Room</button>
                </div>
                <div>
                    <h1>Building { BuildingId } Page </h1>
                    <p>Address: { data.getOneBuilding.address}</p>
                </div>
                
                <hr></hr>

                <h1>Room List</h1>
                <section className="results">
                    {data.getOneBuilding.Rooms.map(result => (
                        <Link to={`/host/${BuildingId}/${result.id}`}>
                            <div key={result.id} result={result}>
                                <h5>Price: {result.price}</h5>
                            </div>
                        </Link>
                    ))}
                </section>
            </div>
        );
    }
}

export default BuildingDetail;