import React, { useState, useEffect } from 'react';
import './Leaderboard.css';
import Spinner from '../Spinner/Spinner';

const Leadberboard = () => {
    let [rows, setRows] = useState(null);

    useEffect(async () => {
        setRows(await fetch('/data/leaderboard').then(async (res) => {
            if (res.status !== 200) {
                return null;
            }

            return await res.json();
        }), []);
    });

    let content;
    if (!rows) {
        content = (
            <div className="leaderboard-spinner-container">
                <Spinner />
            </div>
        );
    } else {
        let tb = [];
        for (let row of rows['rows']) {
            tb.push(
                <tr key={row['username']}>
                    <td>
                        {row['username']}
                    </td>
                    <td>
                        {row['rating']}
                    </td>
                    <td>
                        {row['wins']}
                    </td>
                    <td>
                        {row['losses']}
                    </td>
                </tr>
            );
        }

        content = (
            <div className="leaderboard-table-container">
                <p>
                    Leaderboard
                </p>
                <table>
                    <tr>
                        <th>
                            Username
                        </th>
                        <th>
                            Rating
                        </th>
                        <th>
                            Wins
                        </th>
                        <th>
                            Losses
                        </th>
                    </tr>
                    {tb}
                </table>
            </div>
        );
    }

    return (
        <div className="leaderboard-container">
            {content}
        </div>
    )
};

export default Leadberboard;