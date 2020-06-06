import React from 'react';
import defaultUserImg from '../../../assets/images/default-user.jpg'
import s from './SmallAvatar.module.scss';
import { NavLink } from 'react-router-dom';


const SmallAvatar = props => {
    let userUrl = `/profile/${props.id}`;
    return (
        <NavLink to={userUrl}>
            <img src={props.src || defaultUserImg} alt="user-avatar" className={s.smAvatar}/>
        </NavLink>
    )
};

export default SmallAvatar;