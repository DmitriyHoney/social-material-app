import React from 'react';
import s from './Profile.module.css';
import UserCard from "./UserCard/UserCard";

const Profile = props => {
    let {photos} = props;
    return(
        <div>
            <UserCard/>
        </div>
    )
};


export default Profile;