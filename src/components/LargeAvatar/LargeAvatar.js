import React from 'react';
import s from './LargeAvatar.module.css';
import defaultUser from '../../assets/images/default-user.png'

const LargeAvatar = props => {
    return(
        <div>
            <img src={props.src || defaultUser} alt="avatar" className={s.avatar}/>
        </div>
    )
};

export default LargeAvatar;