import './CountryScreen.scss';

import { Button, Typography } from '@material-ui/core';

import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import CarouselLists from '../CarouselLists/CarouselLists';
import { Country } from '../../shared/interfaces';
import Map from '../Map/Map';
import { NavLink } from 'react-router-dom';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import React from 'react';
import StopIcon from '@material-ui/icons/Stop';
import VideoPlayer from '../VideoPlayer/VideoPlayer';
import Widget from '../Widget/Widget';
import { connect } from 'react-redux';
import { updateCountryMark } from './../../redux/countryList-reducer';

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

  const handleStartSpeaking = () => {
    let utterance = new SpeechSynthesisUtterance(activeCountryInfo.aboutCountry);
    speechSynthesis.speak(utterance);
  }

  const handleStopSpeaking = () => {
    speechSynthesis.cancel()
  }

  return (
    <div className="CountryScreen">
      CountryScreen Component
      <Typography gutterBottom variant="h5" component="h2">
        {activeCountryInfo.countryName}
      </Typography>
      <Typography gutterBottom variant="h5" component="h2">
        {activeCountryInfo.capital}
      </Typography>
      <Typography variant="body1" color="textPrimary" component="p">
        {activeCountryInfo.aboutCountry}
        <Button
          variant="contained"
          color="primary"
          size="small"
          onClick={handleStartSpeaking}
          startIcon={<PlayArrowIcon />}
        >
        </Button>
        <Button
          variant="contained"
          color="primary"
          size="small"
          onClick={handleStopSpeaking}
          startIcon={<StopIcon />}
        >
        </Button>
      </Typography>
      <VideoPlayer source={activeCountryInfo.video} />
      <Widget
        country={activeCountryInfo.countryName}
        capital={activeCountryInfo.capital}
        capitalEng={activeCapitalEng}
        currancy={activeCountryCurrancy}
        timezone={timezoneCapital}
      />
      <Map
        capitalEng={activeCapitalEng}
        capital={activeCountryInfo.capital}
        coordsCapital={coordsCapital}
        country={activeCountryInfo.countryName}
      />
      <CarouselLists attractions={activeCountryInfo.attractions} />
      <NavLink to="/" style={{ textDecoration: 'none' }}>
        <Button size="large" color="primary" endIcon={<ArrowBackIcon />}>
          RETURN BACK
        </Button>
      </NavLink>
      //TODO
      <button
        onClick={() =>
          props.updateCountryMark(
            props.activeCountry._id,
            props.authStore.userData.token,
            '4',
            props.authStore.userData.userId,
            props.authStore.userData.userName
          )
        }
      >
        Set 4
      </button>
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
export default connect(mapStateToProps, { updateCountryMark })(CountryScreen);
