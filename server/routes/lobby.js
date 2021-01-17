'use strict';
import express from 'express';
import { v4 as uuidv4 } from 'uuid';
import fs from 'fs';
import path from 'path';
import jwt from 'jsonwebtoken';
import { openGames, fullGames, games } from '../server';

const router = express.Router();

const publicKey = fs.readFileSync(path.join(__dirname, '..', 'keys', 'public.key')).toString();

class Game {
    constructor(id, players) {
        this.id = id;
        this.players = players;
        this.sockets = [];
    }
    /**
     * Removes game. Only call when a game has 1 player or when game is finished.
     * @param {String} username 
     */
    removeGame() {
        delete games[this.id];
        for (let i = 0; i < openGames.length; i++) {
            if (this.id === openGames[i]['id']) {
                openGames.splice(i, 1);
                break;
            }
        }
        for (let i = 0; i < fullGames.length; i++) {
            if (this.id === fullGames[i]['id']) {
                fullGames.splice(i, 1);
                break;
            }
        }
    }
}

const checkAuthMiddleware = (req, res, next) => {
    let header = req.header('Authorization');
    if (typeof header !== 'string') {
        res.status(401).end();
    }
    let split = header.split(' ');
    if (split.length < 2) {
        res.status(401).end();
    }
    try {
        let user = jwt.verify(split[1], publicKey);
        req.user = user;
        next();
    } catch (err) {
        res.status(401).end();
    }
};

// TODO: implement join time limit. If limit passes, put game into openGames again.
// TODO: implement selfGuard
router.get('/join', checkAuthMiddleware, (req, res) => {
    if (openGames.length !== 0) {
        let top = openGames.pop();
        fullGames.push(top);
        // let { user } = req;
        // top.players.push(user);
        res.status(200).json({
            gameId: top.id
        });
    } else {
        // Create a new games
        let gameId = uuidv4();
        // let { user } = req;
        let game = new Game(gameId, []);
        games[gameId] = game;
        openGames.push(game);
        res.status(200).json({
            gameId: gameId
        });
    }
});

export default router;