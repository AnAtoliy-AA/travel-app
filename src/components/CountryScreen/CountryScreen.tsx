import "./CountryScreen.scss";

import {
  Box,
  Button,
  Container,
  Grid,
  Icon,
  Typography,
} from "@material-ui/core";
import { LANGUAGE_CONFIG, WORDS_CONFIG } from "../../shared/words-config";

import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import CarouselLists from "../CarouselLists/CarouselLists";
import { Country } from "../../shared/interfaces";
import Map from "../Map/Map";
import { NavLink } from "react-router-dom";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import React from "react";
import StopIcon from "@material-ui/icons/Stop";
import VideoPlayer from "../VideoPlayer/VideoPlayer";
import Widget from "../Widget/Widget";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import { updateCountryMark } from "./../../redux/countryList-reducer";

const styles = {
  capital: {
    justifySelf: "start",
    paddingTop: "8px",
  },
  country: {
    justifySelf: "end",
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

  const handleStartSpeaking = () => {
    let utterance = new SpeechSynthesisUtterance(
      activeCountryInfo.aboutCountry
    );
    speechSynthesis.speak(utterance);
  };

  const handleStopSpeaking = () => {
    speechSynthesis.cancel();
  };

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
        <div className="CountryScreen__speack">
          <Button
            variant="contained"
            color="primary"
            size="small"
            onClick={handleStartSpeaking}
            startIcon={<PlayArrowIcon />}
          ></Button>
          <Button
            variant="contained"
            color="primary"
            size="small"
            onClick={handleStopSpeaking}
            startIcon={<StopIcon />}
          ></Button>
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
          style={{ textDecoration: "none" }}
          className="CountryScreen__link"
        >
          <Button size="large" color="primary" endIcon={<ArrowBackIcon />}>
            {props.activeLanguage.activeLanguage === LANGUAGE_CONFIG.native &&
              WORDS_CONFIG.BACK_BUTTON.native}
            {props.activeLanguage.activeLanguage === LANGUAGE_CONFIG.foreign &&
              WORDS_CONFIG.BACK_BUTTON.foreign}
            {props.activeLanguage.activeLanguage ===
              LANGUAGE_CONFIG.additional && WORDS_CONFIG.BACK_BUTTON.additional}
          </Button>
        </NavLink>
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
