import "./CountryScreen.scss";

import { NavLink } from "react-router-dom";
import React from "react";
import { connect } from "react-redux";

const CountryScreen: React.FC = (props: any) => {
  const activeCountryInfo =
    props.activeCountry.countryFullInfo.countryInfo[
      props.activeLanguage.activeLanguage
    ];
  return (
    <div className="CountryScreen">
      CountryScreen Component
      <span>{activeCountryInfo.countryName}</span>
      <span>{activeCountryInfo.capital}</span>
      <span>{activeCountryInfo.aboutCountry}</span>
      <NavLink to="/" style={{ textDecoration: "none" }}>
        RETURN BACK
      </NavLink>
    </div>
  );
};

let mapStateToProps = (state: {
  countryList: { countryInfoList: any; activeCountry: any };
  activeLanguage: any;
}) => {
  return {
    activeCountry: state.countryList.activeCountry,
    activeLanguage: state.activeLanguage,
  };
};
export default connect(mapStateToProps, {})(CountryScreen);
