'use strict';
import express from 'express';
import { v4 as uuidv4 } from 'uuid';

const router = express.Router();

let openGames = [];
let fullGames = [];

class Game {
    constructor(id, players) {
        this.id = id;
        this.players = players;
    }
}

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