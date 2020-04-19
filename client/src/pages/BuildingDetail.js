import React from 'react';
import { useParams } from 'react-router-dom';

function BuildingDetail(props) {
    const { id } = useParams()
    return (
        <div>
            <h1>Building {id} Detail</h1>
        </div>
    );
}

export default BuildingDetail;