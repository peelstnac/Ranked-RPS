'use strict';
import express from 'express';
import { v4 as uuidv4 } from 'uuid';
import fs from 'fs';
import path from 'path';
import jwt from 'jsonwebtoken';

const router = express.Router();

const publicKey = fs.readFileSync(path.join(__dirname, '..', 'keys', 'public.key')).toString();

let openGames = [];
let fullGames = [];

class Game {
    constructor(id, players) {
        this.id = id;
        this.players = players;
    }
}

// Middleware to verify if authorized
router.use('/', (req, res, next) => {
    let header = req.header('Authorization');
    if (typeof header !== 'string') {
        res.sendStatus(401).end();
    }
    let split = header.split(' ');
    if (split.length < 2) {
        res.sendStatus(401).end();
    }
    try {
        let user = jwt.verify(split[1], publicKey);
        req.user = user;
        next();
    } catch (err) {
        res.sendStatus(401).end();
    }
});

router.post('/join', (req, res) => {
    if (openGames.length !== 0) {
        let top = openGames.pop();
        res.json({
            gameId: top.id
        });
    } else {
        // Create a new games
        let gameId = uuidv4();
        let { user } = req.body;
        let game = new Game(gameId, [user]);
        openGames.push(game);
        res.json({
            gameId: gameId
        });
    }
});

export default router;