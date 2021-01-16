import React from 'react';
import {
    Switch,
    Route
} from 'react-router-dom';
import './App.css';
import Navigation from './Navigation/Navigation';
import Home from './Home/Home';

const App = () => {
    return (
        <Switch>
            <Route exact path="/">
                <div className="app-container">
                    <Navigation />
                    <Home />
                </div>
            </Route>
        </Switch>

    );
};

export default App;