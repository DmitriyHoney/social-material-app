import React from 'react';
import s from './Sidebar.module.scss';
import {NavLink} from "react-router-dom";

const Sidebar = props => {
    //props.show - меню расктытое или нет
    if (props.show) {

    } else {
        return(
            <div className={s.section}>
                <ul>
                    <li className={s.item}>
                        <NavLink to="/profile">
                            <i className='material-icons'>&#xe851;</i>
                        </NavLink>
                    </li>
                    <li className={s.item}>
                        <NavLink to="/dialogs">
                            <i className='material-icons'>&#xe0b7;</i>
                        </NavLink>
                    </li>
                    <li className={s.item}>
                        <NavLink to="/users">
                            <i className='material-icons'>&#xe0ba;</i>
                        </NavLink>
                    </li>
                </ul>
            </div>
        )
    }

};

export default Sidebar;