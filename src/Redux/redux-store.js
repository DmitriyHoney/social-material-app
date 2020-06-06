import {applyMiddleware, combineReducers, compose, createStore} from "redux";
import profileReducer from "./profile-reducers";
import thunkMiddleware from 'redux-thunk';
import { reducer as formReducer } from 'redux-form'
import authReducer from "./auth-reducer";
import usersReducer from "./users-reducer";


const reducers = combineReducers({
    profilePage: profileReducer,
    authPage: authReducer,
    usersPage: usersReducer,
    form: formReducer
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(reducers, composeEnhancers(
    applyMiddleware(thunkMiddleware)
));



window.store = store;

export default store;