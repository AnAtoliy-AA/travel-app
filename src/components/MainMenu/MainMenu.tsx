import "./MainMenu.scss";

import { LANGUAGE_CONFIG, WORDS_CONFIG } from "../../shared/words-config";
import React, { useState } from "react";
import {
  setActiveCountry,
  setCountriesInfoData,
  setIsCountrySelected,
} from "../../redux/countryList-reducer";

import { Country } from "../../shared/interfaces";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";

const MainMenu: React.FC = (props: any) => {
  const [searchTerm, setSearchTerm] = useState("");
  const changeActiveCountry = (country: Country) => {
    props.setActiveCountry(country);
  };

  const handleOnInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const searchValue = event.target.value;
    setSearchTerm(searchValue);
  };

  const handleOnSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
  };

  const activeLanguage: string = props.activeLanguage.activeLanguage;
  return (
    <div className="MainMenu">
      <form onSubmit={handleOnSubmit}>
        <input
          type="text"
          value={searchTerm}
          autoFocus
          autoComplete="off"
          placeholder={
            activeLanguage === LANGUAGE_CONFIG.native
              ? WORDS_CONFIG.SEARCH_INPUT_TEXT.native
              : activeLanguage === LANGUAGE_CONFIG.foreign
              ? WORDS_CONFIG.SEARCH_INPUT_TEXT.foreign
              : WORDS_CONFIG.SEARCH_INPUT_TEXT.additional
          }
          onChange={handleOnInputChange}
          className="search__input"
        />
        <button type="submit">
          {activeLanguage === LANGUAGE_CONFIG.native
            ? WORDS_CONFIG.SEARCH_BUTTON.native
            : activeLanguage === LANGUAGE_CONFIG.foreign
            ? WORDS_CONFIG.SEARCH_BUTTON.foreign
            : WORDS_CONFIG.SEARCH_BUTTON.additional}
        </button>
      </form>
      <div className="cards__container">
        {props.countryInfoList.map((c: any) => {
          const countryInfo = c.countryFullInfo.countryInfo[activeLanguage];
          if (
            countryInfo.countryName.toLowerCase().includes(searchTerm) ||
            countryInfo.capital.toLowerCase().includes(searchTerm)
          ) {
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
                      {activeLanguage === LANGUAGE_CONFIG.native &&
                        WORDS_CONFIG.CAPITAL.native}
                      {activeLanguage === LANGUAGE_CONFIG.foreign &&
                        WORDS_CONFIG.CAPITAL.foreign}
                      {activeLanguage === LANGUAGE_CONFIG.additional &&
                        WORDS_CONFIG.CAPITAL.additional}
                      : {countryInfo.capital}
                    </span>
                    {/* <span>{countryInfo.aboutCountry}</span> */}
                  </div>
                </NavLink>
              </div>
            );
          }
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
