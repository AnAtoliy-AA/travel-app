import "./MainMenu.scss";

import {
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@material-ui/core";
import { LANGUAGE_CONFIG, WORDS_CONFIG } from "../../shared/words-config";
import React, { useEffect } from "react";
import {
  getAllCountriesInfo,
  setActiveCountry,
  setCountriesInfoData,
  setIsCountrySelected,
} from "../../redux/countryList-reducer";

import { Country } from "../../shared/interfaces";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  root: {
    maxWidth: 300,
    maxHeight: 280,
    cursor: "pointer",
    boxShadow: "0 0 10px rgba(0, 0, 0, 0.5)",
    margin: "1vh 1vw 2vh",
  },
});

const MainMenu: React.FC = (props: any) => {
  const classes = useStyles();

  useEffect(() => {
    props.getAllCountriesInfo();
  }, []);

  const changeActiveCountry = (country: Country) => {
    props.setActiveCountry(country);
  };

  const activeLanguage: string = props.activeLanguage.activeLanguage;
  return (
    <div className="MainMenu">
      <div className="cards__container">
        {props.countryInfoList.map((country: any) => {
          const countryInfo =
            country.countryFullInfo.countryInfo[activeLanguage];
          if (
            countryInfo.countryName
              .toLowerCase()
              .includes(props.searchForm.searchTerm) ||
            countryInfo.capital
              .toLowerCase()
              .includes(props.searchForm.searchTerm)
          ) {
            return (
              <div
                key={country.country}
                onClick={() => {
                  changeActiveCountry(country);
                }}
              >
                <NavLink to="/country" style={{ textDecoration: "none" }}>
                  <Card className={classes.root}>
                    <CardActionArea>
                      <CardMedia
                        component="img"
                        alt={countryInfo.attractions[0].name}
                        height="180"
                        image={countryInfo.attractions[0].image}
                        title={countryInfo.attractions[0].name}
                      />
                      <CardContent>
                        <Typography gutterBottom variant="h5" component="h2">
                          <img
                            className="country-flag"
                            src={country.countryFullInfo.flag}
                            alt="flag"
                          />
                          {countryInfo.countryName}
                        </Typography>
                        <Typography gutterBottom variant="h5" component="h2">
                          {activeLanguage === LANGUAGE_CONFIG.native &&
                            WORDS_CONFIG.CAPITAL.native}
                          {activeLanguage === LANGUAGE_CONFIG.foreign &&
                            WORDS_CONFIG.CAPITAL.foreign}
                          {activeLanguage === LANGUAGE_CONFIG.additional &&
                            WORDS_CONFIG.CAPITAL.additional}
                          : {countryInfo.capital}
                        </Typography>
                      </CardContent>
                    </CardActionArea>
                    <CardActions>
                      <Button size="small" color="primary">
                        {activeLanguage === LANGUAGE_CONFIG.native &&
                          WORDS_CONFIG.LEARN_MORE.native}
                        {activeLanguage === LANGUAGE_CONFIG.foreign &&
                          WORDS_CONFIG.LEARN_MORE.foreign}
                        {activeLanguage === LANGUAGE_CONFIG.additional &&
                          WORDS_CONFIG.LEARN_MORE.additional}
                      </Button>
                    </CardActions>
                  </Card>
                </NavLink>
              </div>
            );
          }
        })}
      </div>
    </div>
  );
};
let mapStateToProps = (state: {
  countryList: { countryInfoList: Country[]; activeCountry: Country };
  activeLanguage: any;
  searchForm: any;
}) => {
  return {
    countryInfoList: state.countryList.countryInfoList,
    activeCountry: state.countryList.activeCountry,
    activeLanguage: state.activeLanguage,
    searchForm: state.searchForm,
  };
};

export default connect(mapStateToProps, {
  setCountriesInfoData,
  setActiveCountry,
  setIsCountrySelected,
  getAllCountriesInfo,
})(MainMenu);
