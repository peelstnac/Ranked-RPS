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
        choices[1] = data['choices'];
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

        // Send verdict
        io.to(game['id']).emit('finish', {
            verdict: verdict
        });
    }, 15000);
};

export default startGame;