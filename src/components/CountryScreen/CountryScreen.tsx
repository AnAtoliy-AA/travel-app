import './CountryScreen.scss';

import CarouselLists from '../CarouselLists/CarouselLists';
import { Country } from '../../shared/interfaces';
import { NavLink } from 'react-router-dom';
import React from 'react';
import { connect } from 'react-redux';
import Widget from '../Widget/Widget';
import Map from '../Map/Map';
import VideoPlayer from '../VideoPlayer/VideoPlayer';

const CountryScreen: React.FC = (props: any) => {
  const activeCountryInfo =
    props.activeCountry.countryFullInfo.countryInfo[
      props.activeLanguage.activeLanguage
    ];
  const activeCountryCurrancy = props.activeCountry.countryFullInfo.currency;
  const activeCapitalEng =
    props.activeCountry.countryFullInfo.countryInfo.en.capital;

  const timezoneCapital = activeCountryInfo.timezone;

  return (
    <div className="CountryScreen">
      CountryScreen Component
      <span>{activeCountryInfo.countryName}</span>
      <span>{activeCountryInfo.capital}</span>
      <span>{activeCountryInfo.aboutCountry}</span>
      <VideoPlayer source={activeCountryInfo.video} />
      <Widget
        country={activeCountryInfo.countryName}
        capital={activeCountryInfo.capital}
        capitalEng={activeCapitalEng}
        currancy={activeCountryCurrancy}
        timezone={timezoneCapital}
      />
      <Map />
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
