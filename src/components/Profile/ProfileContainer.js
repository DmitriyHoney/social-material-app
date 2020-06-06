import React, {PureComponent} from 'react';
import Profile from "./Profile";
import {compose} from "redux";
import {withRouter} from "react-router-dom";
import {connect} from "react-redux";
import {getCurrentUserDataThunkCreator, getUserStatusThunkCreator, setUserStatusThunkCreator,
    setNewProfilePhotoThunkCallback, sendEditProfileDataThunkCallback} from "../../Redux/profile-reducers";
import Preloader from "../common/Preloader/Preloader";
import {getItsMe, getUserCard, getUserStatus, isInitialized, isUserCheck} from "../../utils/selectors";
import {withLoginRedirect} from "../../hoc/withLoginRedirect";

let mapStateToProps = state => ({
    userCard: getUserCard(state),
    isInitialized: isInitialized(state),
    status: getUserStatus(state),
    isUserCheck: isUserCheck(state),
    itsMe: getItsMe(state)
});

class ProfileContainer extends React.Component {
    componentDidMount() {
        this.requestUserData()
    }

    requestUserData() {

        let userId = this.props.match.params.userId;
        this.props.getCurrentUserDataThunkCreator(userId);
        this.props.getUserStatusThunkCreator(userId);
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.match.params.userId !== prevProps.match.params.userId) {
            this.requestUserData();
        }
    }

    changeUserStatus = (newStatus) => {
        this.props.setUserStatusThunkCreator(newStatus);
    }

    setNewProfilePhoto = (photoFile) => { //Отправка новой фотографии пользователя
        this.props.setNewProfilePhotoThunkCallback(photoFile);
    }

    sendEditProfileData = formData => { //Отправка новых данных пользователя
        return this.props.sendEditProfileDataThunkCallback(formData);
    }

    render() {
        console.log('Render');
        if(!this.props.isInitialized) return <Preloader/>;
        return (
            <div>
                <Profile
                    userCard={this.props.userCard}
                    status={this.props.status}
                    changeUserStatus={this.changeUserStatus}
                    isUserCheck={this.props.isUserCheck}
                    setNewProfilePhoto={this.setNewProfilePhoto}
                    sendEditProfileData={this.sendEditProfileData}
                    itsMe={this.props.itsMe}
                />
            </div>
        )
    }
}


export default compose(
    connect(mapStateToProps, {getCurrentUserDataThunkCreator, getUserStatusThunkCreator, setUserStatusThunkCreator,
        setNewProfilePhotoThunkCallback, sendEditProfileDataThunkCallback}),
    withLoginRedirect,
    withRouter
)(ProfileContainer);