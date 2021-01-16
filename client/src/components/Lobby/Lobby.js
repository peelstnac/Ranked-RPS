import React, { useEffect } from 'react';
import { io } from 'socket.io-client';

let socket;

const Lobby = () => {
    useEffect(() => {
        socket = io({ path: '/lobby/socket.io' });
    }, []);
    return (
        <p>1</p>
    );
};

export default Lobby;