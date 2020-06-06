import React from 'react';
import Paginator from '../common/Paginator/Paginator';
import UserList from './UserList/UserList';


const Users = props => {
    let changePageNumber = num => {
        props.changeCurrentPage(num);
    };

    let allBtns = Math.ceil(props.totalCount / props.countUsers) + "0";

    return(
        <div>
            <Paginator 
                hideDisabled //скрыть неактивные
                totalItemsCount={+allBtns} //Всего кнопок
                pageRangeDisplayed={5} //кол-во кнопок за раз
                onChange={changePageNumber} //Функция по клику на кнопку
            />
            <UserList 
                users={props.users}
                toggleFollow={props.toggleFollow}
                usersProcessingSubscribe={props.usersProcessingSubscribe}
            />
        </div>
    )
};

export default Users;