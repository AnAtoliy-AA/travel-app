import './Login.scss';

import LoginForm from './LoginForm/LoginForm';
import React from 'react';

const Login = () => {
   
    return <div className="login-screen">{<LoginForm />}</div>;
};

export default Login;
