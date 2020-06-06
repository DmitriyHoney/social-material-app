import React from 'react';
import s from './VerifyElem.module.scss';


const VerifyElem = props => {

    return(
        <div className={s.section}>

            {props.text}: {props.verify
                ? <span className={s.check}><i className={`fa fa-check-circle`}></i></span>
                : <span className={s.fail}><i className={`fa fa-window-close`}></i></span>
            }
        </div>
    )
};

export default VerifyElem;