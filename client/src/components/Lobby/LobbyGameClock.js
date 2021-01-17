import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

let clock;

const LobbyGameClock = (props) => {
    let [left, setLeft] = useState(props.duration);
    useEffect(() => {
        clock = setInterval(() => {
            if (left === 1) {
                props.handleEnd();
                clearInterval(clock);
            }
            setLeft(left--);
        }, 1000);
        return () => {
            try {
                clearInterval(clock);
            } catch (err) {
                // Do nothing
            }
        };
    }, []);

    return (
        <p>{left}</p>
    );
};

LobbyGameClock.propTypes = {
    duration: PropTypes.number.isRequired,
    handleEnd: PropTypes.func.isRequired
};

export default LobbyGameClock;