import React from 'react';
import s from './ButtonGhost.module.scss';

const Button = props => {
    return(
        <div>
            <button disabled={props.disabled} className={s.btnGhost} {...props}>{props.value}</button>
        </div>
    )
};

export default Button;