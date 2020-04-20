import React from 'react';
import { useParams } from 'react-router-dom';

function BuildingRoom(props) {
    const { BuildingId } = useParams()
    
    return (
        <div>
            <h1>Building {BuildingId} Room List</h1>
        </div>
    );
}

export default BuildingRoom;