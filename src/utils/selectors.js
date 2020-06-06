/*
userCard: state.profilePage.userCard,
isInitialized: state.profilePage.isInitialized,
status: state.profilePage.userStatus
*/

export const getUserCard = state => state.profilePage.userCard;
export const isInitialized = state => state.profilePage.isInitialized;
export const getUserStatus = state => state.profilePage.userStatus;
export const isUserCheck = state => state.profilePage.isUserCheck;
export const getItsMe = state => state.profilePage.itsMe;

//AuthReducer
export const getAuthStateUserSelector = state => state.authPage.isAuth;
export const getCapthcaUrl = state => state.authPage.captchaUrl;
