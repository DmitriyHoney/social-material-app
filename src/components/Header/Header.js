import React from 'react';
import s from './Header.module.css';
import Logotype from "../common/Logotype/Logotype";

const Header = props => {
    return(
        <header className={s.section}>
            <Logotype />
        </header>
    )
};

export default Header;