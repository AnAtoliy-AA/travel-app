import "./Header.scss";

import { LANGUAGE_CONFIG, WORDS_CONFIG } from "../../shared/words-config";
import React, { useState } from "react";

import Alert from "@material-ui/lab/Alert";
import { Button } from "@material-ui/core";
import ExitToAppTwoToneIcon from "@material-ui/icons/ExitToAppTwoTone";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import { setActiveLanguage } from "../../redux/language-reducer";

const Header: React.FC = (props: any) => {
  const [activeLanguageInSelect, setActiveLanguageInSelect] = useState(
    props.activeLanguage
  );

  const handleUpdatActiveLanguageInSelect = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setActiveLanguageInSelect(e.target.value);
    props.setActiveLanguage(e.target.value);
  };

  return (
    <div className="header">
      {props.authStore.isAuthorized ? (
        <Alert severity="success">
          {props.activeLanguage === LANGUAGE_CONFIG.native &&
            WORDS_CONFIG.AUTH_SUCCESS.native}
          {props.activeLanguage === LANGUAGE_CONFIG.foreign &&
            WORDS_CONFIG.AUTH_SUCCESS.foreign}
          {props.activeLanguage === LANGUAGE_CONFIG.additional &&
            WORDS_CONFIG.AUTH_SUCCESS.additional}{" "}
          {props.authStore.userData.userName}
        </Alert>
      ) : (
        <Alert severity="error">
          {props.activeLanguage === LANGUAGE_CONFIG.native &&
            WORDS_CONFIG.AUTH_FAIL.native}
          {props.activeLanguage === LANGUAGE_CONFIG.foreign &&
            WORDS_CONFIG.AUTH_FAIL.foreign}
          {props.activeLanguage === LANGUAGE_CONFIG.additional &&
            WORDS_CONFIG.AUTH_FAIL.additional}
        </Alert>
      )}
      <select
        value={activeLanguageInSelect}
        onChange={(e) => handleUpdatActiveLanguageInSelect(e)}
        className="browser-default custom-select"
      >
        <option value={LANGUAGE_CONFIG.foreign}>
          {LANGUAGE_CONFIG.foreign}
        </option>
        <option value={LANGUAGE_CONFIG.native}>{LANGUAGE_CONFIG.native}</option>
        <option value={LANGUAGE_CONFIG.additional}>
          {LANGUAGE_CONFIG.additional}
        </option>
      </select>
      {!props.authStore.isAuthorized ? (
        <div className="header-nav">
          <NavLink to="/login" style={{ textDecoration: "none" }}>
            <Button
              variant="contained"
              color="primary"
              size="small"
              type="submit"
              startIcon={<ExitToAppTwoToneIcon />}
            >
              {props.activeLanguage === LANGUAGE_CONFIG.native &&
                WORDS_CONFIG.LOGIN_BUTTON.native}
              {props.activeLanguage === LANGUAGE_CONFIG.foreign &&
                WORDS_CONFIG.LOGIN_BUTTON.foreign}
              {props.activeLanguage === LANGUAGE_CONFIG.additional &&
                WORDS_CONFIG.LOGIN_BUTTON.additional}
            </Button>
          </NavLink>
          <NavLink to="/register" style={{ textDecoration: "none" }}>
            <Button
              variant="contained"
              color="primary"
              size="small"
              type="submit"
              startIcon={<ExitToAppTwoToneIcon />}
            >
              {props.activeLanguage === LANGUAGE_CONFIG.native &&
                WORDS_CONFIG.REGISTER_BUTTON.native}
              {props.activeLanguage === LANGUAGE_CONFIG.foreign &&
                WORDS_CONFIG.REGISTER_BUTTON.foreign}
              {props.activeLanguage === LANGUAGE_CONFIG.additional &&
                WORDS_CONFIG.REGISTER_BUTTON.additional}
            </Button>
          </NavLink>
        </div>
      ) : (
        <div className="header-nav">
          <Button
            variant="contained"
            color="primary"
            size="small"
            type="submit"
            // onClick={logOut}
            startIcon={<ExitToAppTwoToneIcon />}
          >
            {props.activeLanguage === LANGUAGE_CONFIG.native &&
              WORDS_CONFIG.LOGOUT_BUTTON.native}
            {props.activeLanguage === LANGUAGE_CONFIG.foreign &&
              WORDS_CONFIG.LOGOUT_BUTTON.foreign}
            {props.activeLanguage === LANGUAGE_CONFIG.additional &&
              WORDS_CONFIG.LOGOUT_BUTTON.additional}
          </Button>
        </div>
      )}
    </div>
  );
};

let mapStateToProps = (state: { activeLanguage: any; authStore: any }) => {
  return {
    activeLanguage: state.activeLanguage.activeLanguage,
    authStore: state.authStore,
  };
};

export default connect(mapStateToProps, {
  setActiveLanguage,
})(Header);
