import "./LanguageSelect.scss";

import { InputLabel, MenuItem, Select } from "@material-ui/core";
import { LANGUAGE_CONFIG, WORDS_CONFIG } from "../../../shared/words-config";
import React, { useState } from "react";

import { connect } from "react-redux";
import { setActiveLanguage } from "../../../redux/language-reducer";

const LanguageSelect: React.FC = (props: any) => {
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
    <div className="LanguageSelect">
              <InputLabel
          id="demo-simple-select-filled-label"
          className="background__layout"
        >
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
          className="background__layout"
          onChange={(e) => handleUpdatActiveLanguageInSelect(e)}
        >
          <MenuItem value={LANGUAGE_CONFIG.foreign}>
            {props.activeLanguage === LANGUAGE_CONFIG.native
              ? WORDS_CONFIG.FOREIGN_LANGUAGE.native
              : props.activeLanguage === LANGUAGE_CONFIG.foreign
              ? WORDS_CONFIG.FOREIGN_LANGUAGE.foreign
              : WORDS_CONFIG.FOREIGN_LANGUAGE.additional}
          </MenuItem>
          <MenuItem value={LANGUAGE_CONFIG.native}>
            {props.activeLanguage === LANGUAGE_CONFIG.native
              ? WORDS_CONFIG.NATIVE_LANGUAGE.native
              : props.activeLanguage === LANGUAGE_CONFIG.foreign
              ? WORDS_CONFIG.NATIVE_LANGUAGE.foreign
              : WORDS_CONFIG.NATIVE_LANGUAGE.additional}
          </MenuItem>
          <MenuItem value={LANGUAGE_CONFIG.additional}>
            {props.activeLanguage === LANGUAGE_CONFIG.native
              ? WORDS_CONFIG.ADDITIONAL_LANGUAGE.native
              : props.activeLanguage === LANGUAGE_CONFIG.foreign
              ? WORDS_CONFIG.ADDITIONAL_LANGUAGE.foreign
              : WORDS_CONFIG.ADDITIONAL_LANGUAGE.additional}
          </MenuItem>
        </Select>
    </div>
  );
};

let mapStateToProps = (state: {
  activeLanguage: any;
}) => {
  return {
    activeLanguage: state.activeLanguage.activeLanguage,
  };
};

export default connect(mapStateToProps, {
  setActiveLanguage,
})(LanguageSelect);
