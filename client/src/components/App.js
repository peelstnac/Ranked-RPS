import React from 'react';
import {
    Switch,
    Route
} from 'react-router-dom';
import './App.css';
import Navigation from './Navigation/Navigation';
import Home from './Home/Home';
import Authentication from './Authentication/Authentication';
import Leaderboard from './Leaderboard/Leaderboard';
import Lobby from './Lobby/Lobby';
import Leadberboard from './Leaderboard/Leaderboard';
import Profile from './Profile/Profile';

const App = () => {
    return (
        <div className="app-container">
            <Navigation />
            <Switch>
                <Route exact path="/">
                    <Home />
                </Route>
                <Route exact path="/leaderboard">
                    <Leadberboard />
                </Route>
                <Route exact path="/login">
                    <Authentication />
                </Route>
                <Route exact path="/profile">
                    <Profile />
                </Route>
                <Route path="/lobby/:gameId">
                    <Lobby />
                </Route>
            </Switch>
        </div>
    );
};

export default App;