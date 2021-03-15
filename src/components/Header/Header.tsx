import "./Header.scss";

import { LANGUAGE_CONFIG, WORDS_CONFIG } from "../../shared/words-config";
import { NavLink, Route } from "react-router-dom";
import React, { useState } from "react";

import Alert from "@material-ui/lab/Alert";
import { Button } from "@material-ui/core";
import ExitToAppTwoToneIcon from "@material-ui/icons/ExitToAppTwoTone";
import { connect } from "react-redux";
import { logout } from "../../redux/auth-reducer"
import { setActiveLanguage } from "../../redux/language-reducer";
import { setSearchFormTerm } from "../../redux/searchForm-reducer";

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

  const handleOnInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const searchValue = event.target.value;
    props.setSearchFormTerm(searchValue);
  };

  const handleOnSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
  };

  return (
    <div className="header">
      <Route exact path="/">
        <form onSubmit={handleOnSubmit}>
          <input
            type="text"
            value={props.searchForm.searchTerm}
            autoFocus
            autoComplete="off"
            placeholder={
              props.activeLanguage === LANGUAGE_CONFIG.native
                ? WORDS_CONFIG.SEARCH_INPUT_TEXT.native
                : props.activeLanguage === LANGUAGE_CONFIG.foreign
                ? WORDS_CONFIG.SEARCH_INPUT_TEXT.foreign
                : WORDS_CONFIG.SEARCH_INPUT_TEXT.additional
            }
            onChange={handleOnInputChange}
            className="search__input"
          />
          <button type="submit">
            {props.activeLanguage === LANGUAGE_CONFIG.native
              ? WORDS_CONFIG.SEARCH_BUTTON.native
              : props.activeLanguage === LANGUAGE_CONFIG.foreign
              ? WORDS_CONFIG.SEARCH_BUTTON.foreign
              : WORDS_CONFIG.SEARCH_BUTTON.additional}
          </button>
        </form>
      </Route>
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
