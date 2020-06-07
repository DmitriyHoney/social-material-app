export const getUserCard                    = state => state.profilePage.userCard;
export const isInitialized                  = state => state.profilePage.isInitialized;
export const getUserStatus                  = state => state.profilePage.userStatus;
export const isUserCheck                    = state => state.profilePage.isUserCheck;
export const getItsMe                       = state => state.profilePage.itsMe;

//AuthReducer
export const getAuthStateUserSelector       = state => state.authPage.isAuth;
export const getCapthcaUrl                  = state => state.authPage.captchaUrl;

//UsersPage
export const getUsersList                   = state => state.usersPage.items;
export const getTotalCount                  = state => state.usersPage.totalCount;
export const getCountUsers                  = state => state.usersPage.countUsers;
export const getUsersProcessingSubscribe    = state => state.usersPage.usersProcessingSubscribe;
export const getCurrentPage                 = state => state.usersPage.currentPage;

