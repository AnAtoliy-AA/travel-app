import "./LoginForm.scss";

import { Button, TextField } from "@material-ui/core";
import { LANGUAGE_CONFIG, WORDS_CONFIG } from "../../../shared/words-config";

import BackspaceIcon from "@material-ui/icons/Backspace";
import ExitToAppTwoToneIcon from "@material-ui/icons/ExitToAppTwoTone";
import LinearProgress from "@material-ui/core/LinearProgress";
import { NavLink } from "react-router-dom";
import React from "react";
import { User } from "../../../shared/interfaces";
import { connect } from "react-redux";
import { login } from "./../../../redux/auth-reducer";
import { useForm } from "react-hook-form";

const LoginForm = (props: any) => {
  const { register, handleSubmit, errors } = useForm<User>();
  const onSubmit = (data: User) => {
    props.login(data.email, data.password);
  };
  return (
    <div className="LoginForm">
      {props.activeLanguage === LANGUAGE_CONFIG.native &&
        WORDS_CONFIG.LOGIN_BUTTON.native}
      {props.activeLanguage === LANGUAGE_CONFIG.foreign &&
        WORDS_CONFIG.LOGIN_BUTTON.foreign}
      {props.activeLanguage === LANGUAGE_CONFIG.additional &&
        WORDS_CONFIG.LOGIN_BUTTON.additional}
      {props.authStore.isLoading && <LinearProgress />}
      <form onSubmit={handleSubmit(onSubmit)} className="auth__form">
        <div className="field">
          <TextField
            id="name"
            size="small"
            name="email"
            error={errors.email && true}
            autoComplete="false"
           
            label={
              props.activeLanguage === LANGUAGE_CONFIG.native
                ? WORDS_CONFIG.WRIGHT_EMAIL.native
                : props.activeLanguage === LANGUAGE_CONFIG.foreign
                ? WORDS_CONFIG.WRIGHT_EMAIL.foreign
                : WORDS_CONFIG.WRIGHT_EMAIL.additional
            }
            variant="outlined"
            inputRef={register({ required: true })}
          />
          {errors.email && errors.email.type === "required" && (
            <div className="error">Your must enter email!.</div>
          )}
        </div>
        <div className="field">
          <TextField
            id="password"
            size="small"
            name="password"
            type="password"
            error={errors.password && true}
            autoComplete="false"
            label={
              props.activeLanguage === LANGUAGE_CONFIG.native
                ? WORDS_CONFIG.WRIGHT_PASSWORD.native
                : props.activeLanguage === LANGUAGE_CONFIG.foreign
                ? WORDS_CONFIG.WRIGHT_PASSWORD.foreign
                : WORDS_CONFIG.WRIGHT_PASSWORD.additional
            }
            variant="outlined"
            inputRef={register({ required: true })}
          />
          {errors.password && errors.password.type === "required" && (
            <div className="error">Your must enter your password.</div>
          )}
        </div>
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
      </form>
      <NavLink to="/" className="auth__return">
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

let mapStateToProps = (state: { authStore: any; activeLanguage: any }) => {
  return {
    authStore: state.authStore,
    activeLanguage: state.activeLanguage.activeLanguage,
  };
};

export default connect(mapStateToProps, { login })(LoginForm);
