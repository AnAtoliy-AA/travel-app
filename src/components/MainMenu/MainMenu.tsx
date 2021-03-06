import "./MainMenu.scss";

import {
  setActiveCountry,
  setCountriesInfoData,
  setIsCountrySelected,
} from "../../redux/countryList-reducer";

import { Country } from "../../shared/interfaces";
import { NavLink } from "react-router-dom";
import React from "react";
import { connect } from "react-redux";

const MainMenu: React.FC = (props: any) => {
  const changeActiveCountry = (country: Country) => {
    props.setActiveCountry(country);
  };

  const activeCountry: string = props.activeLanguage.activeLanguage;
  return (
    <div className="MainMenu">
      MainMenu Component
      <>
        {props.countryInfoList.map((c: any) => {
          console.log(typeof c)
          const countryInfo = c.countryFullInfo.countryInfo[activeCountry];
          return (
            <div
              key={c.country}
              onClick={() => {
                changeActiveCountry(c);
              }}
            >
              <NavLink to="/country" style={{ textDecoration: "none" }}>
                <img className="country-flag" src={c.countryFullInfo.flag} alt="flag"/>
                <span>{countryInfo.countryName}</span>
                <span>{countryInfo.capital}</span>
                <span>{countryInfo.countryInfo}</span>
              </NavLink>
            </div>
          );
        })}
      </>
    </div>
  );
};
let mapStateToProps = (state: {
  countryList: { countryInfoList: Country[]; activeCountry: Country};
  activeLanguage: any 
}) => {
  return {
    countryInfoList: state.countryList.countryInfoList,
    activeCountry: state.countryList.activeCountry,
    activeLanguage: state.activeLanguage
  };
};

export default connect(mapStateToProps, {
  setCountriesInfoData,
  setActiveCountry,
  setIsCountrySelected,
})(MainMenu);
