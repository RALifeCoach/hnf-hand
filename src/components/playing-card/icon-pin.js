import React from 'react';
import Debounce from '../../utils/debounce';
import styled from 'styled-components';
import Config from '../../utils/config';

export default function IconPin({selected, showIcons, pinValue, onPinned}) {
    const Pin = styled.i`
        position: absolute;
        top: ${Config.pinOffsetTop};
        left: ${Config.baseLeftMark};
        opacity: ${selected ? 1 : .2};
    `;

    const pinDebounce = new Debounce(onPinned, 300, true);

    const showPin = onPinned && (pinValue > 0 || (selected && showIcons));

    if (!showPin) {
        return null;
    }
    return (
        <Pin className="glyphicon glyphicon-pushpin"
            onClick={onPinned ? event => pinDebounce.debounce(event) : null}
        />
    );
}

IconPin.defaultProps = {
    selected: false,
    showIcons: false,
    pinValue: 0,
    onPinned: null
};
