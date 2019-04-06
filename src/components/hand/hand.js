import PlayingCard from './playing-card';
import React, { Component } from 'react';
import _ from 'lodash';

class Hand extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cards: this.props.cards.map(card=>(
                {
                    selected: false,
                    pinValue: 0,
                    ...card
                }
            )),
            moveState: null,
            sortState: null,
            pinValue: 0
        };
        this.selectedCard = null;
    }

    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-xs-1">
                        <div className="container">
                            <div className="row">
                                <div className={'btn col '
                                        + (this.state.sortState === 'rank' ? 'btn-info' : 'btn-secondary')}
                                     style={{marginTop: '10px'}}
                                     onClick={()=>this.sortByRank()}>A-4
                                </div>
                            </div>
                        </div>
                        <div className="container">
                            <div className="row">
                                <div className={'btn col '
                                + (this.state.sortState === 'suit' ? 'btn-info' : 'btn-secondary')}
                                     style={{marginTop: '5px'}}
                                     onClick={()=>this.sortBySuit()}>{String.fromCharCode(9824)}-{String.fromCharCode(9827)}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-xs-11" style={{position: 'relative'}}>
                        {this.state.cards.map((card, cardIndex) => (
                            <PlayingCard card={card}
                                         imageLocation={'below'}
                                         size={.2}
                                         left={(cardIndex * 25) + 'px'}
                                         top={card.selected ? '0' : '10px'}
                                         onSelect={this.state.moveState ? () => this.onMoveEnd(card) : () => this.onSelect(card)}
                                         onPinned={this.state.moveState ? null : event => this.onPinned(event, card)}
                                         onMoved={this.state.moveState ? null : event => this.onMoveStart(event, card)}
                                         key={cardIndex}
                            />
                        ))}
                        {this.state.moveState && (
                            <PlayingCard card={{cardText: 'Move to front of hand.'}}
                                         imageLocation={''}
                                         size={.2}
                                         left={(this.state.cards.length * 25) + 'px'}
                                         top={'10px'}
                                         onSelect={() => this.onMoveEnd(null)}
                                         onPinned={null}
                                         onMoved={null}
                                         key={this.state.cards.length}
                            />
                        )}
                    </div>
                </div>
            </div>
        );
    }

    componentWillUpdate(props) {
        const newStateCards = [
            ...this.state.cards
                .filter(stateCard=>props.cards.find(propCard=>propCard.cardId === stateCard.cardId)),
            ...props.cards.filter(propCard=>!this.state.cards.find(stateCard=>stateCard.cardId === propCard.cardId))
                .map(card=>(
                    {
                        selected: false,
                        pinValue: 0,
                        ...card
                    }
                ))
        ];
        if (!_.isEqual(newStateCards, this.state.cards)) {
            this.setState({
                cards: newStateCards
            });
        }
    }

    sortByRank() {
        const cards = this.sortHand(this.state.cards, 'rank');
        this.setState({
            sortState: 'rank',
            cards: cards
        })
    }

    sortBySuit() {
        const cards = this.sortHand(this.state.cards, 'suit');
        this.setState({
            sortState: 'suit',
            cards: cards
        })
    }

    sortHand(cards, type) {
        if (type === 'rank') {
            return [
                ...cards.filter(card=>card.pinValue)
                    .sort((cardA, cardB)=>cardA.pinValue - cardB.pinValue),
                ...cards.filter(card=>!card.pinValue && (card.suit === 'J' || card.value === 1)),
                ...cards.filter(card=>!card.pinValue && card.suit !== 'J' && card.value > 2)
                    .sort((cardA, cardB)=>(cardB.value - cardA.value)),
                ...cards.filter(card=>!card.pinValue && (card.suit === 'D' || card.suit === 'H') && card.value === 2),
                ...cards.filter(card=>!card.pinValue && (card.suit === 'C' || card.suit === 'S') && card.value === 2)
            ];
        }
        if (type === 'suit') {
            return [
                ...cards.filter(card=>card.pinValue)
                    .sort((cardA, cardB)=>cardA.pinValue - cardB.pinValue),
                ...cards.filter(card=>!card.pinValue && (card.suit === 'J' || card.value === 1)),
                ...cards.filter(card=>!card.pinValue && card.suit !== 'J' && card.value > 2)
                    .sort((cardA, cardB)=>(
                        cardA.suit > cardB.suit
                            ? 1
                            : cardA.suit < cardB.suit
                            ? -1
                            : cardB.value - cardA.value
                    )),
                ...cards.filter(card=>!card.pinValue && (card.suit === 'D' || card.suit === 'H') && card.value === 2),
                ...cards.filter(card=>!card.pinValue && (card.suit === 'C' || card.suit === 'S') && card.value === 2)
            ];
        }
        return [
            ...cards.filter(card=>card.pinValue)
                .sort((cardA, cardB)=>cardA.pinValue - cardB.pinValue),
            ...cards.filter(card=>!card.pinValue)
        ]
    }

    onSelect(updateCard) {
        const selectedCard = this.state.cards.find(card=>card.cardId === updateCard.cardId);
        selectedCard.selected = !selectedCard.selected;
        this.setState({
            cards: this.state.cards
        });
    }

    onPinned(event, updateCard) {
        event.stopPropagation();
        const cards = [...this.state.cards];
        const selectedCard = cards.find(card=>card.cardId === updateCard.cardId);
        let pinValue = this.state.pinValue;
        if (selectedCard.pinValue) {
            cards.forEach(card=>card.pinValue = card.pinValue > selectedCard.pinValue ? card.pinValue - 1 : card.pinValue);
            selectedCard.pinValue = 0;
            pinValue -= 1;
        } else {
            selectedCard.pinValue = ++pinValue;
        }
        const sortedCards = this.sortHand(cards, this.state.sortState);
        this.setState({
            cards: sortedCards,
            pinValue
        });
    }

    onMoveStart(event, updateCard) {
        event.stopPropagation();
        const selectedCard = this.state.cards.find(card=>card.cardId === updateCard.cardId);
        this.selectedCard = selectedCard;
        selectedCard.selected = true;
        this.setState({
            cards: this.state.cards,
            moveState: 'move'
        });
    }

    onMoveEnd(updateCard) {
        const movingCardIndex = this.state.cards.findIndex(card=>card.cardId === this.selectedCard.cardId);
        const destinationCardIndex = updateCard
            ? this.state.cards.findIndex(card=>card.cardId === updateCard.cardId)
            : -1;
        this.selectedCard.selected = false;
        const cards = !updateCard
            ? [
                ...this.state.cards.slice(0, movingCardIndex),
                ...this.state.cards.slice(movingCardIndex + 1, this.state.cards.length),
                this.selectedCard
            ]
            : movingCardIndex < destinationCardIndex
                ? [
                    ...this.state.cards.slice(0, movingCardIndex),
                    ...this.state.cards.slice(movingCardIndex + 1, destinationCardIndex),
                    this.selectedCard,
                    ...this.state.cards.slice(destinationCardIndex, this.state.cards.length)
                ]
                : [
                    ...this.state.cards.slice(0, destinationCardIndex),
                    this.selectedCard,
                    ...this.state.cards.slice(destinationCardIndex, movingCardIndex),
                    ...this.state.cards.slice(movingCardIndex + 1, this.state.cards.length)
                ];
        cards.filter(card=>card.pinValue)
            .forEach((card, cardIndex)=>card.pinValue = cardIndex + 1);
        this.setState({
            cards: this.selectedCard.pinValue ? this.sortHand(cards, this.state.sortState) : cards,
            moveState: null
        });
        this.selectedCard = null;
    }
}

export default Hand;
