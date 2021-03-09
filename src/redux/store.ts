import { applyMiddleware, combineReducers, createStore } from "redux";

import { composeWithDevTools } from 'redux-devtools-extension';
import countryListReducer from './countryList-reducer'
import languageReducer from "./language-reducer";
import thunkMiddleware from 'redux-thunk';

let reducers = combineReducers({
    countryList: countryListReducer,
    activeLanguage: languageReducer,
})

let initialState = {};

let store = createStore(reducers,
    localStorage.reduxState ? JSON.parse(localStorage.reduxState) : initialState,
    composeWithDevTools(applyMiddleware(thunkMiddleware)));

    store.subscribe(
        () => (localStorage.reduxState = JSON.stringify(store.getState()))
      );

export default store;