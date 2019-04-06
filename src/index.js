require.context("./static/", true, /^\.\/.*\.[html|js]/);

import React from 'react';
import ReactDOM from 'react-dom';
import PlayingCard from './playing-card';

ReactDOM.render(
    <PlayingCard
        suit='C'
        rank='5'
    />,
    document.getElementById('react-base')
);
