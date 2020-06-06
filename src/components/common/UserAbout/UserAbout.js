import React from 'react';
import s from './UserAbout.module.scss';

const UserAbout = props => {
    return (
        <div className={s.section}>
            <h3 className={s.name}>
                <span>I`m</span> {props.fullName}
            </h3>
            <p className={s.about}>
                {props.aboutMe || 'User not tell about yourself'}
            </p>
        </div>
    )
};






export default UserAbout;