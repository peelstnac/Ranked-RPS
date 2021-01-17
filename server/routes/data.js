import express from 'express';
import query from '../db/query';

const router = express.Router();

// TODO: extend this to as many users
router.get('/leaderboard', async (req, res) => {
    let text = 'SELECT * FROM data ORDER BY rating DESC LIMIT 10';
    let [err, rows] = await query(text);
    if (err) {
        res.status(500).end();
    }
    res.json({
        rows: rows
    });
});

router.get('/profile', async (req, res) => {

});

export default router;