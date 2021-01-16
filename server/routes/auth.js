'use strict';
import express from 'express';
import query from '../db/query';
import bcrypt from 'bcrypt';
import pool from '../db/connection';

const router = express.Router();

router.post('/register', (req, res, next) => {
    // Register user
    try {
        let { username, password } = req.body.credentials;
        // Check validity of credentials
        if (typeof username !== 'string' || typeof password !== 'string') {
            res.sendStatus(400).end();
        } else if (username.length === 0 || password.length === 0) {
            res.sendStatus(400).end();
        } else {
            // Valid
            const saltRounds = 10;
            bcrypt.hash(password, saltRounds).then(async (hash) => {
                // Save credentials to database
                let text = 'INSERT INTO auth(username, password) VALUES($1, $2) RETURNING *';
                let values = [username, hash];
                let [err, rows] = await query(text, values);
                if (err) {
                    res.sendStatus(500).end();
                } else {
                    res.sendStatus(200).end();
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
            res.sendStatus(500).end();
        } else if (rows.length === 0) {
            res.sendStatus(400).end();
        } else {
            let row = rows[0];
            let hash = row['password'];
            // TODO: continue tomorrow
        }
    } catch (err) {
        next(err);
    }
});

export default router;