import React, { useState } from 'react';
import Debounce from './../../utils/debounce';
import styled from 'styled-components';
import Config from '../../utils/config';
import CardIcons from './card-icons';

export default function PlayingCard({card, left, onSelect, cardSelected, ...props}) {
    const [ selected, setSelect ] = useState(cardSelected);
    const selectDebounce = new Debounce(() => {
        setSelect(!selected);
        onSelect();
    }, 300, true);

    const Card = styled.div`
        position: absolute;
        left: ${left};
        width: 70px;
        height: 98px;
        overflow: hidden;
        margin-top: ${selected ? 0 : '10px'};
        background: ${Config.cardBackground};
        -moz-border-radius: 12px;
        -webkit-border-radius: 12px;
        border-radius: 12px;
        -moz-box-shadow: 1px 1px 6px rgba(0, 0, 0, 0.25);
        -webkit-box-shadow: 1px 1px 6px rgba(0, 0, 0, 0.25);
        box-shadow: 1px 1px 6px rgba(0, 0, 0, 0.25);
        color: ${Config.suitConstants[card.suit].color}
    `;

    return (
        <Card
            onClick={onSelect ? event => selectDebounce.debounce(event) : null}
        >
            {card.cardText &&
                <div className="s-card-text">
                    {card.cardText}
                </div>
            }
            {!card.cardText && (
                <CardIcons
                    card={card}
                    selected={selected}
                    {...props}
                />
            )}
        </Card>
    );
}

PlayingCard.defaultProps = {
    card: null,
    imageLocation: 'below',
    left: 0,
    showIcons: false,
    onSelect: null,
    onPinned: null,
    onMoved: null
};
