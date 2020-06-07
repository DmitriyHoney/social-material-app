import { usersApi } from "../api/api";

const SET_USERS                         = 'bank-app/users-reducer/SET_USERS';
const SET_TOTAL_COUNT                   = 'bank-app/users-reducer/SET_TOTAL_COUNT';
const SET_CURRENT_PAGE                  = 'bank-app/users-reducer/SET_CURRENT_PAGE';
const TOGGLE_SUBSCRIBE_ON_USER          = 'bank-app/users-reducer/TOGGLE_SUBSCRIBE_ON_USER';
const TOGGLE_USER_TO_STACK              = 'bank-app/users-reducer/ADD_USER_TO_STACK';
const SET_FIND_USER                     = 'bank-app/users-reducer/SET_FIND_USER';
const SET_PROPERTIES_BY_FILTER          = 'bank-app/users-reducer/SET_PROPERTIES_BY_FILTER';
const SET_FRIEND_PROPERTY               = 'bank-app/users-reducer/SET_FRIEND_PROPERTY';
const TOGGLE_USERS_PRELOADER               = 'bank-app/users-reducer/TOGGLE_USERS_PRELOADER';

let initialState = {
    items: [
        {
            name: "Дмитрий Большаков",
            id: 6722,
            uniqueUrlName: null,
            photos: {
                small: "https://social-network.samuraijs.com/activecontent/images/users/6722/user-small.jpg?v=1",
                large: "https://social-network.samuraijs.com/activecontent/images/users/6722/user.jpg?v=1"
            },
            status: "Создать себя",
            followed: false
        },
        {
            name: "Дмитрий Дерид",
            id: 6639,
            uniqueUrlName: null,
            photos: {
                small: "https://social-network.samuraijs.com/activecontent/images/users/6639/user-small.jpg?v=1",
                large: "https://social-network.samuraijs.com/activecontent/images/users/6639/user.jpg?v=1"
            },
            status: "Всем , привет!!!",
            followed: true
        },
    ],
    totalCount: null, //Всего пользователей
    error: null,
    currentPage: 1, //Текущая страница
    friend: "", //Отображать только друзей,
    findUser: "", //Поиск по имени
    countUsers: 7, //Кол-во пользователей на странице,
    usersProcessingSubscribe: [], //Пользователи в процессе подписки (нажали подписаться и пока ждём ответа от серва этот пользователь добавлен в очередь)
    propertiesFindByFilter: {
        allUsers: true,
        onlyFriends: false,
        notFriends: false
    },
    usersPreloader: true
};

const usersReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_USERS:
            return {
                ...state,
                items: [...action.users]
            }
        case SET_TOTAL_COUNT:
            return {
                ...state,
                totalCount: action.totalCount
            }
        case SET_CURRENT_PAGE:
            return {
                ...state,
                currentPage: action.newPageNumber
            }
        case TOGGLE_SUBSCRIBE_ON_USER:
            return {
                ...state,
                items: state.items.map(user => {
                    if (user.id === action.userId) {
                        return {...user, followed: !user.followed}
                    }
                    return user;
                })
            }
        case SET_FIND_USER:
            return {
                ...state,
                findUser: action.findUser
            }
        case TOGGLE_USERS_PRELOADER:
            return {
                ...state,
                usersPreloader: action.bool
            }
        case TOGGLE_USER_TO_STACK:
            if (action.bool) {
                return {
                    ...state,
                    usersProcessingSubscribe: [...state.usersProcessingSubscribe, action.userId] 
                }
            }
            return {
                ...state,
                usersProcessingSubscribe: state.usersProcessingSubscribe.filter(id => id !== action.userId)
            }
        case SET_PROPERTIES_BY_FILTER:
            return {
                ...state,
                propertiesFindByFilter: {...action.obj}
            }
        case SET_FRIEND_PROPERTY:
            return {
                ...state,
                friend: action.value
            }
        default:
            return state;
    }
};

function plunkRadioObject(obj, key) { //iterateObj prop = true, another prop = false 
    for(let localKey in obj) {
        if(String(localKey) === key) obj[localKey] = true;
        else obj[localKey] = false;
    }
    return obj;
}

//ActionCreators
export const setUsersFromApiAC = users                      => ({type: SET_USERS, users});
export const setTotalCountAC = totalCount                   => ({type: SET_TOTAL_COUNT, totalCount});
export const setCurrentPageAC = newPageNumber               => ({type: SET_CURRENT_PAGE, newPageNumber});
export const toggleSubscribeOnUserAC = userId               => ({type: TOGGLE_SUBSCRIBE_ON_USER, userId}); //Подписывается или отписывается на пользователя
export const toggleUserToStackSubscribe = (userId, bool)    => ({type: TOGGLE_USER_TO_STACK, userId, bool}); //Добавить пользователя в очередь во время подписки или отписки
export const setFindUserAC = findUser                       => ({type: SET_FIND_USER, findUser}); 
export const setPropertiesFindByFilterAC = obj              => ({type: SET_PROPERTIES_BY_FILTER, obj}); 
export const setFriendPropertyAC = value                    => ({type: SET_FRIEND_PROPERTY, value}); 
export const toggleUsersPreloader = bool                    => ({type: TOGGLE_USERS_PRELOADER, bool}); 

//ThunkCreators
export const getUsersThunkCallback = (pageNumber = 1) => async (dispatch, getState) => { //Получить пользователей
    dispatch(toggleUsersPreloader(true));
    let countUsers = getState().usersPage.countUsers; //Кол-во пользователей на странице
    let friend = getState().usersPage.friend; //Ищем только друзей или только не друзей
    let findUser = getState().usersPage.findUser; //Искомы пользователь
    dispatch(setCurrentPageAC(pageNumber)) //Установили текущую страницу

    let response = await usersApi.getUsersPage(pageNumber, countUsers, friend, findUser);
    dispatch(toggleUsersPreloader(false));
    
    dispatch(setUsersFromApiAC(response.data.items)) //Установили пользователей в store
    dispatch(setTotalCountAC(response.data.totalCount)); //Установили в store сколько всего пользователей
};


export const toggleFollowThunkCallback = userId => async dispatch => { //Отписаться || Подписаться на пользователя
    dispatch(toggleUserToStackSubscribe(userId, true)); //Добавлем пользователя в очередь на подписку
    let getFollowStateResponse  = await usersApi.getFollowStateOnUser(userId), //Узнаём подписанны мы или нет
        isFollow                = getFollowStateResponse.data,
        response;

    if (isFollow) response = await usersApi.unFollowOnUser(userId); //Если подписанны отписываемся
    else response = await usersApi.followOnUser(userId); //Если не подписанны подписываемся
    
    if (response.data.resultCode === 0) dispatch(toggleSubscribeOnUserAC(userId)); //Если всё хорошо меняем store
    dispatch(toggleUserToStackSubscribe(userId, false)); //Удаляем пользователя в очередь на подписку
};


export const getFilterUsersThunkCallback = inpuntName => async (dispatch, getState) => { //Получить пользователей в соответствии с фильтром 
    let usersFilterObj = plunkRadioObject(getState().usersPage.propertiesFindByFilter, inpuntName);
    dispatch(setPropertiesFindByFilterAC(usersFilterObj));
    switch(inpuntName) {
        case "allUsers":
            dispatch(setFriendPropertyAC(""));
            break;
        case "onlyFriends":
            dispatch(setFriendPropertyAC(true));
            break;
        case "notFriends":
            dispatch(setFriendPropertyAC(false));
            break;
    }
    dispatch(getUsersThunkCallback());
};



export default usersReducer;