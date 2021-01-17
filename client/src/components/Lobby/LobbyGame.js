import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './LobbyGame.css';
import LobbyGameClock from './LobbyGameClock';
import LobbyGameSelected from './LobbyGameSelected';
import LobbyGameCard from './LobbyGameCard';

const LobbyGame = (props) => {
    let [name, setName] = useState('...');

    const handleSelect = (name) => {
        props.socket.emit('choice', { choice: name.toLowerCase() });
        setName(name);
    };

    return (
        <div className="lobby-game-container">
            <div className="lobby-game-clock">
                <LobbyGameClock
                    duration={10}
                    handleEnd={() => { }}
                />
            </div>
            <div className="lobby-game-selected">
                <LobbyGameSelected name={name} />
            </div>
            <div className="lobby-game-cards">
                <LobbyGameCard
                    name={'Rock'}
                    handleSelect={handleSelect}
                />
                <LobbyGameCard
                    name={'Paper'}
                    handleSelect={handleSelect}
                />
                <LobbyGameCard
                    name={'Scissors'}
                    handleSelect={handleSelect}
                />
            </div>

        </div>
    );
};

LobbyGame.propTypes = {
    socket: PropTypes.any.isRequired,
    gameData: PropTypes.object.isRequired
};

export default LobbyGame;