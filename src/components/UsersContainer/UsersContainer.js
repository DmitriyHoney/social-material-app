import React from "react";
import Users from "./Users.jsx";
import { compose } from "redux";
import { connect } from "react-redux";
import { getUsersThunkCallback, toggleFollowThunkCallback } from "../../Redux/users-reducer";
import { getUsersList, getTotalCount, getCountUsers, getUsersProcessingSubscribe } from "../../utils/selectors.js";

let mapStateToProps = state => ({
    users: getUsersList(state),
    totalCount: getTotalCount(state),
    countUsers: getCountUsers(state),
    usersProcessingSubscribe: getUsersProcessingSubscribe(state)
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

    toggleFollow = userId => { //Подписаться или отписаться от другого пользователя
        this.props.toggleFollowThunkCallback(userId)
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
                />
            </div>
        )
    }
}


export default compose(
    connect(mapStateToProps, {getUsersThunkCallback, toggleFollowThunkCallback})
)(UsersContainer);


