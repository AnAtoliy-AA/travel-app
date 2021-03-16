import "./SearchForm.scss";

import { Button, Input } from "@material-ui/core";
import { LANGUAGE_CONFIG, WORDS_CONFIG } from "../../../shared/words-config";

import React from "react";
import SearchIcon from "@material-ui/icons/Search";
import { connect } from "react-redux";
import { setSearchFormTerm } from "../../../redux/searchForm-reducer";

const SearchForm: React.FC = (props: any) => {
  const handleOnInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const searchValue = event.target.value;
    props.setSearchFormTerm(searchValue);
  };

  const handleOnSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
  };

  return (
    <form onSubmit={handleOnSubmit}>
      <Input
        color="primary"
        autoFocus
        autoComplete="off"
        fullWidth
        placeholder={
          props.activeLanguage === LANGUAGE_CONFIG.native
            ? WORDS_CONFIG.SEARCH_INPUT_TEXT.native
            : props.activeLanguage === LANGUAGE_CONFIG.foreign
            ? WORDS_CONFIG.SEARCH_INPUT_TEXT.foreign
            : WORDS_CONFIG.SEARCH_INPUT_TEXT.additional
        }
        onChange={handleOnInputChange}
      />
      <Button
        variant="contained"
        color="primary"
        size="small"
        type="submit"
        startIcon={<SearchIcon />}
      >
        {props.activeLanguage === LANGUAGE_CONFIG.native
          ? WORDS_CONFIG.SEARCH_BUTTON.native
          : props.activeLanguage === LANGUAGE_CONFIG.foreign
          ? WORDS_CONFIG.SEARCH_BUTTON.foreign
          : WORDS_CONFIG.SEARCH_BUTTON.additional}
      </Button>
    </form>
  );
};

let mapStateToProps = (state: { activeLanguage: any; searchForm: any }) => {
  return {
    activeLanguage: state.activeLanguage.activeLanguage,
    searchForm: state.searchForm,
  };
};

export default connect(mapStateToProps, {
  setSearchFormTerm,
})(SearchForm);
