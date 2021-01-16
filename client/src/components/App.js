import React from 'react';

const App = () => {
    return (
        <div>
            <h1 onClick={() => {
                fetch('/auth/register', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        credentials: {
                            username: '1',
                            password: '2'
                        }
                    })
                });
            }}>Hello World!</h1>
            <h1 onClick={() => {
                fetch('/auth/login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        credentials: {
                            username: '1',
                            password: '2'
                        }
                    })
                });
            }}>Hello World!</h1>
        </div>
    );
};

export default App;