import React from 'react';
import { Link } from 'react-router-dom';

function Home(props) {
    return (
        <div>
            <h1>Homepage</h1>
            <p>Untuk sementara Home isinya link redirect</p>
            <ul>
                <li><Link to='/add-building'>Add Building</Link></li>
                <li><Link to='/add-room'>Add Room</Link></li>
                <li><Link to='/building'>All Building List</Link></li>
                <li><Link to='/room'>All Room List</Link></li>
            </ul>
        </div>
    );
}

export default Home;