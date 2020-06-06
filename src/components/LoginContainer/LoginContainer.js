import React from 'react';
import LoginForm from "./LoginForm/LoginForm";
import {compose} from "redux";
import {connect} from "react-redux";
import {setUserLoginDataThunkCallback} from "../../Redux/auth-reducer";
import {getAuthStateUserSelector, getCapthcaUrl} from "../../utils/selectors";
import {Redirect} from "react-router-dom";

let mapStateToProps = state => ({
    captchaUrl: getCapthcaUrl(state)
});

class LoginContainer extends React.Component {
    render() {
        let onSubmit = (formData) => {
            this.props.setUserLoginDataThunkCallback(formData)
        }

        if (this.props.isAuth) {
            return <Redirect to={"/profile"} />
        }


        return (
            <div>
                <LoginForm onSubmit={onSubmit} captchaUrl={this.props.captchaUrl}/>
            </div>
        )
    }
}

export default compose(
    connect(mapStateToProps, {setUserLoginDataThunkCallback})
)(LoginContainer);