import { applyMiddleware, combineReducers, createStore } from "redux";

import authReducer from "./auth-reducer";
import { composeWithDevTools } from 'redux-devtools-extension';
import countryListReducer from './countryList-reducer'
import languageReducer from "./language-reducer";
import searchFormReducer from "./searchForm-reducer";
import thunkMiddleware from 'redux-thunk';

let reducers = combineReducers({
    countryList: countryListReducer,
    activeLanguage: languageReducer,
    authStore: authReducer,
    searchForm: searchFormReducer,
})

let initialState = {};

let store = createStore(reducers,
    localStorage.reduxState ? JSON.parse(localStorage.reduxState) : initialState,
    composeWithDevTools(applyMiddleware(thunkMiddleware)));

    store.subscribe(
        () => (localStorage.reduxState = JSON.stringify(store.getState()))
      );

export default store;