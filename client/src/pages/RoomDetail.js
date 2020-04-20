import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import { Link } from 'react-router-dom';

function RoomDetail(props) {
    const { BuildingId, RoomId } = useParams()
    // Ini bebas perlu page baru atau pakai reusable component aja
    // Karena nggak perlu request query GraphQL, pass props ke component

    return (
        <div>
            <h1>Room Detail</h1>
            <p>Building ID: {BuildingId}</p>
            <p>Room ID: {RoomId}</p>
        </div>
    );
}

export default RoomDetail;