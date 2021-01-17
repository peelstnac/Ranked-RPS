import React from 'react';
import './HomeBattleButton.css';

const HomeBattleButton = () => {

    const handleClick = () => {
        // Attempt to join a game
        fetch('/lobby/join', {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('Ranked RPS Token')
            }
        }).then((res) => {
            let status = res.status;
            if (status === 200) {
                // Success
                res.json().then((data) => {
                    let { gameId } = data;
                    // Redirect to lobby
                    window.location.href = '/lobby/' + gameId;
                });
            } else {
                alert('Must be logged in.');
            }
        });
    };

    return (
        <div
            onClick={handleClick}
            className="home-battle-button-container">
            <p>Battle!</p>
        </div>
    );
};

export default HomeBattleButton;