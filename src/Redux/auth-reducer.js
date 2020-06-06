import {authApi} from "../api/api";
import {stopSubmit} from "redux-form";


const TOGGLE_USER_AUTH = 'bank-app/auth-reducer/TOGGLE_USER_AUTH';
const SET_LOGIN_USER_DATA = 'bank-app/auth-reducer/SET_LOGIN_USER_DATA';
const SET_INITIALIZED = 'bank-app/auth-reducer/SET_INITIALIZED';
const LOGOUT_USER = 'bank-app/auth-reducer/LOGOUT_USER';
const GET_CAPTCHA = 'bank-app/auth-reducer/GET_CAPTCHA';


let initialState = {
    isAuth: false, //Пользователь авторизован или нет,
    userTechnicalData: {
        id: null,
        email: null,
        login: null
    },
    initialized: false,
    captchaUrl: null
};

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case TOGGLE_USER_AUTH:
            return {
                ...state,
                isAuth: action.bool
            }
        case SET_LOGIN_USER_DATA:
            return {
                ...state,
                userTechnicalData: {...action.dataFromApi}
            }
        case SET_INITIALIZED:
            return {
                ...state,
                initialized: action.bool
            }
        case LOGOUT_USER:
            return {
                ...state,
                isAuth: false,
                userTechnicalData: {
                    id: null,
                    email: null,
                    login: null
                },
                initialized: false
            }
        case GET_CAPTCHA:
            return {
                ...state,
                captchaUrl: action.captchaUrl
            }
        default:
            return state;
    }
};

//ActionCreators
export const toggleUserAuthState = bool => ({type: TOGGLE_USER_AUTH, bool}); //Пользователь авторизован или нет
export const setLoginUserData = dataFromApi => ({type: SET_LOGIN_USER_DATA, dataFromApi}); //Установить логин, email, id пользователя
export const setInitializeAC = bool => ({type: SET_INITIALIZED, bool}); //Установить загрузилось прилож или нет значение
export const logoutUserAC = () => ({type: LOGOUT_USER}); //Установить загрузилось прилож или нет значение
export const setCaptchaUrlAC = captchaUrl => ({type: GET_CAPTCHA, captchaUrl}); //Установить ссылку на картинку капчи, дабы потом отобразить


//ThunkCreators
export const getAuthUserThunkCallback = () => async dispatch => { // Узнать пользователь авторизован или нет
    let response = await authApi.getAuthUser();
    if (response.data.resultCode === 0) {
        dispatch(toggleUserAuthState(true)); //Пользователь авторизован  = true
        dispatch(setLoginUserData(response.data.data)); //Установливаем логин, email, id пользователя в state
    }
};
export const setUserLoginDataThunkCallback = (formData) => async dispatch => { //Пользователь хочет войти, (отправляем данные на сервер и получаем ответ)
    dispatch(setInitializeAC(false));
    let response = await authApi.setLoginUserData(formData);
    dispatch(setInitializeAC(true));
    if (response.data.resultCode === 0) {
        dispatch(getAuthUserThunkCallback())
    } else {
        let message = response.data.messages.length > 0 ? response.data.messages[0] : 'Unknown error';
        dispatch(stopSubmit('login', {_error: message}));
        if (response.data.resultCode === 10) {
            let responseCaptchaUrl = await authApi.getCaptchaUrl();
            dispatch(setCaptchaUrlAC(responseCaptchaUrl.data.url))
        }
    }
};

export const getInitializedStateThunkCallback = () => async dispatch => { //Инициализация приложения завершена?
    let promise = dispatch(getAuthUserThunkCallback());
    Promise.all([promise]).then(
        () => {
            dispatch(setInitializeAC(true))
            console.log('wow')
        }
    )
};

export const logoutThunkCallback = () => async dispatch => { //Выйти из аккаунта
    let response = await authApi.logoutUser();
    if (response.data.resultCode === 0) {
        dispatch(logoutUserAC())
        dispatch(getAuthUserThunkCallback())
        dispatch(setInitializeAC(true))
    }
};

export default authReducer;