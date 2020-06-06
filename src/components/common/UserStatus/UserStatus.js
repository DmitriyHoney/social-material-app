import React, {useEffect, useState} from 'react';
import s from './UserStatus.module.scss';

const UserStatus = React.memo(props => {
    const [editMode, setEditMode] = useState(false);
    const [statusText, setStatusText] = useState(props.status);

    let onEditMode = () => {
        if (props.itsMe) {
            setEditMode(true);
        }
    };
    let offEditMode = (e) => {
        setEditMode(false);
        if (props.status !== statusText) props.changeUserStatus(statusText);
    };
    let handleInput = (e) => {
        setStatusText(e.target.value);
    };

    useEffect(() => {
        setStatusText(props.status)
    }, [props.status])

    if (!editMode) return<div className={s.section} onDoubleClick={onEditMode}>{statusText || setStatusText('SET STATUS')}</div>
    else return<input type="text" value={statusText} onChange={handleInput} onBlur={offEditMode} autoFocus className={s.input}/>
});

export default UserStatus;