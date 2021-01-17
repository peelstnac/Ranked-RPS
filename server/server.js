'use strict';
import express from 'express';
import fs from 'fs';
import path from 'path';
import auth from './routes/auth';
import lobby from './routes/lobby';
import data from './routes/data';
import pool from './db/connection';
import test from './db/test';
import http from 'http';
import sio from 'socket.io';
import jwt from 'jsonwebtoken';
import startGame from './startGame';

const publicKey = fs.readFileSync(path.join(__dirname, 'keys', 'public.key')).toString();
const app = express();
const server = http.createServer(app);
const io = sio(server, { path: '/lobby/socket.io' });

// Express

app.use(express.json());
app.use(express.static(path.join(__dirname, '..', 'client', 'build')));

app.use('/auth', auth);
app.use('/lobby', lobby);
app.use('/data', data);

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'client', 'build', 'index.html'));
});

let port = process.env.PORT || 9000;
server.listen(port, () => {
    console.log(`Listening on port ${port}`);
});

// Sockets

export var openGames = [];
export var fullGames = [];
export var games = {};

if (process.env.NODE_ENV === 'development') {
    test();
    io.on('connection', (socket) => {
        console.log(`Socket join ${socket.id}`);
        socket.on('disconnect', () => {
            console.log(`Socket leave ${socket.id}`);
        });
    });
}

// TODO: add specific messages when fail to join (ie. game is full vs error)
io.on('connection', (socket) => {
    let currentGame;

    socket.on('disconnect', () => {
        try {
            if (currentGame['players'].length < 2) {
                currentGame.removeGame();
            }
        } catch (err) {
            // Do nothing
        }

    });

    socket.on('join', (data) => {
        // Try to get user information from token
        try {
            let { token, gameId } = data;

            let user = jwt.verify(token, publicKey);
            let { username } = user;
            // Check for playing with self
            let selfGuard = false;
            console.log(games[gameId]);
            if (games[gameId]['players'].length === 1
                && games[gameId]['players'][0]['username'] === username) {
                selfGuard = true;
            }

            if (games[gameId] && games[gameId]['players'].length < 2) {
                let game = games[gameId];
                currentGame = game;

                if (!selfGuard) {
                    game.players.push(user);
                    game.sockets.push(socket);
                }

                // Make socket join game room
                socket.join(gameId);
                socket.emit('join', {
                    status: true,
                    username: username
                });
                if (game['players'].length === 2) {
                    // Can start the game
                    startGame(game, io);

                    // TODO: find a better way to clean this up
                    // Clean up openGames
                    for (let i = openGames.length - 1; i >= 0; i--) {
                        if (openGames[i]['players'].length === 2) {
                            openGames.splice(i, 1);
                        }
                    }
                }
            } else {
                socket.emit('join', {
                    status: false,
                    err: null
                });
            }
        } catch (err) {
            socket.emit('join', {
                status: false,
                err: err
            });
        }
    });
});

// Cleanup

process.stdin.resume();
const exitHandler = () => {
    try {
        pool.end();
        console.log('Pool ended.')
    } catch (err) {
        // Do nothing
    }

    process.exit();
};

process.on('exit', exitHandler.bind(null, { cleanup: true }));
process.on('SIGINT', exitHandler.bind(null, { exit: true }));
process.on('SIGUSR1', exitHandler.bind(null, { exit: true }));
process.on('SIGUSR2', exitHandler.bind(null, { exit: true }));
process.on('uncaughtException', exitHandler.bind(null, { exit: true }));
