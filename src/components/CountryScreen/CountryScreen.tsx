import './CountryScreen.scss';

import { NavLink } from 'react-router-dom';
import React from 'react';
import { connect } from 'react-redux';
import CarouselLists from '../CarouselLists/CarouselLists';

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
      //TODO SLIDER
      {/* {activeCountryInfo.attractions.map((el: any) => {
        return (
          <div key={el.name}>
            <span> {el.name}</span>
            <img src={el.image} alt={el.name} />
            <span>{el.description}</span>
          </div>
        );
      })} */}
      <CarouselLists attractions={activeCountryInfo.attractions} />
      <NavLink to="/" style={{ textDecoration: 'none' }}>
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
