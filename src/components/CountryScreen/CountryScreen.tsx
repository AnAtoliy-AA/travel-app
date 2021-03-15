import './CountryScreen.scss';

import CarouselLists from '../CarouselLists/CarouselLists';
import { Country } from '../../shared/interfaces';
import Map from '../Map/Map';
import { NavLink } from 'react-router-dom';
import React from 'react';
import VideoPlayer from '../VideoPlayer/VideoPlayer';
import Widget from '../Widget/Widget';
import { connect } from 'react-redux';
import {updateCountryMark} from './../../redux/countryList-reducer';

const CountryScreen: React.FC = (props: any) => {
  const activeCountryInfo =
    props.activeCountry.countryFullInfo.countryInfo[
      props.activeLanguage.activeLanguage
    ];
  const activeCountryCurrancy = props.activeCountry.countryFullInfo.currency;
  const activeCapitalEng =
    props.activeCountry.countryFullInfo.countryInfo.en.capital;

  const timezoneCapital = activeCountryInfo.timezone;
  const { lat, long } = props.activeCountry.countryFullInfo;
  const coordsCapital = [lat, long];
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
      <Map
        country={activeCountryInfo.countryName}
        capital={activeCountryInfo.capital}
        coordsCapital={coordsCapital}
      />
      <CarouselLists attractions={activeCountryInfo.attractions} />
      <NavLink to="/" style={{ textDecoration: 'none' }}>
        RETURN BACK
      </NavLink>
      //TODO
      <button onClick={() => props.updateCountryMark(props.activeCountry._id, props.authStore.userData.token, '4', props.authStore.userData.userId, props.authStore.userData.userName)}>Set 4</button>
    </div>
  );
};

let mapStateToProps = (state: {
  countryList: { countryInfoList: Country[]; activeCountry: Country };
  activeLanguage: any;
  authStore: any;
}) => {
  return {
    activeCountry: state.countryList.activeCountry,
    activeLanguage: state.activeLanguage,
    authStore: state.authStore,
  };
};
export default connect(mapStateToProps, {updateCountryMark})(CountryScreen);
