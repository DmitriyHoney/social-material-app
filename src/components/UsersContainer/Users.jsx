import React from 'react';
import Paginator from '../common/Paginator/Paginator';
import UserList from './UserList/UserList';
import SearchComponent from '../common/SearchComponent/SearchComponent';
import FindByFilter from '../common/FindByFilter/FindByFilter';
import Preloader from '../common/Preloader/Preloader';


const Users = props => {
    let changePageNumber = (pageNumber) => {
        props.changeCurrentPage(pageNumber);
    };

    let handleSearchBtn = inputSearch => {
        if (inputSearch) props.searchPeople(inputSearch.value);
        props.searchPeople();
    }

    let allBtns = Number(Math.ceil(props.totalCount / props.countUsers) + "0");

    return(
        <div>
            {allBtns > 10
                && (
                    <Paginator 
                        hideDisabled //скрыть неактивные
                        totalItemsCount={allBtns} //Всего кнопок
                        pageRangeDisplayed={5} //кол-во кнопок за раз
                        onChange={changePageNumber} //Функция по клику на кнопку
                        activePage={props.activePage}
                        setCurrentPageAC={props.setCurrentPageAC}
                    />
                )
            }
            <SearchComponent 
                onClick={handleSearchBtn}
                setFindUserAC={props.setFindUserAC}
                findUserState={props.findUserState}
            />
            <FindByFilter 
                propertiesFindByFilter={props.propertiesFindByFilter}
                getFilterUsers={props.getFilterUsers}
            />
            {props.usersPreloader 
                ? <Preloader />
                : (
                    <UserList 
                        myId={props.myId}
                        users={props.users}
                        toggleFollow={props.toggleFollow}
                        usersProcessingSubscribe={props.usersProcessingSubscribe}
                    />
                )
             }
            
        </div>
    )
};

export default Users;