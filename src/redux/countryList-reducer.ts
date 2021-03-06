import { defaultcountryInfoList } from "./countryInfoList"

const ACTION_CONST = {
    SET_COUNTRIES_INFO: 'SET_COUNTRIES_INFO',
    SET_ACTIVE_COUNTRY: 'SET_ACTIVE_COUNTRY',
    SET_IS_COUNTRY_SELECTED: 'SET_IS_COUNTRY_SELECTED',
}

let initialState = {
    countryInfoList: defaultcountryInfoList,
    activeCountry: {
        country: '',
        // countryInfo: {
        //     _id: 0,
        //     iso2: '',
        //     iso3: '',
        //     lat: 0,
        //     long: 0,
        //     flag: '',
        //     capital: '',
        //     countryInfo: '',
        //     attractions: [],
        //     video: '',
        // },
    },
    isCountrySelected: false,
}

const countryListReducer = (state = initialState, action: { type: any; countryInfoList: any; activeCountry: any; value: any }) => {
    switch (action.type) {
        case ACTION_CONST.SET_COUNTRIES_INFO: {
            return { ...state, countryInfoList: action.countryInfoList }
        }
        case ACTION_CONST.SET_ACTIVE_COUNTRY: {
            return { ...state, activeCountry: action.activeCountry }
        }
        case ACTION_CONST.SET_IS_COUNTRY_SELECTED: {
            return { ...state, isCountrySelected: action.value }
        }
        default:
            return state;
    }
}

export const setCountriesInfoData = (countryInfoList: any) => ({ type: ACTION_CONST.SET_COUNTRIES_INFO, countryInfoList })
export const setActiveCountry = (activeCountry: any) => ({ type: ACTION_CONST.SET_ACTIVE_COUNTRY, activeCountry });
export const setIsCountrySelected = (value: any) => ({ type: ACTION_CONST.SET_IS_COUNTRY_SELECTED, value });

// export const getWorldWide = () => {
//     return (dispatch: (arg0: any) => void) => {
//         countriesAPI.getWorldWide()
//             .then((data: { Global: any }) => {
//                 dispatch(setWorldWideData(data.Global));
//                 dispatch(setCovidTableWorldWideData(data.Global));
//             });
//     }
// }

// export const getCountriesInfo = () => {
//     return (dispatch: (arg0: { type: string; countryInfoList: any }) => void) => {
//         countriesAPI.getCountriesInfo()
//             .then((data: any) => {
//                 dispatch(setCountriesInfoData(data));
//             });
//     }
// }

export default countryListReducer;
