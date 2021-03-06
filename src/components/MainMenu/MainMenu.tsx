import "./MainMenu.scss";

import {
  setActiveCountry,
  setCountriesInfoData,
  setIsCountrySelected,
} from "../../redux/countryList-reducer";

import { NavLink } from "react-router-dom";
import React from "react";
import { connect } from "react-redux";

const MainMenu: React.FC = (props: any) => {
  const changeActiveCountry = (country: any) => {
    console.log(country);
    props.setActiveCountry(country);
  };
  return (
    <div className="MainMenu">
      MainMenu Component
      <>
        {props.countryInfoList.map((c: any) => {
          return (
            <div
              key={c.country}
              onClick={() => {
                changeActiveCountry(c);
              }}
            >
              <NavLink to="/country" style={{ textDecoration: "none" }}>
                <span>{c.country}</span>
                <span>{c.countryInfo.capital}</span>
                <span>{c.countryInfo.countryInfo}</span>
              </NavLink>
            </div>
          );
        })}
      </>
    </div>
  );
};
let mapStateToProps = (state: {
  countryList: { countryInfoList: any; activeCountry: any };
}) => {
  return {
    countryInfoList: state.countryList.countryInfoList,
    activeCountry: state.countryList.activeCountry,
  };
};

export default connect(mapStateToProps, {
  setCountriesInfoData,
  setActiveCountry,
  setIsCountrySelected,
})(MainMenu);
