import React from 'react';
import s from './UserCard.module.css';
import LargeAvatar from "../../LargeAvatar/LargeAvatar";
import UserInfo from "../UserInfo";

const UserCard = props => {
    let {photos} = props;
    return(
        <div className={s.section}>
            <LargeAvatar src={photos}/>
            <UserInfo />
        </div>
    )
};

export default UserCard;