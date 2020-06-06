import React from "react";
import {Field, reduxForm} from "redux-form";
import {CustomInput, CustomTextarea} from "../../../common/FormControls/FormControls";
import s from "./EditProfileForm.module.css"

const ErrorWrap = props => {
    let listError = props.error.map((e, i) => {
       return <div key={i}>{e}</div>
    });
    return(
        <ul className={s.error}>
            {listError}
        </ul>
    )
}

const EditProfileForm = props => {
    let {vk, youtube, facebook,
        github, instagram, mainLink,
        twitter, website} = props.initialValues.contacts;

    return(
        <form onSubmit={props.handleSubmit}>
            <h2>
                Edit Profile
            </h2>
            <Field component={CustomInput} placeholder={"FullName"} name={"fullName"}/>
            <Field component={CustomTextarea} placeholder={"AboutMe"} name={"aboutMe"}/>
            <div>
                <label htmlFor="lookingForAJob" htmlFor={"lookingForAJob"}>lookingForAJob</label>
                <Field component={CustomInput} placeholder={"lookingForAJob"} type={"checkbox"} id={"lookingForAJob"} name={"lookingForAJob"}/>
            </div>
            <Field component={CustomTextarea} placeholder={"lookingForAJobDescription"} name={"lookingForAJobDescription"}/>
            <div>
                <h3>Contacts:</h3>
                <div>
                    <Field component={CustomInput} placeholder={"github"} name={"contacts.github"}/>
                </div>
                <div>
                    <Field component={CustomInput} placeholder={"vk"} name={"contacts.vk"}/>
                </div>
                <div><Field component={CustomInput} placeholder={"facebook"} name={"contacts.facebook"}/></div>
                <div>
                    <Field component={CustomInput} placeholder={"instagram"} name={"contacts.instagram"}/>
                </div>
                <div>
                    <Field component={CustomInput} placeholder={"twitter"} name={"contacts.twitter"}/>
                </div>
                <div>
                    <Field component={CustomInput} placeholder={"website"} name={"contacts.website"}/>
                </div>
                <div>
                    <Field component={CustomInput} placeholder={"youtube"} name={"contacts.youtube"}/>
                </div>
                <div>
                    <Field component={CustomInput} placeholder={"mainLink"} name={"contacts.mainLink"}/>
                </div>

            </div>

            <button>Send</button>
            {props.error && <ErrorWrap error={props.error}/>}
        </form>
    )
}

/*
fullName: required(string)
aboutMe: required(integer)
lookingForAJob:
lookingForAJobDescription: required(string)
contacts:
    github: required(string)
    vk: required(string)
    facebook: required(string)
    instagram: required(string)
    twitter: required(string)
    website: required(string)
    youtube: required(string)
    mainLink: required(string)
*/


export default reduxForm({form: "edit-profile"})(EditProfileForm);