import React from 'react';
import s from './UserInfo.module.css';
import UserStatus from "../common/UserStatus/UserStatus";
import UserAbout from "../common/UserAbout/UserAbout";

const UserInfo = props => {
    return(
        <div className={s.section}>
            <UserStatus />
            <UserAbout />
        </div>
    )
};

// {
//     aboutMe: null,
//         contacts: {
//     facebook: null,
//         website: null,
//         vk: null,
//         twitter: null,
//         instagram: null,
//         youtube: null,
//         github: null,
//         mainLink: null
// },
//     lookingForAJob: false,
//         lookingForAJobDescription: null,
//     fullName: "WhiteHoney",
//     userId: 6722,
//     photos: {
//     small: null,
//         large: null
// }
// }


export default UserInfo;