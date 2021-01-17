'use strict';
import express from 'express';
import fs from 'fs';
import path from 'path';
import query from '../db/query';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const router = express.Router();

const privateKey = fs.readFileSync(path.join(__dirname, '..', 'keys', 'private.key')).toString();
const publicKey = fs.readFileSync(path.join(__dirname, '..', 'keys', 'public.key')).toString();

router.get('/status', (req, res) => {
    let header = req.header('Authorization');
    if (typeof header !== 'string') {
        res.status(200).json({ status: false });
    }
    let split = header.split(' ');
    if (split.length < 2) {
        res.status(200).json({ status: false });
    }
    try {
        let user = jwt.verify(split[1], publicKey);
        res.status(200).json({
            status: true,
            user: user
        });
    } catch (err) {
        res.status(200).json({ status: false });
    }
});

router.post('/register', (req, res, next) => {
    // Register user
    try {
        let { username, password } = req.body.credentials;
        // Check validity of credentials
        if (typeof username !== 'string' || typeof password !== 'string') {
            res.status(400).end();
        } else if (username.length === 0 || password.length === 0) {
            res.status(400).end();
        } else {
            // Valid
            const saltRounds = 10;
            bcrypt.hash(password, saltRounds).then(async (hash) => {
                // Save credentials to database

                // FIRST QUERY
                let text = 'INSERT INTO auth(username, password) VALUES($1, $2) RETURNING *';
                let values = [username, hash];
                let [err, rows] = await query(text, values);

                // SECOND QUERY
                text = 'INSERT INTO data(username, rating, wins, losses) VALUES($1, $2, $3, $4) RETURNING *';
                values = [username, 1500, 0, 0];
                [err, rows] = await query(text, values);

                if (err) {
                    console.log(err);
                    res.status(500).end();
                } else {
                    res.status(200).end();
                }
            });
        }
    } catch (err) {
        next(err);
    }
});

router.post('/login', async (req, res, next) => {
    // Authenticate user
    try {
        let { username, password } = req.body.credentials;

        // Search for username in database
        let text = 'SELECT * FROM auth WHERE username=$1';
        let values = [username];
        let [err, rows] = await query(text, values);
        if (err) {
            res.status(500).end();
        } else if (rows.length === 0) {
            res.status(400).end();
        } else {
            let row = rows[0];
            let hash = row['password'];
            bcrypt.compare(password, hash).then((verdict) => {
                if (verdict !== true) {
                    res.status(400).end();
                }
                // Password matches
                const token = jwt.sign({
                    username: username,
                    permissions: row['permissions']
                }, privateKey, {
                    algorithm: 'RS256',
                    expiresIn: '1d'
                });
                res.status(200).json({
                    token: token
                });
            }).catch((err) => {
                res.status(500).end();
            })
        }
    } catch (err) {
        next(err);
    }
});

export default router;