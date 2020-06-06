import React from 'react';
import Button from '../../common/Button/Button';
import s from './UserList.module.scss';
import SmallAvatar from '../../common/SmallAvatar/SmallAvatar';


const UserList = props => {
    let listOfUsers = props.users.map(oneUser => {
        let {id, photos, name, status, followed} = oneUser;
        let toggleFollow = (userId) => {
            props.toggleFollow(userId)
        }

        return(
            <div key={id}>
                <div>
                    <SmallAvatar 
                        src={photos.small} 
                        id={id}
                    />
                    <h3>{name}</h3>
                </div>
                <p>
                    {status || "No status"}
                </p>
                <Button 
                    value={followed ? "Unfollow" : "Follow"} 
                    onClick={() => toggleFollow(id)} 
                    disabled={props.usersProcessingSubscribe.some(elem => elem === id)}
                />
            </div>
        )
    });

    return <div>{listOfUsers}</div>
};

export default UserList;