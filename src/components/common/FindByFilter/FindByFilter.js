import React from 'react';
import s from './FindByFilter.module.scss';
import Button from '../Button/Button';

const FindByFilter = props => {
    let handleCheckbox = e => {
        props.getFilterUsers(e.target.name);
    }
    return(
        <>
            <div>
                <div>
                    <label for={"allUsers"}>All Users</label>
                    <input 
                        type={"radio"} 
                        id={"allUsers"} 
                        name={"allUsers"} 
                        checked={props.propertiesFindByFilter.allUsers} 
                        onChange={handleCheckbox}
                    />
                </div>
                <div>
                    <label for={"onlyFriends"}>Only Friends</label>
                    <input 
                        type={"radio"} 
                        id={"onlyFriends"} 
                        name={"onlyFriends"} 
                        checked={props.propertiesFindByFilter.onlyFriends} 
                        onChange={handleCheckbox}
                    />
                </div>
                <div>
                    <label for={"notFriends"}>Not Friends</label>
                    <input 
                        type={"radio"} 
                        id={"notFriends"} 
                        name={"notFriends"} 
                        checked={props.propertiesFindByFilter.notFriends} 
                        onChange={handleCheckbox}
                    />
                </div>
            </div>
        </>
    )
};

export default FindByFilter;