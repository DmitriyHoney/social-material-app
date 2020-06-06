import React from "react";
import {Redirect, Route} from "react-router-dom";
//Styles
import "./App.scss";
//Components
import Preview from "./components/common/Preview/Preview";
import Header from "./components/Header/Header";
import Sidebar from "./components/Sidebar/Sidebar";
import Users from "./components/Users/Users";
import Dialogs from "./components/Dialogs/Dialogs";
import ProfileContainer from "./components/Profile/ProfileContainer";
import LoginContainer from "./components/LoginContainer/LoginContainer";
import {compose} from "redux";
import {connect} from "react-redux";
import {
    getInitializedStateThunkCallback, logoutThunkCallback,
    setUserLoginDataThunkCallback
} from "./Redux/auth-reducer";
import {getAuthStateUserSelector} from "./utils/selectors";
import Preloader from "./components/common/Preloader/Preloader";


let mapStateToProps = state => ({
    isAuth: getAuthStateUserSelector(state),
    initialized: state.authPage.initialized,
    login: state.authPage.userTechnicalData.login
});


class App extends React.PureComponent {
    componentDidMount() {
        this.props.getInitializedStateThunkCallback();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps !== this.props || prevState !== this.state) {
            return true;
        }
    }

    render() {
        if(!this.props.initialized) return <Preloader/>;
        return (
            <div className="App">
                <Header isAuth={this.props.isAuth} login={this.props.login} logoutThunkCallback={this.props.logoutThunkCallback}/>
                <Sidebar/>
                <div className="content">
                    <Route path={'/users'} render={() => <Users/>}/>
                    <Route path={'/dialogs'} render={() => <Dialogs/>}/>
                    <Route path={'/profile/:userId?'} render={() => <ProfileContainer isAuth={this.props.isAuth}/>}/>
                    <Route path={'/login'} render={() => <LoginContainer isAuth={this.props.isAuth}/>}/>
                </div>
                {/*<Preview/>*/}    
            </div>
        )
    }
}

export default compose(
    connect(mapStateToProps, {setUserLoginDataThunkCallback, getInitializedStateThunkCallback, logoutThunkCallback})
)(App);
