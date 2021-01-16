import React from 'react';
import './Navigation.css';
import { Link } from 'react-router-dom';

const Navigation = () => {
    return (
        <div className="navigation-container">
            <div className="navigation-title">
                <span>
                    Ranked RPS
                </span>
            </div>
            <nav className="navigation-items">
                <Link to="/">Home</Link>
            </nav>
        </div>
    );
};

export default Navigation;