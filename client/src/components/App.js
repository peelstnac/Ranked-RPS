import React from 'react';
import {
    Switch,
    Route
} from 'react-router-dom';
import './App.css';
import Navigation from './Navigation/Navigation';
import Home from './Home/Home';
import Authentication from './Authentication/Authentication';

const App = () => {
    return (
        <div className="app-container">
            <Navigation />
            <Switch>
                <Route exact path="/">
                    <Home />
                </Route>
                <Route exact path="/login">
                    <Authentication />
                </Route>
            </Switch>
        </div>
    );
};

export default App;