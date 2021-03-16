import './CountryScreen.scss';

import CarouselLists from '../CarouselLists/CarouselLists';
import { Country } from '../../shared/interfaces';
import Map from '../Map/Map';
import { NavLink } from 'react-router-dom';
import React from 'react';
import VideoPlayer from '../VideoPlayer/VideoPlayer';
import Widget from '../Widget/Widget';
import { connect } from 'react-redux';
import { updateCountryMark } from './../../redux/countryList-reducer';

import {
  Button,
  Typography,
  Icon,
  Box,
  Container,
  Grid,
} from '@material-ui/core';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { makeStyles } from '@material-ui/core/styles';

const styles = {
  capital: {
    justifySelf: 'start',
    paddingTop: '8px',
  },
  country: {
    justifySelf: 'end',
  },
};
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
    <Container maxWidth="xl">
      <div className="CountryScreen">
        <div className="CountryScreen__name" style={styles.country}>
          <Typography variant="h4" component="h2">
            {activeCountryInfo.countryName},
          </Typography>
        </div>
        <div className="CountryScreen__name" style={styles.capital}>
          <Typography variant="h5" component="h3">
            {activeCountryInfo.capital}
          </Typography>
        </div>
        <Widget
          country={activeCountryInfo.countryName}
          capital={activeCountryInfo.capital}
          capitalEng={activeCapitalEng}
          currancy={activeCountryCurrancy}
          timezone={timezoneCapital}
        />
        <div className="CountryScreen__about">
          <Typography variant="body1" color="textPrimary" component="p">
            {activeCountryInfo.aboutCountry}
          </Typography>
        </div>
        <VideoPlayer source={activeCountryInfo.video} />
        <Map
          capitalEng={activeCapitalEng}
          capital={activeCountryInfo.capital}
          coordsCapital={coordsCapital}
          country={activeCountryInfo.countryName}
        />
        <CarouselLists attractions={activeCountryInfo.attractions} />
        <NavLink
          to="/"
          style={{ textDecoration: 'none' }}
          className="CountryScreen__link"
        >
          <Button size="large" color="primary" endIcon={<ArrowBackIcon />}>
            RETURN BACK
          </Button>
        </NavLink>
        <button
          className="CountryScreen__btn"
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
    </Container>
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
