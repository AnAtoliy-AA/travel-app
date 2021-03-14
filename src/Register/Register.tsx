import './Register.scss';

import { Button, TextField } from '@material-ui/core';
import React, { useState } from 'react';

import { User } from '../shared/interfaces';
import axios from 'axios';
import { useForm } from 'react-hook-form';

// import ExitToAppTwoToneIcon from '@material-ui/icons/ExitToAppTwoTone';




const Register: React.FC = () => (
    <div className="register">
        <RegisterForm />
    </div>
);

export default Register;

export const RegisterForm = () => {
    const { register, handleSubmit, errors } = useForm<User>();
    const [responseMessage, setResponseMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const onSubmit = (data: User) => {
        axios
            .post('https://travel-app-back-end.herokuapp.com/api/auth/register', {
                name: data.name,
                email: data.email,
                password: data.password,
            })
            .then((response) => {
                setResponseMessage(response.statusText);
                console.log(response.statusText);
            })
            .catch((er) => {
                console.log('error: ', er.message);
                setErrorMessage(er.message);
            });
    };
    return (
        <div>
            Register
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="field">
                <TextField
                        id="name"
                        size="small"
                        name="name"
                        error={errors.email && true}
                        autoComplete="false"
                        label="Write your name here"
                        variant="outlined"
                        inputRef={register({ required: true })}
                    />
                    {errors.email && errors.email.type === 'required' && (
                        <div className="error">Your must enter namel!.</div>
                    )}
                    <TextField
                        id="email"
                        size="small"
                        name="email"
                        error={errors.email && true}
                        autoComplete="false"
                        label="Write your email here"
                        variant="outlined"
                        inputRef={register({ required: true })}
                    />
                    {errors.email && errors.email.type === 'required' && (
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
                        label="Write your password here"
                        variant="outlined"
                        inputRef={register({ required: true })}
                    />
                    {errors.password && errors.password.type === 'required' && (
                        <div className="error">Your must enter your password.</div>
                    )}
                </div>
                <Button
                    variant="contained"
                    color="primary"
                    size="small"
                    type="submit"
                    // startIcon={<ExitToAppTwoToneIcon />}
                >
                    Register
                </Button>
            </form>
            <div className="response-message">{responseMessage}</div>
            <div className="error-message">{errorMessage}</div>
        </div>
    );
};
