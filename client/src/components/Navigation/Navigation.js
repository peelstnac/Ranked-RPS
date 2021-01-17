import React from 'react';
import useAuthStatus from '../../hooks/useAuthStatus';
import './Navigation.css';
import { Link } from 'react-router-dom';

const Navigation = () => {
    let status = useAuthStatus();
    let authButton;
    let profile;
    switch (status) {
        case null:
            break;
        case false:
            // Not logged in
            authButton = (
                <nav className="navigation-item">
                    <Link to="/login">Login</Link>
                </nav>
            );
            profile = null;
            break;
        case true:
            authButton = (
                <nav className="navigation-item">
                    <a href="/" onClick={() => {
                        localStorage.setItem('Ranked RPS Token', null);
                    }}>
                        Logout
                    </a>
                </nav>
            );
            profile = (
                <nav className="navigation-item">
                    <Link to="/profile">Profile</Link>
                </nav>
            );
            break;
        default:
            alert('Error. Check console.');
            console.error('Default case triggered.');
    }

    return (
        <div className="navigation-container">
            <div className="navigation-title">
                <span>
                    Ranked RPS
                </span>
            </div>
            <nav className="navigation-item">
                <Link to="/">Home</Link>
            </nav>
            <nav className="navigation-item">
                <Link to="/leaderboard">Leaderboard</Link>
            </nav>
            {authButton}
            {profile}
        </div>
    );
};

export default Navigation;