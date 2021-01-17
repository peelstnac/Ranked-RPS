import React, { useState, useEffect } from 'react';
import { io } from 'socket.io-client';
import { useParams } from 'react-router-dom';
import './Lobby.css';
import Spinner from '../Spinner/Spinner';
import LobbyGame from './LobbyGame';
import LobbyWL from './LobbyWL';

let socket;
let verdict;
let username;
let gameData;



const Lobby = () => {
    let { gameId } = useParams();
    // Pages are join: attempting to join, fail: cannot join, queue: waiting for opponent, start: in game
    // ..., verdict: WL page
    let [page, setPage] = useState('join');
    useEffect(() => {
        // Attempt to connect to game with gameId
        socket = io({ path: '/lobby/socket.io' });
        let token = localStorage.getItem('Ranked RPS Token');
        socket.emit('join', {
            token: token,
            gameId: gameId
        });
        socket.on('join', (data) => {
            let { status } = data;
            username = data['username'];
            if (!status) {
                // TODO: configure fail page

                alert('Could not join lobby. Either lobby ID is wrong or you\'re not logged in.');
                window.location.href = '/';
            } else {
                setPage('queue');
            }
        });
        // Starting game
        socket.on('start', (data) => {
            gameData = data;
            setPage('start');
        });
        // Get verdict
        socket.on('finish', (data) => {
            verdict = data['verdict'];
            setPage('verdict');
        })
    }, []);

    let content;

    switch (page) {
        case 'join':
            content = (
                <div className="lobby-loading">
                    <p>
                        Joining...
                    </p>
                    <Spinner />
                </div>
            );
            break;
        case 'queue':
            content = (
                <div className="lobby-loading">
                    <p>
                        Queuing...
                    </p>
                    <Spinner />
                </div>
            );
            break;
        case 'start':
            content = <LobbyGame
                socket={socket}
                gameData={gameData}
            />;
            break;
        case 'verdict':
            console.log(gameData);
            content = <LobbyWL
                verdict={verdict}
                username={username}
                gameData={gameData}
            />;
        case 'default':

    }

    return (
        <div className="lobby-container">
            {content}
        </div>
    );
};

export default Lobby;