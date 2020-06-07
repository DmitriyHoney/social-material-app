import React from "react";
import Users from "./Users.jsx";
import { compose } from "redux";
import { connect } from "react-redux";
import { getUsersThunkCallback, toggleFollowThunkCallback, setFindUserAC, setCurrentPageAC, getFilterUsersThunkCallback } from "../../Redux/users-reducer";
import { getUsersList, getTotalCount, getCountUsers, getUsersProcessingSubscribe, getCurrentPage } from "../../utils/selectors.js";
import Preloader from "../common/Preloader/Preloader.js";

let mapStateToProps = state => ({
    users: getUsersList(state),
    totalCount: getTotalCount(state),
    countUsers: getCountUsers(state),
    usersProcessingSubscribe: getUsersProcessingSubscribe(state),
    currentPage: getCurrentPage(state),
    findUserState: state.usersPage.findUser,
    propertiesFindByFilter: state.usersPage.propertiesFindByFilter,
    usersPreloader: state.usersPage.usersPreloader
});

class UsersContainer extends React.Component {
    constructor(props) {
        super(props);
    }

    componentWillMount() {
        this.props.getUsersThunkCallback();
    }

    changeCurrentPage = (pageNum) => { //Переход на другую страницу пользователей
        this.props.getUsersThunkCallback(pageNum);
    }

    searchPeople = () => { //Поиск пользователя по имени
        this.props.setCurrentPageAC(1);
        this.props.getUsersThunkCallback();
    }

    toggleFollow = userId => { //Подписаться или отписаться от другого пользователя
        this.props.toggleFollowThunkCallback(userId)
    }

    getFilterUsers = inputName => {
        this.props.getFilterUsersThunkCallback(inputName);
    }

    render() {

        return(
            <div>
                <Users 
                    users={this.props.users}
                    changeCurrentPage={this.changeCurrentPage}
                    totalCount={this.props.totalCount}
                    countUsers={this.props.countUsers}
                    toggleFollow={this.toggleFollow}
                    usersProcessingSubscribe={this.props.usersProcessingSubscribe}
                    searchPeople={this.searchPeople} 
                    setFindUserAC={this.props.setFindUserAC}
                    activePage={this.props.currentPage}
                    setCurrentPageAC={this.props.setCurrentPageAC}
                    findUserState={this.props.findUserState}
                    propertiesFindByFilter={this.props.propertiesFindByFilter}
                    getFilterUsers={this.getFilterUsers}
                    myId={this.props.myId}
                    usersPreloader={this.props.usersPreloader}
                />
            </div>
        )
    }
}


export default compose(
    connect(mapStateToProps, {getUsersThunkCallback, toggleFollowThunkCallback, setFindUserAC, setCurrentPageAC, getFilterUsersThunkCallback})
)(UsersContainer);


