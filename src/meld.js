import React from 'react';
import PlayingCard from './playing-card';

const Meld = props => {
    return (
        <div style={{position: 'relative'}}>
            {props.cards.map((card, cardIndex)=>(
                <PlayingCard card={card}
                             imageLocation={'beside'}
                             size={.2}
                             top={(cardIndex * 25) + 'px'}
                             key={cardIndex}
                />
            ))}
        </div>
    );
};

export default Meld;
