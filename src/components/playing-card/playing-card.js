import React, {Component} from 'react';
import Debounce from './../../utils/debounce';

const SUITS = {
    C: {
        image: String.fromCharCode(9827)
    },
    D: {
        image: String.fromCharCode(9830)
    },
    H: {
        image: String.fromCharCode(9829)
    },
    S: {
        image: String.fromCharCode(9824)
    },
    J: {
        image: String.fromCharCode(9733)
    }
};

export default function PlayingCard({selected, card, imageLocation, onSelect, onPinned, onMoved}) {
    const classNames = ['c-playing-card'];
    selected && classNames.push('is-selected');
    card.suit === 'C' && classNames.push('is-club');
    card.suit === 'D' && classNames.push('is-diamond');
    card.suit === 'H' && classNames.push('is-heart');
    card.suit === 'S' && classNames.push('is-spade');
    card.suit === 'J' && classNames.push('is-joker');
    imageLocation === 'below' ? classNames.push('is-below') : classNames.push('is-beside');
    card.pinValue && classNames.push('is-pinned');

    const selectDebounce = new Debounce(onSelect, 300, true);
    const pinDebounce = new Debounce(onPinned, 300, true);
    const moveDebounce = new Debounce(onMoved, 300, true);

    return (
        <div
            className={classNames.join(' ')}
            onClick={onSelect ? event => selectDebounce.debounce(event) : null}
        >
            {card.cardText &&
                <div className="s-card-text">
                    {card.cardText}
                </div>
            }
            {!card.cardText &&
                <div>
                    <div className="s-card-mark">
                        {card.rank}
                    </div>
                    <div className="s-card-suit">
                        {SUITS[card.suit].image}
                    </div>
                    <div className="s-card-suit is-reversed">
                        {SUITS[card.suit].image}
                    </div>
                    <div className="s-card-mark is-reversed">
                        {card.rank}
                    </div>
                    {selected && onPinned &&
                        <i className="s-card-pin glyphicon glyphicon-pushpin"
                           onClick={onPinned ? event => pinDebounce.debounce(event) : null}
                        />
                    }
                    {selected && onMoved &&
                        <i className="s-card-move glyphicon glyphicon-move"
                           onClick={onMoved ? event => moveDebounce.debounce(event) : null}
                        />
                    }
                </div>
            }
        </div>
    );
}

PlayingCard.defaultProps = {
    size: 1,
    imageLocation: 'below',
    selected: false,
    pinValue: 0,
    onSelect: null,
    onPinned: null
};
