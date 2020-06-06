import React from 'react';
import {compose} from "redux";
import {Field, reduxForm} from "redux-form";
import Button from "../../common/Button/Button";
import {CustomInput} from "../../common/FormControls/FormControls";
import {email, required} from "../../../utils/validators";
import s from "./LoginForm.module.css";

const CaptchaElem = props => {
    return(
        <>
            <img src={props.captchaUrl} alt="captcha"/>
            <Field type="text" name={"captcha"} component={CustomInput}/>
        </>
    )
}

const LoginForm = props => {
    return (
        <form onSubmit={props.handleSubmit}>
            <Field  type="text" name={"email"} placeholder={"email"} component={CustomInput} validate={[required, email]}/>
            <Field  type="password" name={"password"} placeholder={"password"} component={CustomInput} validate={[required]}/>
            <Field type="checkbox" name={"rememberMe"} component={CustomInput}/>
            <Button value={"Send"}/>
            {props.captchaUrl && <CaptchaElem captchaUrl={props.captchaUrl}/>}
            {props.error
                && <span className={s.error}>{props.error}</span>
            }

        </form>
    )
}

export default compose(
    reduxForm({form: 'login'})
)(LoginForm);