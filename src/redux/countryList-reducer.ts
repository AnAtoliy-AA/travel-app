import { AttractionDescription, Country } from "../shared/interfaces";

import { defaultcountryInfoList } from "./countryInfoList";
import { travelAppApi } from "../services/travel-app-api";

const ACTION_CONST = {
  SET_COUNTRIES_INFO: "SET_COUNTRIES_INFO",
  SET_ACTIVE_COUNTRY: "SET_ACTIVE_COUNTRY",
  SET_IS_COUNTRY_SELECTED: "SET_IS_COUNTRY_SELECTED",
  SET_ACTIVE_ATTRACTION: "SET_ACTIVE_ATTRACTION",
};

let initialState = {
  countryInfoList: defaultcountryInfoList,
  activeCountry: defaultcountryInfoList[0],
  isCountrySelected: false,
};

const countryListReducer = (
  state = initialState,
  action: {
    type: string;
    countryInfoList: Country[];
    activeCountry: string;
    value: boolean;
    activeAttraction: AttractionDescription;
  }
) => {
  switch (action.type) {
    case ACTION_CONST.SET_COUNTRIES_INFO: {
      return { ...state, countryInfoList: action.countryInfoList };
    }
    case ACTION_CONST.SET_ACTIVE_COUNTRY: {
      return { ...state, activeCountry: action.activeCountry };
    }
    case ACTION_CONST.SET_ACTIVE_ATTRACTION: {
      return { ...state, activeAttraction: action.activeAttraction };
    }
    case ACTION_CONST.SET_IS_COUNTRY_SELECTED: {
      return { ...state, isCountrySelected: action.value };
    }
    default:
      return state;
  }
};

export const setCountriesInfoData = (countryInfoList: Country[]) => ({
  type: ACTION_CONST.SET_COUNTRIES_INFO,
  countryInfoList,
});
export const setActiveCountry = (activeCountry: string) => ({
  type: ACTION_CONST.SET_ACTIVE_COUNTRY,
  activeCountry,
});
export const setIsCountrySelected = (value: boolean) => ({
  type: ACTION_CONST.SET_IS_COUNTRY_SELECTED,
  value,
});
export const setActiveAttraction = (
  activeAttraction: AttractionDescription
) => ({ type: ACTION_CONST.SET_ACTIVE_ATTRACTION, activeAttraction });

export const getAllCountriesInfo = () => async (
  dispatch: (arg0: { type: string; countryInfoList: any }) => void
) => {
  const response = await travelAppApi.getAllCountries();

  dispatch(setCountriesInfoData(response));
};

export const updateCountryMark = (
  countryId: string,
  token: string,
  userMark: number,
  userId: string,
  userName: string
) => async (
  dispatch: (arg0: { type: string; countryInfoList: any }) => void
) => {
  const response = await travelAppApi.updateCountryMark(
    countryId,
    token,
    userMark,
    userId,
    userName
  );

  // dispatch(setCountriesInfoData(response));
};

export default countryListReducer;
