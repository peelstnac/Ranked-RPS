import React from 'react';
import PropTypes from 'prop-types';
import './LobbyGameCard.css';
import Card from 'react-animated-3d-card';

const LobbyGameCard = (props) => {
    return (
        <Card
            onClick={() => { props.handleSelect(props.name) }}
            style={{
                background: 'linear-gradient(90deg, rgba(5,130,202,1) 0%, rgba(0,100,148,1) 50%, rgba(5,130,202,1) 100%)',
                width: '300px',
                height: '450px',
                boxShadow: '5px 5px 10px grey',
                cursor: 'pointer',
            }}
        >
            <div className="lobby-game-card-contents">
                <p>
                    {props.name}
                </p>
            </div>
        </Card>
    );
};

LobbyGameCard.propTypes = {
    name: PropTypes.string.isRequired,
    img: PropTypes.func.isRequired,
    handleSelect: PropTypes.func.isRequired
};

export default LobbyGameCard;