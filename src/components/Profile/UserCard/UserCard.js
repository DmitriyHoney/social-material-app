import React from 'react';
import s from './UserCard.module.scss';
import LargeAvatar from "../../LargeAvatar/LargeAvatar";
import UserStatus from "../../common/UserStatus/UserStatus";
import UserAbout from "../../common/UserAbout/UserAbout";
import SocialBlock from "../SocialBlock/SocialBlock";
import VerifyElem from "../../common/VerifyElem/VerifyElem";
import Button from "../../common/Button/Button";
import EditProfileCard from "../ChangeProfile/EditProfileCard";

const UserCard = React.memo(props => {
    let {aboutMe, contacts, lookingForAJob, lookingForAJobDescription, fullName, userId, photos} = props.userData;

    return(
        <div className={s.section}>
            <div className={s.avatar}>
                <LargeAvatar src={photos.large} setNewProfilePhoto={props.setNewProfilePhoto} itsMe={props.itsMe}/>
            </div>
            <div className={s.infoWrap}>
                <div className={s.info}>
                    <UserStatus status={props.status} changeUserStatus={props.changeUserStatus} itsMe={props.itsMe}/>
                    <UserAbout aboutMe={aboutMe} fullName={fullName}/>
                </div>
                <VerifyElem text={'Looking for a job'} verify={lookingForAJob}/>
                <p>Looking for a job description: {lookingForAJobDescription}</p>
                {props.itsMe && <EditProfileCard sendEditProfileData={props.sendEditProfileData} {...props.userData}/>}
            </div>

            <SocialBlock contacts={contacts}/>
        </div>
    )
});

export default UserCard;