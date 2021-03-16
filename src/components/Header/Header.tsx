import "./Header.scss";

import { Button, InputLabel, MenuItem, Select } from "@material-ui/core";
import { LANGUAGE_CONFIG, WORDS_CONFIG } from "../../shared/words-config";
import { NavLink, Route } from "react-router-dom";
import React, { useState } from "react";

import Alert from "@material-ui/lab/Alert";
import ExitToAppTwoToneIcon from "@material-ui/icons/ExitToAppTwoTone";
import SearchForm from "./SearchForm/SearchForm";
import { TRAVEL_APP_API } from "../../api/travel-app-api";
import { connect } from "react-redux";
import logo from "./../../assets/images/logo.jpg";
import { logout } from "../../redux/auth-reducer";
import { setActiveLanguage } from "../../redux/language-reducer";
import { setSearchFormTerm } from "../../redux/searchForm-reducer";

const Header: React.FC = (props: any) => {
  const [activeLanguageInSelect, setActiveLanguageInSelect] = useState(
    props.activeLanguage
  );

  const handleUpdatActiveLanguageInSelect = (
    e: React.ChangeEvent<{ name?: string | undefined; value: unknown }>
  ) => {
    setActiveLanguageInSelect(e.target.value);
    props.setActiveLanguage(e.target.value);
  };

  return (
    <div className="header">
      <NavLink to="/" style={{ textDecoration: "none" }}>
        <img src={logo} alt="main-logo" className="main__logo" />
      </NavLink>
      <Route exact path="/">
        <SearchForm />
      </Route>
      {props.authStore.isAuthorized ? (
        <>
          <Alert severity="success">
            {props.activeLanguage === LANGUAGE_CONFIG.native &&
              WORDS_CONFIG.AUTH_SUCCESS.native}
            {props.activeLanguage === LANGUAGE_CONFIG.foreign &&
              WORDS_CONFIG.AUTH_SUCCESS.foreign}
            {props.activeLanguage === LANGUAGE_CONFIG.additional &&
              WORDS_CONFIG.AUTH_SUCCESS.additional}{" "}
            {props.authStore.userData.userName}
          </Alert>
          <img
            className="profilePhoto"
            src={`${TRAVEL_APP_API}${props.authStore.userData.imageSrc}`}
            alt="ava"
          />
        </>
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
      <InputLabel id="demo-simple-select-filled-label">
        {props.activeLanguage === LANGUAGE_CONFIG.native
          ? WORDS_CONFIG.SELECT_LANGUAGE.native
          : props.activeLanguage === LANGUAGE_CONFIG.foreign
          ? WORDS_CONFIG.SELECT_LANGUAGE.foreign
          : WORDS_CONFIG.SELECT_LANGUAGE.additional}
      </InputLabel>
      <Select
        labelId="demo-simple-select-filled-label"
        id="demo-simple-select-filled"
        name="fieldSize"
        value={activeLanguageInSelect}
        onChange={(e) => handleUpdatActiveLanguageInSelect(e)}
      >
        <MenuItem value={LANGUAGE_CONFIG.foreign}>
          {LANGUAGE_CONFIG.foreign}
        </MenuItem>
        <MenuItem value={LANGUAGE_CONFIG.native}>
          {LANGUAGE_CONFIG.native}
        </MenuItem>
        <MenuItem value={LANGUAGE_CONFIG.additional}>
          {LANGUAGE_CONFIG.additional}
        </MenuItem>
      </Select>
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
            onClick={props.logout}
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

let mapStateToProps = (state: {
  activeLanguage: any;
  authStore: any;
  searchForm: any;
}) => {
  return {
    activeLanguage: state.activeLanguage.activeLanguage,
    authStore: state.authStore,
    searchForm: state.searchForm,
  };
};

export default connect(mapStateToProps, {
  setActiveLanguage,
  setSearchFormTerm,
  logout,
})(Header);
