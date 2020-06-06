import React, {useState} from "react";
import s from "./EditProfileCard.module.scss";
import EditProfileForm from "./EditProfileForm/EditProfileForm";

const EditProfileCard = props => {

    const [editMode, setEditMode] = useState(false);
    let onSubmit = formData => {
        let contacts = {
            vk: formData.contacts.vk,
            youtube: formData.contacts.youtube,
            facebook: formData.contacts.facebook,
            github: formData.contacts.github,
            instagram: formData.contacts.instagram,
            mainLink: formData.contacts.mainLink,
            twitter: formData.contacts.twitter,
            website: formData.contacts.website
        };
        let promise = props.sendEditProfileData({...formData, contacts});
        promise.then(
            () => setEditMode(false),
            () => setEditMode(true)
        )
    }

    let currentElement = <button onClick={() => setEditMode(true)}>Edit Profile</button>;

    if (editMode) {
        currentElement = (
            <EditProfileForm onSubmit={onSubmit} initialValues={props}/>
        );
    }

    return(
        <div className={s.editProfileWrap}>
            {currentElement}
        </div>
    )
};

export default EditProfileCard;

