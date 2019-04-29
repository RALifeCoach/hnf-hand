import React from 'react';
import Debounce from '../../utils/debounce';
import styled from 'styled-components';
import Config from '../../utils/config';
import IconRank from './icon-rank';
import IconSuit from './icon-suit';
import IconPin from './icon-pin';
import IconMove from './icon-move';

export default function CardIcons({card, selected, imageLocation, showIcons, pinValue, onPinned, onMoved}) {
    return (
        <div>
            <IconRank
                card={card}
                reversed={false}
                key={0}
            />
            <IconSuit
                card={card}
                imageLocation={imageLocation}
                reversed={false}
                key={1}
            />
            <IconSuit
                card={card}
                imageLocation={imageLocation}
                reversed={true}
                key={2}
            />
            <IconRank
                card={card}
                reversed={true}
                key={3}
            />
            <IconPin
                selected={selected}
                showIcons={showIcons}
                pinValue={pinValue}
                onPinned={onPinned}
            />
            <IconMove
                selected={selected}
                showIcons={showIcons}
                onMoved={onMoved}
            />
        </div>
    );
}

CardIcons.defaultProps = {
    card: null,
    imageLocation: 'below',
    selected: false,
    showIcons: false,
    onPinned: null,
    onMoved: null
};
