import React from 'react';
import styled from 'styled-components';
import Config from '../../utils/config';

const RankBase = styled.div`
    font-size: ${Config.cardMarkFontSize};
    position: absolute;
    font-weight: bold;
`;
const Rank = styled(RankBase)`
    top: ${Config.baseTopMark};
    left: ${Config.baseLeftMark};
`;
const RankReversed = styled(RankBase)`
    -moz-transform: rotate(180deg);
    -ms-transform: rotate(180deg);
    -webkit-transform: rotate(180deg);
    transform: rotate(180deg);
    bottom: ${Config.baseTopMark};
    right: ${Config.baseLeftMark};
`;

export default function IconRank({card, reversed}) {
    if (card.suit === 'J') {
        return null;
    }
    if (reversed) {
        return (
            <RankReversed>{card.rank}</RankReversed>
        );
    }
    return (
        <Rank>{card.rank}</Rank>
    );
}

IconRank.defaultProps = {
    card: null,
    reversed: false
};
