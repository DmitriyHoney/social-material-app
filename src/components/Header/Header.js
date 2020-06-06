import React from 'react';
import s from './Header.module.scss';
import Logotype from "../common/Logotype/Logotype";
import Button from "../common/Button/Button";
import ButtonGhost from "../common/ButtonGhost/ButtonGhost";


const Header = props => {
    let handleLogoutBtn = () => {
        props.logoutThunkCallback();
    }
    let btnLog = (
        props.isAuth
            && <div>{props.login}<ButtonGhost value={"Logout"} onClick={handleLogoutBtn}/></div>
    );
    return(
        <header className={s.section}>
            <Logotype />
            {btnLog}
        </header>
    )
};

export default Header;