'use strict';
import express from 'express';
import path from 'path';

import auth from './routes/auth';
import game from './routes/game';

import pool from './db/connection';
import test from './db/test';

const app = express();

app.use(express.json());
app.use(express.static(path.join(__dirname, '..', 'client', 'build', 'static')));

app.use('/auth', auth);
app.use('/game', game);

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'client', 'build', 'index.html'));
});

let port = process.env.PORT || 9000;
app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});

test();

process.stdin.resume();
const exitHandler = () => {
    try {
        pool.end();
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