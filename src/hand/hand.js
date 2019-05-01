import PlayingCard from 'hnf-playing-card';
import React from 'react';
import styled from 'styled-components';
import CardManagement from '../utils/card-management';

const DEFAULTS = {
    offset: 20,
    sortColor: 'grey'
};

export default class HandComponent extends React.Component {
    constructor(props, options) {
        super(props);
        this.config = Object.assign({}, DEFAULTS, options);
        this.DivHand = styled.div`
            height: auto;
            width: auto;
            display: block;
        `;
        this.Sorts = styled.div`
            width: 64px;
            padding: 10px;
            float: left;
        `;
        const SortButton = styled.div`
            display: block;
            padding: 10px;
            border: 1px solid ${this.config.sortColor};
        `;
        this.Cards = styled.div`
            position: relative;
            float: left;
        `;
        this.SortSuit = styled(SortButton)`
            margin-top: 10px;
        `;
        this.SortRank = styled(SortButton)`
        `;
        this.cardManagement = new CardManagement(props.cards);
        this.state = {
            sortOrder: '',
            cards: this.cardManagement.arrangeCards(this.props.cards),
            sortState: '',
            cardMoving: null
        }
    }

    render() {
        const showIcons = this.cardManagement.countSelectedCards() === 1;
        const moveable = showIcons && !this.state.cardMoving;
        return (
            <this.DivHand>
                <this.Sorts>
                    <this.SortRank
                        onClick={() => this.onSort('rank')}
                    >
                        A-4
                    </this.SortRank>
                    <this.SortSuit
                        onClick={() => this.onSort('suit')}
                    >
                        {String.fromCharCode(9824)}-{String.fromCharCode(9827)}
                    </this.SortSuit>
                </this.Sorts>
                <this.Cards>
                    {this.state.cards.map((card, cardIndex) => {
                        return (
                            <PlayingCard
                                card={card}
                                imageLocation={'below'}
                                left={(cardIndex * this.config.offset) + 'px'}
                                showIcons={showIcons}
                                selected={this.cardManagement.isSelected(card)}
                                onSelect={() => this.onSelect(card)}
                                onPinned={moveable ? () => this.onPinned(card) : null}
                                onMoved={moveable ? () => this.onStartMove(card) : null}
                                key={cardIndex}
                            />
                        );
                    })}
                    {this.state.cardMoving && (
                        <PlayingCard
                            card={{cardText: 'Move to front of hand.'}}
                            imageLocation={''}
                            left={(this.state.cards.length * this.config.offset) + 'px'}
                            onSelect={() => this.onSelect(null)}
                            onPinned={null}
                            onMoved={null}
                            key={this.state.cards.length}
                        />
                    )}
                </this.Cards>
            </this.DivHand>
        );
    }

    componentWillUpdate(newProps, newState) {
        newState.cards = this.cardManagement.arrangeCards(newProps.cards);
    }

    onSelect(card) {
        if (this.state.cardMoving) {
            this.cardManagement.moveCard(this.state.cardMoving, card);
            this.setState({ cardMoving: null });
            return;
        }
        this.setState({ cards: this.cardManagement.toggleSelect(card) });
    }

    onSort(sortBy) {
        this.setState({
            sortOrder: sortBy,
            cards: this.cardManagement.sortCards(sortBy)
        });
    }

    onStartMove(card) {
        this.setState({ cardMoving: card });
    }

    onEndMove() {
        this.setState({ cardMoving: null });
    }

    onPinned(updateCard) {
        this.setState({ cards: this.cardManagement.pinCard(updateCard, this.state.sortBy) });
    }
}
