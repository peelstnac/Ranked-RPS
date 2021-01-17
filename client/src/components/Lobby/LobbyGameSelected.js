import React from 'react';
import PropTypes from 'prop-types';

const LobbyGameSelected = (props) => {
    return <p>You've selected {props.name}</p>;
};

LobbyGameSelected.propTypes = {
    name: PropTypes.string.isRequired
};

export default LobbyGameSelected;