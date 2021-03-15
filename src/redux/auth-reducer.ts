import { Country } from "../shared/interfaces"
import { defaultcountryInfoList } from "./countryInfoList"
import { travelAppApi } from "../api/travel-app-api"

const ACTION_CONST = {
    // SET_IS_AUTHORIZED: 'SET_IS_AUTHORIZED',
    // SET_TOKEN: 'SET_TOKEN',
    SET_USER_DATA: 'SET_USER_DATA'
    // SET_IS_COUNTRY_SELECTED: 'SET_IS_COUNTRY_SELECTED',
}

let initialState = {
    userData: '',
    isAuthorized: false,
    // isCountrySelected: false,
}

const authReducer = (state = initialState, action: { type: string; isAuthorized: boolean; userData: string }) => {
    switch (action.type) {
        // case ACTION_CONST.SET_IS_AUTHORIZED: {
        //     return { ...state, isAuthorized: action.isAuthorized }
        // }
        // case ACTION_CONST.SET_TOKEN: {
        //     return { ...state, token: action.token }
        // }
        case ACTION_CONST.SET_USER_DATA: {
            return { ...state, userData: action.userData, isAuthorized : true }
        }
        default:
            return state;
    }
}

// export const setIsAuthorized = (isAuthorized: boolean) => ({ type: ACTION_CONST.SET_IS_AUTHORIZED, isAuthorized })
// export const setToken = (token: string) => ({ type: ACTION_CONST.SET_TOKEN, token });
export const setUserData = (userData: string) => ({ type: ACTION_CONST.SET_USER_DATA, userData });
// export const setIsCountrySelected = (value: boolean) => ({ type: ACTION_CONST.SET_IS_COUNTRY_SELECTED, value });

export const login = (email: string, password: string) => async (
    dispatch: (arg0: { type: string; userData: string }) => string
  ) => {
    const response = await travelAppApi.login(email, password);
  
    dispatch(setUserData(response));
    // dispatch(setIsAuthorized(true));
  };

  export const register = (userName: string, email: string, password: string) => async (
    dispatch: (arg0: { type: string; token: string }) => string
  ) => {
    const response = await travelAppApi.register(userName, email, password);
  
    // dispatch(setUserData(response));
    // dispatch(setIsAuthorized(true));
  };

export default authReducer;