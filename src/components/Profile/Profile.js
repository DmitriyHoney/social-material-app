import React from 'react';
import s from './Profile.module.css';
import UserCard from "./UserCard/UserCard";

const Profile = React.memo(props => {
    let userData = {...props.userCard};
    if (props.isUserCheck) {
        return(
            <div>
                <UserCard
                    userData={userData}
                    status={props.status}
                    changeUserStatus={props.changeUserStatus}
                    setNewProfilePhoto={props.setNewProfilePhoto}
                    sendEditProfileData={props.sendEditProfileData}
                    itsMe={props.itsMe}
                />
            </div>
        )
    } else {
        return <div>Такого пользователя нет</div>
    }

});


export default Profile;