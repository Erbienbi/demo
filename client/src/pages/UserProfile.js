import React from 'react';
import {useSelector} from 'react-redux';
// import {} from '../slices/userSlice';

function UserProfile(props) {
    const user = useSelector(state => state.user);
    return (
        <div>
            <h1>User Profile</h1>
            <h1>{JSON.stringify(user)}</h1>   
        </div>
    );
}

export default UserProfile;