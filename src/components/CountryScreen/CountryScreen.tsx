import './CountryScreen.scss';

import CarouselLists from '../CarouselLists/CarouselLists';
import { Country } from "../../shared/interfaces";
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
      <a href={activeCountryInfo.video} target="_blank" rel="noreferrer">
        video
      </a>
      <CarouselLists attractions={activeCountryInfo.attractions} />
      <NavLink to="/" style={{ textDecoration: 'none' }}>
        RETURN BACK
      </NavLink>
    </div>
  );
};

let mapStateToProps = (state: {
  countryList: { countryInfoList: Country[]; activeCountry: Country };
  activeLanguage: any;
}) => {
  return {
    activeCountry: state.countryList.activeCountry,
    activeLanguage: state.activeLanguage,
  };
};
export default connect(mapStateToProps, {})(CountryScreen);
