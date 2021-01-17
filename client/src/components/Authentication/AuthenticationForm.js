import React, { useState } from 'react';

const AuthenticationForm = (props) => {
    let [username, setUsername] = useState('');
    let [password, setPassword] = useState('');

    const handleLogin = (e) => {
        e.preventDefault();
        fetch('/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                credentials: {
                    username: username,
                    password: password
                }
            })
        }).then((res) => {
            let status = res.status;
            switch (status) {
                case 200:
                    // Login success
                    res.json().then((data) => {
                        localStorage.setItem('Ranked RPS Token', data['token']);
                        window.location.href = '/';
                        setPassword('');
                    });
                    break;
                case 400:
                    alert('Incorrect username or password.');
                    setPassword('');
                    break;
                case 500:
                    alert('Server error.');
                    setPassword('');
                    break;
                default:
                    alert('Login failed.');
                    console.error('Default case triggered. Status code ' + status.toString());
            }
        })
    };

    const handleRegister = (e) => {
        e.preventDefault();
        fetch('/auth/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                credentials: {
                    username: username,
                    password: password
                }
            })
        }).then((res) => {
            let status = res.status;
            switch (status) {
                case 200:
                    // Register success
                    setUsername('');
                    setPassword('');
                    alert('Register successful.')
                    break;
                case 400:
                    alert('Incorrect username/password format or duplicate username.');
                    setUsername('');
                    setPassword('');
                    break;
                case 500:
                    alert('Server error.');
                    setPassword('');
                    break;
                default:
                    alert('Register failed.');
                    console.error('Default case triggered. Status code ' + status.toString());
            }
        });
    };

    return (
        <form className="authentication-form">
            <label htmlFor="username">Username</label><br />
            <input
                onChange={(e) => {
                    setUsername(e.target.value);
                }}
                value={username}
                type="text"
                name="username">
            </input><br />
            <label htmlFor="password">Password</label><br />
            <input
                onChange={(e) => {
                    setPassword(e.target.value);
                }}
                value={password}
                type="password"
                name="password">
            </input>
            <div className="authentication-form-button-container">
                <button
                    className="authentication-form-button"
                    onClick={handleLogin}
                >Login</button>
                <button
                    className="authentication-form-button"
                    onClick={handleRegister}
                >Register</button>
            </div>
        </form>
    );
};

export default AuthenticationForm;