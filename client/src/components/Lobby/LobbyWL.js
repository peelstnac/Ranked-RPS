import React from 'react';
import PropTypes from 'prop-types';

const LobbyWL = (props) => {
    // Calculate if win or loss
    let you, them, content, color;
    let { verdict, username, gameData } = props;
    if (username === gameData[0]['username']) {
        if (verdict === 0) content = 'Win';
        you = gameData[0];
        them = gameData[1];
    } else {
        if (verdict === 1) content = 'Win';
        them = gameData[0];
        you = gameData[1];
    }

    if (!content) {
        // Since only win conditions were examined
        content = 'Loss';
    }

    if (verdict === -1) {
        content = 'Draw'
    }

    return (
        <div className="lobby-wl-container">
            <p>
                {you['username']} V.S. {them['username']}
            </p>
            <p>
                {content}
            </p>
        </div>
    );

};

LobbyWL.propTypes = {
    verdict: PropTypes.number.isRequired,
    username: PropTypes.string.isRequired,
    gameData: PropTypes.object.isRequired
};

export default LobbyWL;