import './CountryScreen.scss';

import { NavLink } from 'react-router-dom';
import React from 'react';
import { connect } from "react-redux";

const CountryScreen: React.FC = (props: any) => (
  <div className="CountryScreen">
    CountryScreen Component
    {props.activeCountry.country}
    <NavLink to="/" style={{ textDecoration: "none" }}>RETURN BACK</NavLink>
  </div>
);

let mapStateToProps = (state: {
  countryList: { activeCountry: any };
}) => {
  return {
    activeCountry: state.countryList.activeCountry,
  };
};
export default connect(mapStateToProps, {})(CountryScreen);

