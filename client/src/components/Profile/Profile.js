import React, { useState, useEffect } from 'react';
import './Profile.css';
import Spinner from '../Spinner/Spinner';

const Profile = () => {
    let [data, setData] = useState(null);
    useEffect(async () => {
        setData(await fetch('/data/profile', {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('Ranked RPS Token')
            }
        }).then(async (res) => {
            if (res.status !== 200) {
                return null;
            }

            return await res.json();
        }));
    }, []);

    let content;
    // Taking CSS from Leaderboard
    if (!data) {
        content = (
            <div className="leaderboard-spinner-container">
                <Spinner />
            </div>
        );
    } else {
        content = (
            <div className="leaderboard-table-container">
                <p>Profile</p>
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
                    <tr>
                        <td>
                            {data['username']}
                        </td>
                        <td>
                            {data['rating']}
                        </td>
                        <td>
                            {data['wins']}
                        </td>
                        <td>
                            {data['losses']}
                        </td>
                    </tr>
                </table>
            </div>
        );
    }

    return (
        <div className="leaderboard-container">
            {content}
        </div>
    );
};

export default Profile;