import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./CarouselLists.scss";

import { AttractionDescription, Country } from "../../shared/interfaces";
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

import { NavLink } from "react-router-dom";
import React from "react";
import Slider from "react-slick";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import { setActiveAttraction } from "./../../redux/countryList-reducer";

const useStyles = makeStyles({
  root: {
    maxWidth: 280,
    cursor: "pointer",
  },
  desc: {
    height: "40px",
    overflowY: "hidden",
    lineHeight: "20px",
    position: "relative",
  },
  title: {
    height: "55px",
  },
});

type TProps = {
  attractions: any;
};

const CarouselLists: React.FC<TProps> = (props: any) => {
  const classes = useStyles();
  const settings = {
    dots: false,
    infinite: true,
    speed: 750,
    slidesToShow: 3,
    slidesToScroll: 1,
  };
  const activeCountryInfo =
    props.activeCountry.countryFullInfo.countryInfo[props.activeLanguage];

  const changeActiveAttraction = (attraction: AttractionDescription) => {
    props.setActiveAttraction(attraction);
  };

  const renderSlides = () =>
    activeCountryInfo.attractions.map(
      (item: { name: string; image: string; description: string }) => (
        <Card className={classes.root} key={item.name}>
          <CardActionArea>
            <CardMedia
              component="img"
              alt={item.name}
              height="120"
              image={item.image}
              title={item.name}
            />
            <CardContent>
              <Typography
                gutterBottom
                variant="subtitle1"
                component="h2"
                className={classes.title}
              >
                {item.name}
              </Typography>
              <Typography
                variant="body2"
                color="textSecondary"
                component="p"
                className={classes.desc}
              >
                {item.description}
              </Typography>
            </CardContent>
          </CardActionArea>
          <CardActions>
            <NavLink to="/attraction" style={{ textDecoration: "none" }}>
              <Button
                size="small"
                color="primary"
                onClick={() => {
                  changeActiveAttraction(item);
                }}
              >
                {props.activeLanguage === LANGUAGE_CONFIG.native &&
                  WORDS_CONFIG.LEARN_MORE.native}
                {props.activeLanguage === LANGUAGE_CONFIG.foreign &&
                  WORDS_CONFIG.LEARN_MORE.foreign}
                {props.activeLanguage === LANGUAGE_CONFIG.additional &&
                  WORDS_CONFIG.LEARN_MORE.additional}
              </Button>
            </NavLink>
          </CardActions>
        </Card>
      )
    );

  return (
    <div className="carousel-countainer">
      <Slider {...settings}>{renderSlides()}</Slider>
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
    activeLanguage: state.activeLanguage.activeLanguage,
    authStore: state.authStore,
  };
};

export default connect(mapStateToProps, { setActiveAttraction })(CarouselLists);
