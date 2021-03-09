import "./Header.scss";

import React, { useState } from "react";

import { LANGUAGE_CONFIG } from "../../shared/words-config";
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
