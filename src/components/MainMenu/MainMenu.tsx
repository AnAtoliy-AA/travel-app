import "./MainMenu.scss";

import { LANGUAGE_CONFIG, WORDS_CONFIG } from "../../shared/words-config";
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
      <input type="text" />
      <div className="cards__container">
        {props.countryInfoList.map((c: any) => {
          const countryInfo = c.countryFullInfo.countryInfo[activeCountry];
          return (
            <div
              key={c.country}
              onClick={() => {
                changeActiveCountry(c);
              }}
            >
              <NavLink to="/country" style={{ textDecoration: "none" }}>
                <div className="main__country_card">
                  <div className="country__name">
                    <img
                      className="country-flag"
                      src={c.countryFullInfo.flag}
                      alt="flag"
                    />
                    <span>{countryInfo.countryName}</span>
                  </div>
                  <img
                    src={countryInfo.attractions[0].image}
                    alt="country"
                    className="country__image"
                  />
                  <span>
                    {activeCountry === LANGUAGE_CONFIG.native &&
                      WORDS_CONFIG.CAPITAL.native}
                    {activeCountry === LANGUAGE_CONFIG.foreign &&
                      WORDS_CONFIG.CAPITAL.foreign}
                    {activeCountry === LANGUAGE_CONFIG.additional &&
                      WORDS_CONFIG.CAPITAL.additional}
                    : {countryInfo.capital}
                  </span>
                  {/* <span>{countryInfo.aboutCountry}</span> */}
                </div>
              </NavLink>
            </div>
          );
        })}
      </div>
    </div>
  );
};
let mapStateToProps = (state: {
  countryList: { countryInfoList: Country[]; activeCountry: Country };
  activeLanguage: any;
}) => {
  return {
    countryInfoList: state.countryList.countryInfoList,
    activeCountry: state.countryList.activeCountry,
    activeLanguage: state.activeLanguage,
  };
};

export default connect(mapStateToProps, {
  setCountriesInfoData,
  setActiveCountry,
  setIsCountrySelected,
})(MainMenu);
