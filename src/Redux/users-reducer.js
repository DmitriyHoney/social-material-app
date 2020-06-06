import { usersApi } from "../api/api";

const SET_USERS = 'bank-app/users-reducer/SET_USERS';
const SET_TOTAL_COUNT = 'bank-app/users-reducer/SET_TOTAL_COUNT';
const SET_CURRENT_PAGE = 'bank-app/users-reducer/SET_CURRENT_PAGE';
const TOGGLE_SUBSCRIBE_ON_USER = 'bank-app/users-reducer/TOGGLE_SUBSCRIBE_ON_USER';
const TOGGLE_USER_TO_STACK = 'bank-app/users-reducer/ADD_USER_TO_STACK';

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
    friend: null, //Отображать только друзей
    countUsers: 7, //Кол-во пользователей на странице,
    usersProcessingSubscribe: [] //Пользователи в процессе подписки (нажали подписаться и пока ждём ответа от серва этот пользователь добавлен в очередь)
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
            
        default:
            return state;
    }
};

//ActionCreators
export const setUsersFromApiAC = users => ({type: SET_USERS, users});
export const setTotalCountAC = totalCount => ({type: SET_TOTAL_COUNT, totalCount});
export const setCurrentPageAC = newPageNumber => ({type: SET_CURRENT_PAGE, newPageNumber});
export const toggleSubscribeOnUserAC = userId => ({type: TOGGLE_SUBSCRIBE_ON_USER, userId}); //Подписывается или отписывается на пользователя
export const toggleUserToStackSubscribe = (userId, bool) => ({type: TOGGLE_USER_TO_STACK, userId, bool}); //Добавить пользователя в очередь во время подписки или отписки

//ThunkCreators
export const getUsersThunkCallback = pageNumber => async (dispatch, getState) => { //Получить пользователей
    let countUsers = getState().usersPage.countUsers;
    let friend = getState().usersPage.friend;
    let response = await usersApi.getUsersPage(pageNumber, countUsers, friend);
    dispatch(setCurrentPageAC(pageNumber)) //Установили текущую страницу
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


export default usersReducer;