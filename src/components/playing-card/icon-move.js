import React from 'react';
import Debounce from '../../utils/debounce';
import styled from 'styled-components';
import Config from '../../utils/config';
import IconRank from './icon-rank';
import IconSuit from './icon-suit';
import IconPin from './icon-pin';

export default function IconMove({showIcons, selected, onMoved}) {
    const Move = styled.i`
        position: absolute;
        top: ${Config.moveOffsetTop};
        left: ${Config.baseLeftMark};
    `;

    const moveDebounce = new Debounce(onMoved, 300, true);

    const showMove = onMoved && selected && showIcons;

    if (!showMove) {
        return null;
    }
    return (
        <Move className="glyphicon glyphicon-move"
            onClick={onMoved ? event => moveDebounce.debounce(event) : null}
        />
    );
}

IconMove.defaultProps = {
    showIcons: false,
    selected: false,
    onMoved: null
};
