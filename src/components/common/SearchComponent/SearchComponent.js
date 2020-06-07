import React, {useEffect, useState} from 'react';
import s from './SearchComponent.module.scss';
import Button from '../Button/Button';

const SearchComponent = props => {
    let refForInput = React.createRef();
    const [findUser, setFindUser] = useState(props.findUserState);

    useEffect(() => {
        setFindUser(props.findUserState);
    }, [props.findUserState]);

    let handleButton = () => {
        props.onClick(refForInput.current)
    };
    let handleResetBtn = (e) => {
        props.setFindUserAC("");
        props.onClick();
    };
    let handleInput = (e) => {
        let inputText = e.target.value;
        props.setFindUserAC(inputText)
    }
    
    return(
        <>
            <h3>Find by name</h3>
            <div className={s.searchWrap}>
                <input placeholder={"Search"} ref={refForInput} onChange={handleInput} value={findUser}/>
                <Button value={"Search"} onClick={handleButton}/>
                <Button value={"Reset"} onClick={handleResetBtn}/>
            </div>
        </>
    )
};

export default SearchComponent;