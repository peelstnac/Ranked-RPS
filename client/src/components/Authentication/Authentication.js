import React, { useState } from 'react';
import useAuthStatus from '../../hooks/useAuthStatus';
import { Redirect } from 'react-router-dom';
import './Authentication.css';
import Spinner from '../Spinner/Spinner';
import AuthenticationForm from './AuthenticationForm';

const Authentication = () => {
    // Check if user is already logged in
    let status = useAuthStatus();

    let content;
    switch (status) {
        case null:
            content = <Spinner />;
            break;
        case false:
            // Not logged in
            content = <AuthenticationForm />;
            break;
        case true:
            content = <Redirect to="/"></Redirect>;
            break;
        default:
            alert('Error. Check console.');
            console.error('Default case triggered.');
    }
    return (
        <div className="authentication-container">
            <div className="authentication-card">
                {content}
            </div>
        </div>
    );
};

export default Authentication;