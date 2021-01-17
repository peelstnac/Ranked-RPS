'use strict';
import express from 'express';
import { v4 as uuidv4 } from 'uuid';
import fs from 'fs';
import path from 'path';
import jwt from 'jsonwebtoken';
import { openGames, games } from '../server';

const router = express.Router();

const publicKey = fs.readFileSync(path.join(__dirname, '..', 'keys', 'public.key')).toString();

class Game {
    constructor(id, players) {
        this.id = id;
        this.players = players;
        this.sockets = [];
    }
}

const checkAuthMiddleware = (req, res, next) => {
    let header = req.header('Authorization');
    if (typeof header !== 'string') {
        res.sendStatus(401);
    }
    let split = header.split(' ');
    if (split.length < 2) {
        res.sendStatus(401);
    }
    try {
        let user = jwt.verify(split[1], publicKey);
        req.user = user;
        next();
    } catch (err) {
        res.sendStatus(401);
    }
};

// TODO: implement join time limit. If limit passes, put game into openGames again.
router.get('/join', checkAuthMiddleware, (req, res) => {
    if (openGames.length !== 0) {
        let top = openGames.pop();
        let { user } = req;
        top.players.push(user);
        res.status(200).json({
            gameId: top.id
        });
    } else {
        // Create a new games
        let gameId = uuidv4();
        let { user } = req;
        let game = new Game(gameId, [user]);
        games[gameId] = game;
        openGames.push(game);
        res.status(200).json({
            gameId: gameId
        });
    }
});

export default router;