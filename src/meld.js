import React from 'react';
import PlayingCard from './playing-card';

const Hand = props => {
    return (
        <div>
            {props.cards.map((card, cardIndex)=>(
                <PlayingCard suit={card.suit}
                             rank={card.rank}
                             imageLocation={'below'}
                             size={.2}
                             left={(cardIndex * 25) + 'px'}
                />
            ))}
        </div>
    );
};

export default Hand;
