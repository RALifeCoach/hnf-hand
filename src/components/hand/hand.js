import PlayingCard from './../playing-card/playing-card';
import React, { useState } from 'react';
import styled from 'styled-components';
import Config from '../../utils/config';
import { sortHand } from '../../utils/card-utils';
import CardManagement from '../../utils/card-management';

const DivHand = styled.div`
    height: auto;
    width: auto;
    display: block;
`;
const Sorts = styled.div`
    width: 95px;
    padding: 20px;
    float: left;
`;
const SortButton = styled.div`
    display: block;
    padding: 15px;
    border: 1px solid grey;
`;
const Cards = styled.div`
    position: relative;
    float: left;
`;

export default function HandComponent(props) {
    const [ sortState, setSortState ] = useState('');
    const [ moveState, setMoveState ] = useState('');
    const [ showIcons, setShowIcons ] = useState(false);

    const toggleSelect = card => {
        CardManagement.toggleSelect(card);
        const newShowIcons = CardManagement.countSelectedCards() === 1;
        if (showIcons !== newShowIcons) {
            setShowIcons(newShowIcons);
        }
    }

    const SortSuit = styled(SortButton)`
        background-color: ${sortState === 'suit' ? Config.buttonHighlight : '#fff'};
        margin-top: 20px;
    `;
    const SortRank = styled(SortButton)`
        background-color: ${sortState === 'rank' ? Config.buttonHighlight : '#fff'};
    `;

    CardManagement.arrangeCards(props.cards);
    const cards = sortHand(props.cards, sortState);
    const selectable = !moveState;
    const moveable = showIcons && !moveState;
    return (
        <DivHand>
            <Sorts>
                <SortRank
                    onClick={sortState !== 'rank' ? () => setSortState('rank') : null}
                >
                    A-4
                </SortRank>
                <SortSuit
                    onClick={sortState !== 'suit' ? () => setSortState('suit') : null}
                >
                    {String.fromCharCode(9824)}-{String.fromCharCode(9827)}
                </SortSuit>
            </Sorts>
            <Cards>
                {cards.map((card, cardIndex) => {
                    return (
                        <PlayingCard
                            card={card}
                            imageLocation={'below'}
                            left={(cardIndex * 25) + 'px'}
                            showIcons={showIcons}
                            cardSelected={CardManagement.isSelected(card)}
                            onSelect={selectable ? () => toggleSelect(card) : null}
                            onPinned={moveable ? event => this.onPinned(event, card) : null}
                            onMoved={moveable ? event => this.onMoveStart(event, card) : null}
                            key={cardIndex}
                        />
                    );
                })}
                {moveState && (
                    <PlayingCard
                        card={{cardText: 'Move to front of hand.'}}
                        imageLocation={''}
                        left={(cards.length * 25) + 'px'}
                        onSelect={() => this.onMoveEnd(null)}
                        onPinned={null}
                        onMoved={null}
                        key={cards.length}
                    />
                )}
            </Cards>
        </DivHand>
    );
}
//     onSelect(updateCard) {
//         const selectedCard = this.state.cards.find(card=>card.cardId === updateCard.cardId);
//         selectedCard.selected = !selectedCard.selected;
//         this.setState({
//             cards: this.state.cards
//         });
//     }

//     onPinned(event, updateCard) {
//         event.stopPropagation();
//         const cards = [...this.state.cards];
//         const selectedCard = cards.find(card=>card.cardId === updateCard.cardId);
//         let pinValue = this.state.pinValue;
//         if (selectedCard.pinValue) {
//             cards.forEach(card=>card.pinValue = card.pinValue > selectedCard.pinValue ? card.pinValue - 1 : card.pinValue);
//             selectedCard.pinValue = 0;
//             pinValue -= 1;
//         } else {
//             selectedCard.pinValue = ++pinValue;
//         }
//         const sortedCards = this.sortHand(cards, this.state.sortState);
//         this.setState({
//             cards: sortedCards,
//             pinValue
//         });
//     }

//     onMoveStart(event, updateCard) {
//         event.stopPropagation();
//         const selectedCard = this.state.cards.find(card=>card.cardId === updateCard.cardId);
//         this.selectedCard = selectedCard;
//         selectedCard.selected = true;
//         this.setState({
//             cards: this.state.cards,
//             moveState: 'move'
//         });
//     }

//     onMoveEnd(updateCard) {
//         const movingCardIndex = this.state.cards.findIndex(card=>card.cardId === this.selectedCard.cardId);
//         const destinationCardIndex = updateCard
//             ? this.state.cards.findIndex(card=>card.cardId === updateCard.cardId)
//             : -1;
//         this.selectedCard.selected = false;
//         const cards = !updateCard
//             ? [
//                 ...this.state.cards.slice(0, movingCardIndex),
//                 ...this.state.cards.slice(movingCardIndex + 1, this.state.cards.length),
//                 this.selectedCard
//             ]
//             : movingCardIndex < destinationCardIndex
//                 ? [
//                     ...this.state.cards.slice(0, movingCardIndex),
//                     ...this.state.cards.slice(movingCardIndex + 1, destinationCardIndex),
//                     this.selectedCard,
//                     ...this.state.cards.slice(destinationCardIndex, this.state.cards.length)
//                 ]
//                 : [
//                     ...this.state.cards.slice(0, destinationCardIndex),
//                     this.selectedCard,
//                     ...this.state.cards.slice(destinationCardIndex, movingCardIndex),
//                     ...this.state.cards.slice(movingCardIndex + 1, this.state.cards.length)
//                 ];
//         cards.filter(card=>card.pinValue)
//             .forEach((card, cardIndex)=>card.pinValue = cardIndex + 1);
//         this.setState({
//             cards: this.selectedCard.pinValue ? this.sortHand(cards, this.state.sortState) : cards,
//             moveState: null
//         });
//         this.selectedCard = null;
//     }
// }
