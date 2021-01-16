'use strict';
import express from 'express';
import { v4 as uuidv4 } from 'uuid';
import fs from 'fs';
import path from 'path';
import jwt from 'jsonwebtoken';
import { io, openGames, fullGames, games } from '../server';

const router = express.Router();

const publicKey = fs.readFileSync(path.join(__dirname, '..', 'keys', 'public.key')).toString();

class Game {
    constructor(id, players) {
        this.id = id;
        this.players = players;
    }
}

// TODO: implement join time limit. If limit passes, put game into openGames again.
router.post('/join', (req, res) => {
    if (openGames.length !== 0) {
        let top = openGames.pop();
        res.json({
            gameId: top.id
        });
    } else {
        // Create a new games
        let gameId = uuidv4();
        let { user } = req.user;
        let game = new Game(gameId, [user]);
        games[gameId] = game;
        openGames.push(game);
        res.json({
            gameId: gameId
        });
    }
});

router.get('/session/:gameId', (req, res) => {

});

export default router;