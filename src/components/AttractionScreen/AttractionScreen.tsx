import "./AttractionScreen.scss";

import { LANGUAGE_CONFIG, WORDS_CONFIG } from "../../shared/words-config";

import { AttractionDescription } from "../../shared/interfaces";
import BackspaceIcon from "@material-ui/icons/Backspace";
import { Button } from "@material-ui/core";
import { NavLink } from "react-router-dom";
import React from "react";
import { connect } from "react-redux";

const styles = {
  capital: {
    justifySelf: "start",
    paddingTop: "8px",
  },
  country: {
    justifySelf: "end",
  },
};
const AttractionScreen: React.FC = (props: any) => {
  return (
    <div className="AttractionScreen">
      <>
        <img
          src={props.activeAttraction.image}
          alt="attraction"
          className="attraction__image"
        />
      </>
      <h2>{props.activeAttraction.name}</h2>
      <h3>{props.activeAttraction.description}</h3>

      <NavLink to="/country" className="attraction__return">
        <Button
          variant="contained"
          color="primary"
          size="small"
          startIcon={<BackspaceIcon />}
        >
          {props.activeLanguage === LANGUAGE_CONFIG.native &&
            WORDS_CONFIG.BACK_BUTTON.native}
          {props.activeLanguage === LANGUAGE_CONFIG.foreign &&
            WORDS_CONFIG.BACK_BUTTON.foreign}
          {props.activeLanguage === LANGUAGE_CONFIG.additional &&
            WORDS_CONFIG.BACK_BUTTON.additional}
        </Button>
      </NavLink>
    </div>
  );
};

let mapStateToProps = (state: {
  countryList: { activeAttraction: AttractionDescription };
  activeLanguage: any;
  authStore: any;
}) => {
  return {
    activeAttraction: state.countryList.activeAttraction,
    activeLanguage: state.activeLanguage.activeLanguage,
    authStore: state.authStore,
  };
};

export default connect(mapStateToProps, {})(AttractionScreen);
