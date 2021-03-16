import { Country } from "../shared/interfaces"
import { defaultcountryInfoList } from "./countryInfoList"
import { travelAppApi } from "../api/travel-app-api"

const ACTION_CONST = {
    SET_USER_DATA: 'SET_USER_DATA',
    SET_DEFAULT_VALUES: 'SET_DEFAULT_VALUES',
}

const DEFAULT_VALUES = {
  EMPTY: '',
  TRUE: true,
  FALSE: false,
}

let initialState = {
    userData: DEFAULT_VALUES.EMPTY,
    isAuthorized: DEFAULT_VALUES.FALSE,
}

const authReducer = (state = initialState, action: { type: string; isAuthorized: boolean; userData: string }) => {
    switch (action.type) {
        case ACTION_CONST.SET_USER_DATA: {
            return { ...state, userData: action.userData, isAuthorized : DEFAULT_VALUES.TRUE }
        }
        case ACTION_CONST.SET_DEFAULT_VALUES: {
          return { ...state, isAuthorized : DEFAULT_VALUES.FALSE, token: DEFAULT_VALUES.EMPTY }
      }
        default:
            return state;
    }
}

export const setUserData = (userData: string) => ({ type: ACTION_CONST.SET_USER_DATA, userData });

export const logout = () => ({type: ACTION_CONST.SET_DEFAULT_VALUES});

export const login = (email: string, password: string) => async (
    dispatch: (arg0: { type: string; userData: string }) => string
  ) => {
    const response = await travelAppApi.login(email, password);
  
    dispatch(setUserData(response));
  };

  export const register = (userName: string, email: string, password: string, image?: any) => async (
    dispatch: (arg0: { type: string; userData: string  }) => string
  ) => {
    const response = await travelAppApi.register(userName, email, password, image);
  
    dispatch(setUserData(response));
  };

export default authReducer;