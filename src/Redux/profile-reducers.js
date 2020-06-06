import {profileApi} from "../api/api";
import {stopSubmit} from "redux-form";

const SET_USER_DATA = 'bank-app/profile-reducer/SET_USER_DATA';
const SET_INITIALIZED = 'bank-app/profile-reducer/SET_INITIALIZED';
const SET_USER_STATUS = 'bank-app/profile-reducer/SET_USER_STATUS';
const SET_UNKNOWN_USER = 'bank-app/profile-reducer/SET_UNKNOWN_USER';
const SET_NEW_PHOTOS = 'bank-app/profile-reducer/SET_NEW_PHOTOS';
const ITS_ME = 'bank-app/auth-reducer/ITS_ME';

let initialState = {
    isInitialized: false,
    userStatus: '',
    isUserCheck: false,
    itsMe: false,
    userCard: {
        aboutMe: null,
        contacts: {
            facebook: null,
            website: null,
            vk: null,
            twitter: null,
            instagram: null,
            youtube: null,
            github: null,
            mainLink: null
        },
        lookingForAJob: false,
        lookingForAJobDescription: null,
        fullName: null,
        userId: null,
        photos: {
            small: null,
            large: null
        }
    }

};

const profileReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_USER_DATA:
            return {
                ...state,
                userCard: {...action.dataFromApi}
            }
        case SET_INITIALIZED:
            return {
                ...state,
                isInitialized: action.bool
            }
        case SET_USER_STATUS:
            return {
                ...state,
                userStatus: action.userStatus
            }
        case SET_UNKNOWN_USER:
            return {
                ...state,
                isUserCheck: action.bool
            }
        case SET_NEW_PHOTOS:
            return {
                ...state,
                userCard: {
                    ...state.userCard,
                    photos: {...action.photos}
                }
            }
        case ITS_ME:
            return {
                ...state,
                itsMe: action.bool
            }
        default:
            return state;
    }
};

//ActionCreators
export const setUserData = dataFromApi => ({type: SET_USER_DATA, dataFromApi});
export const setInitialized = bool => ({type: SET_INITIALIZED, bool});
export const setUserStatus = userStatus => ({type: SET_USER_STATUS, userStatus});
export const setUnknownUser = bool => ({type: SET_UNKNOWN_USER, bool});
export const setNewPhotoAC = photos => ({type: SET_NEW_PHOTOS, photos});
export const itsMeAC = bool => ({type: ITS_ME, bool}); //Установить данная страничка профиля моя или нет

//ThunkCreators
export const getCurrentUserDataThunkCreator = userId => async (dispatch, getState) => {
    let currentUserId = getState().authPage.userTechnicalData.id;
    let resultId =  Number(userId || currentUserId);

    if (resultId === currentUserId) {
        dispatch(itsMeAC(true))
    } else {
        dispatch(itsMeAC(false))
    }
    dispatch(setInitialized(false));
    let response = await profileApi.getUserData(resultId)
    dispatch(setInitialized(true));
    dispatch(setUserData(response.data));
    dispatch(setUnknownUser(true))
};

export const getUserStatusThunkCreator = userId => async (dispatch, getState) => {
    let currentUserId = getState().authPage.userTechnicalData.id;
    let resultId =  userId || currentUserId;
    const response = await profileApi.getUserStatus(resultId);
    dispatch(setUserStatus(response.data));
};

export const setUserStatusThunkCreator = newStatusText => async dispatch => {
    await profileApi.setUserStatus(newStatusText);
    dispatch(setUserStatus(newStatusText));
}

export const setNewProfilePhotoThunkCallback = photoFile => async dispatch => {
    let formData = new FormData();
    formData.append("image", photoFile);
    let response = await profileApi.setNewProfilePhoto(formData);
    console.log("1");
    if (response.data.resultCode === 0) {
        dispatch(setNewPhotoAC(response.data.data.photos));
    }
}

export const sendEditProfileDataThunkCallback = formData => async (dispatch, getState) => {
    let userId = getState().profilePage.userCard.userId;
    let response = await profileApi.setEditProfileData(formData);
    if (response.data.resultCode === 0) {
        dispatch(getCurrentUserDataThunkCreator(userId));
    } else if (response.data.resultCode === 1){
        let messages = response.data.messages.length > 0 ? response.data.messages : 'UnknownError'
        dispatch(stopSubmit("edit-profile", {_error: messages}));
        return Promise.reject(messages);
    }
}

export default profileReducer;