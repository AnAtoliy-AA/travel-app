import { applyMiddleware, combineReducers, createStore } from "redux";

import { composeWithDevTools } from 'redux-devtools-extension';
import countryListReducer from './countryList-reducer'
import thunkMiddleware from 'redux-thunk';

let reducers = combineReducers({
    countryList: countryListReducer,
})

let store = createStore(reducers, composeWithDevTools(applyMiddleware(thunkMiddleware)));

export default store;