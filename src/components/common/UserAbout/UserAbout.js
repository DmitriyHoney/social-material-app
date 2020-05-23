import React from 'react';
import s from './UserAbout.module.css';

const UserAbout = props => {
    return(
        <div className={s.section}>
            <h3>
                I`m {'Bolshakov Dmitry'}
            </h3>

            <div>
                Social
            </div>
        </div>
    )
};



export default UserAbout;