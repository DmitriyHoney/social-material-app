import React from 'react';
import s from './Button.module.css';

const Button = props => {
    return(
        <div>
            <button disabled={props.disabled} className={s.btn} {...props}>{props.value}</button>
        </div>
    )
};

export default Button;