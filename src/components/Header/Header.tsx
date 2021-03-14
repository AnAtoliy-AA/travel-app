import "./Header.scss";

import { LANGUAGE_CONFIG, WORDS_CONFIG } from "../../shared/words-config";
import React, { useState } from "react";

import { Button } from "@material-ui/core";
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
      <div className="header-nav">
        <NavLink to="/login" style={{ textDecoration: "none" }}>
          <Button
            variant="contained"
            color="primary"
            size="small"
            type="submit"
            // startIcon={<ExitToAppTwoToneIcon />}
          >
            {props.activeLanguage.activeLanguage === LANGUAGE_CONFIG.native &&
              WORDS_CONFIG.LOGIN_BUTTON.native}
            {props.activeLanguage.activeLanguage === LANGUAGE_CONFIG.foreign &&
              WORDS_CONFIG.LOGIN_BUTTON.foreign}
            {props.activeLanguage.activeLanguage === LANGUAGE_CONFIG.additional &&
              WORDS_CONFIG.LOGIN_BUTTON.additional}
          </Button>
        </NavLink>
        <NavLink to="/register" style={{ textDecoration: "none" }}>
          <Button
            variant="contained"
            color="primary"
            size="small"
            type="submit"
            // startIcon={<ExitToAppTwoToneIcon />}
          >
           {props.activeLanguage.activeLanguage === LANGUAGE_CONFIG.native &&
              WORDS_CONFIG.REGISTER_BUTTON.native}
            {props.activeLanguage.activeLanguage === LANGUAGE_CONFIG.foreign &&
              WORDS_CONFIG.REGISTER_BUTTON.foreign}
            {props.activeLanguage.activeLanguage === LANGUAGE_CONFIG.additional &&
              WORDS_CONFIG.REGISTER_BUTTON.additional}
          </Button>
        </NavLink>
      </div>
    </div>
  );
};

let mapStateToProps = (state: { activeLanguage: any }) => {
  return {
    activeLanguage: state.activeLanguage,
  };
};

export default connect(mapStateToProps, {
  setActiveLanguage,
})(Header);
