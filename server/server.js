'use strict';
import express from 'express';
import path from 'path';

import auth from './routes/auth';
import lobby from './routes/lobby';

import pool from './db/connection';
import test from './db/test';

import http from 'http';
import sio from 'socket.io';

const app = express();
const server = http.createServer(app);
export const io = sio(server, { path: '/lobby/socket.io' });

app.use(express.json());
app.use(express.static(path.join(__dirname, '..', 'client', 'build', 'static')));

app.use('/auth', auth);
app.use('/lobby', lobby);

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'client', 'build', 'index.html'));
});

let port = process.env.PORT || 9000;
server.listen(port, () => {
    console.log(`Listening on port ${port}`);
});

test();

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

// Sockets

export var openGames = [];
export var fullGames = [];
export var games = {};

// For debugging purposes
io.on('connection', (socket) => {
    console.log(socket.id);

    socket.on('disconnect', () => {
        console.log('disconnect ' + socket.id);
    });
});