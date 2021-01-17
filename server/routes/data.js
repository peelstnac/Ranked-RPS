import express from 'express';
import fs from 'fs';
import path from 'path';
import jwt from 'jsonwebtoken';
import query from '../db/query';

const publicKey = fs.readFileSync(path.join(__dirname, '..', 'keys', 'public.key')).toString();

const router = express.Router();

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
        console.log(err);
        res.status(401).end();
    }
};

// TODO: extend this to as many users
router.get('/leaderboard', async (req, res) => {
    let text = 'SELECT * FROM data ORDER BY rating DESC LIMIT 10';
    let [err, rows] = await query(text, []);
    if (err) {
        res.status(500).end();
    }
    res.status(200).json({
        rows: rows
    });
});

router.get('/profile', checkAuthMiddleware, async (req, res) => {
    let { username } = req.user;
    console.log(username);
    let text = 'SELECT * FROM data WHERE username=$1';
    let values = [username];
    let [err, rows] = await query(text, values);
    if (err) {
        console.log(err);
        res.status(500).end();
    }
    console.log(rows);
    res.status(200).json({
        username: username,
        rating: rows[0]['rating'],
        wins: rows[0]['wins'],
        losses: rows[0]['losses']
    });
});

export default router;