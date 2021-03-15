import './Login.scss';

import LoginForm from './LoginForm/LoginForm';
import React from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

const Login = (props: { authStore: { isAuthorized: boolean; }; }) => {
   
    return <div className="login-screen">{props.authStore.isAuthorized ? <Redirect to="/" /> : <LoginForm />}</div>;
};
let mapStateToProps = (state: { authStore: any}) => {
    return {
      authStore: state.authStore,
    };
  };
  
  export default connect(mapStateToProps, {  })(Login);
