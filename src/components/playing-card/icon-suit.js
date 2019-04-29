import React from 'react';
import styled from 'styled-components';
import Config from '../../utils/config';

export default function IconSuit({card, imageLocation, reversed}) {
    const SuitBase = styled.div`
        font-family: "Lucida Sans Unicode", "Lucida Grande", sans-serif;
        position: absolute;
        font-weight: bold;
    `;
    const Suit = styled(SuitBase)`
        top: ${card.suit === 'J' ? Config.baseTopMark : imageLocation === 'below' ? Config.belowOffsetTop : Config.baseTopSuit};
        left: ${imageLocation === 'below' ? Config.baseLeftMark : Config.besideOffsetLeft};
    `;
    const SuitReversed = styled(SuitBase)`
        -moz-transform: rotate(180deg);
        -ms-transform: rotate(180deg);
        -webkit-transform: rotate(180deg);
        transform: rotate(180deg);
        bottom: ${card.suit === 'J' ? Config.baseTopMark : imageLocation === 'below' ? Config.belowOffsetTop : Config.baseTopSuit};
        right: ${imageLocation === 'below' ? Config.baseLeftMark : Config.besideOffsetLeft};
    `;

    const image = Config.suitConstants[card.suit].image;
    if (reversed) {
        return (
            <SuitReversed>{image}</SuitReversed>
        );
    }
    return (
        <Suit>{image}</Suit>
    );
}

IconSuit.defaultProps = {
    card: null,
    imageLocation: 'below',
    reversed: false
};
