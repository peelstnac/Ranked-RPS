import query from './db/query';

// Winner takes 10% of Loser's rating rounded down
const handleStatsUpdate = async (winnerUsername, loserUsername) => {
    console.log(winnerUsername);
    console.log(loserUsername);

    let text = 'SELECT * FROM data WHERE username=$1';
    let values = [winnerUsername];
    let [err, winnerStats] = await query(text, values);

    values = [loserUsername];
    let [err2, loserStats] = await query(text, values);

    if (err || err2) {
        console.log(err, err2);
        return false;
    }

    winnerStats = winnerStats[0];
    loserStats = loserStats[0];

    winnerStats['rating'] = Number(winnerStats['rating']);
    winnerStats['wins'] = Number(winnerStats['wins']);
    winnerStats['losses'] = Number(winnerStats['losses']);
    loserStats['rating'] = Number(loserStats['rating']);
    loserStats['wins'] = Number(loserStats['wins']);
    loserStats['losses'] = Number(loserStats['losses']);

    let ratingTaken = Math.floor(loserStats['rating'] / 10);

    // Update
    text = 'UPDATE data SET rating=$1, wins=$2, losses=$3 WHERE username=$4 RETURNING *';

    values = [winnerStats['rating'] + ratingTaken, winnerStats['wins'] + 1, winnerStats['losses'], winnerStats['username']];
    [err, winnerStats] = await query(text, values);

    values = [loserStats['rating'] - ratingTaken, loserStats['wins'], loserStats['losses'] + 1, loserStats['username']];
    [err2, loserStats] = await query(text, values);

    if (err || err2) {
        console.log(err, err2);
        return false;
    }
};

const startGame = (game, io) => {
    if (process.env.NODE_ENV === 'development') {
        console.log(`Game ${game['id']} is starting.`);
    }
    // Notify players of start
    io.to(game['id']).emit('start', game['players']);
    // Players are given 15 seconds to make a choice

    const P_ZERO = game['sockets'][0];
    const P_ONE = game['sockets'][1];

    let choices = [null, null];

    P_ZERO.on('choice', (data) => {
        choices[0] = data['choice'];
    });

    P_ONE.on('choice', (data) => {
        choices[1] = data['choice'];
    });

    setTimeout(() => {
        // Evaluate winner
        const validChoices = ['rock', 'paper', 'scissors'];

        // -1 tie, 0 P_ZERO, 1 P_ONE
        let verdict;

        if (!validChoices.includes(choices[0]) && !validChoices.includes(choices[1])) {
            verdict = -1;
        } else if (validChoices.includes(choices[0]) && !validChoices.includes(choices[1])) {
            verdict = 0;
        } else if (!validChoices.includes(choices[0]) && validChoices.includes(choices[1])) {
            verdict = 1;
        } else if (choices[0] === choices[1]) {
            verdict = -1;
        } else {
            // Examine P_ZERO win conditions
            if (choices[0] === 'rock' && choices[1] === 'scissors') verdict = 0;
            else if (choices[0] === 'paper' && choices[1] === 'rock') verdict = 0;
            else if (choices[0] === 'scissors' && choices[1] === 'paper') verdict = 0;
            else verdict = 1;
        }

        // Update player stats

        if (verdict === 0) {
            handleStatsUpdate(game['players'][0]['username'], game['players'][1]['username']);
        }
        if (verdict === 1) {
            handleStatsUpdate(game['players'][1]['username'], game['players'][0]['username']);
        }

        if (process.env.NODE_ENV === 'development') {
            console.log(`Game ${game['id']} verdict ${verdict}.`);
        }

        // Send verdict
        io.to(game['id']).emit('finish', {
            verdict: verdict
        });
    }, 12000);
};

export default startGame;