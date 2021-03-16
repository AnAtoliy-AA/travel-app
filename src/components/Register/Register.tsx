import "./Register.scss";

import React from "react";
import { Redirect } from "react-router-dom";
import RegisterForm from "./RegisterForm/RegisterForm";
import { connect } from "react-redux";
import { register } from "./../../redux/auth-reducer";

const Register: React.FC = (props: any) => (
  <div className="register">
    <RegisterForm />
    {props.authStore.isAuthorized ? <Redirect to="/" /> : <RegisterForm />}
  </div>
);

let mapStateToProps = (state: { authStore: any }) => {
  return {
    authStore: state.authStore,
  };
};

export default connect(mapStateToProps, { register })(Register);
