import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import './playing-card.less';

import PlayingCard from './../src/playing-card';

const card = {
    suit: 'C',
    rank: 'A',
    cardId: '1',
    value: 13,
    selected: false
};
const pinned = {
    suit: 'C',
    rank: 'A',
    cardId: '1',
    value: 13,
    selected: false,
    pinValue: 2
};
const joker = {
    suit: 'J',
    rank: 'A',
    cardId: '1',
    value: 13,
    selected: false
};

storiesOf('PlayingCard', module)
  .add('not selected', () => <PlayingCard card={card}
                                          imageLocation={'below'}
                                          size={.2}
                                          left={(0 * 25) + 'px'}
                                          selected={false}
                                          onSelect={action('selected')}
                                          onPinned={action('pinned')}
                                          onMoved={action('moved')}
                            />)
  .add('selected', () => <PlayingCard card={card}
                                      imageLocation={'below'}
                                      size={.2}
                                      left={(0 * 25) + 'px'}
                                      selected={true}
                                      onSelect={action('selected')}
                                      onPinned={action('pinned')}
                                      onMoved={action('moved')}
                            />)
  .add('pinned', () => <PlayingCard card={pinned}
                                    imageLocation={'below'}
                                    size={.2}
                                    left={(0 * 25) + 'px'}
                                    selected={true}
                                    onSelect={action('selected')}
                                    onPinned={action('pinned')}
                                    onMoved={action('moved')}
                            />)
  .add('joker', () => <PlayingCard card={joker}
                                   imageLocation={'below'}
                                   size={.2}
                                   left={(0 * 25) + 'px'}
                                   selected={true}
                                   onSelect={action('selected')}
                                   onPinned={action('pinned')}
                                   onMoved={action('moved')}
                            />)
  .add('no icons', () => <PlayingCard card={card}
                                      imageLocation={'below'}
                                      size={.2}
                                      left={(0 * 25) + 'px'}
                                      selected={true}
                                      onSelect={action('selected')}
                                      onPinned={null}
                                      onMoved={null}
                            />)
  .add('image beside', () => <PlayingCard card={card}
                                          imageLocation={'beside'}
                                          size={.2}
                                          left={(0 * 25) + 'px'}
                                          selected={true}
                                          onSelect={action('selected')}
                                          onPinned={action('pinned')}
                                          onMoved={action('moved')}
                            />);
