export default class CardManagement {
    constructor(setState) {
        this.cards = [];
        this.counter = 0;
        this.setState = setState;
    }

    arrangeCards(cards) {
        this.counter += 1;
        cards.map(card => {
            const currentCard = this.cards.find(findCard => findCard.cardId === card.cardId);
            if (currentCard) {
                Object.assign(currentCard, {
                    ...card,
                    counter: this.counter
                });
            } else {
                this.cards.push({
                    ...card,
                    selected: false,
                    counter: this.counter
                });
            }
        });
        let deleteIndex = -1;
        while ((deleteIndex = this.cards.find(card => card.counter !== this.counter)) > -1) {
            this.cards.splice(deleteIndex, 1);
        };
        return this.cards;
    }

    isSelected(card) {
        return this.cards.find(findCard => findCard.cardId === card.cardId).selected;
    }

    toggleSelect(card) {
        const updateCard = this.cards.find(findCard => findCard.cardId === card.cardId);
        updateCard.selected = !updateCard.selected;
        return this.cards;
    }

    resetCards() {
        this.cards.forEach(card => card.selected = false);
        return this.cards;
    }

    countSelectedCards() {
        return Object.keys(this.cards).reduce((counter, cardId) => counter += this.cards[cardId].selected ? 1 : 0, 0);
    }

    moveCard(selectedCard, moveTo) {
        const movingCardIndex = this.cards.findIndex(card => card.cardId === selectedCard.cardId);
        const destinationCardIndex = moveTo
            ? this.cards.findIndex(card=>card.cardId === moveTo.cardId)
            : -1;
        selectedCard.selected = false;
        if (!moveTo) {
            this.cards.push(selectedCard);
            this.cards.splice(movingCardIndex, 1);
        } else {
            this.cards.splice(destinationCardIndex, 0, selectedCard);
            this.cards.splice(movingCardIndex < destinationCardIndex ? movingCardIndex : movingCardIndex + 1, 1);
        }
        let pinValue = 0;
        this.cards.forEach(card => {
            if (card.pinValue) {
                pinValue+= 1;
                card.pinValue = pinValue;
            }
        })
        return this.cards;
    }

    sortCards(type) {
        let cards;
        if (type === 'rank') {
            cards = [
                ...this.cards.filter(card=>card.pinValue)
                    .sort((cardA, cardB)=>cardA.pinValue - cardB.pinValue),
                ...this.cards.filter(card=>!card.pinValue && (card.suit === 'J' || card.value === 1)),
                ...this.cards.filter(card=>!card.pinValue && card.suit !== 'J' && card.value > 2)
                    .sort((cardA, cardB)=>(cardB.value - cardA.value)),
                ...this.cards.filter(card=>!card.pinValue && (card.suit === 'D' || card.suit === 'H') && card.value === 2),
                ...this.cards.filter(card=>!card.pinValue && (card.suit === 'C' || card.suit === 'S') && card.value === 2)
            ];
        } else if (type === 'suit') {
            cards = [
                ...this.cards.filter(card=>card.pinValue)
                    .sort((cardA, cardB)=>cardA.pinValue - cardB.pinValue),
                ...this.cards.filter(card=>!card.pinValue && (card.suit === 'J' || card.value === 1)),
                ...this.cards.filter(card=>!card.pinValue && card.suit !== 'J' && card.value > 2)
                    .sort((cardA, cardB)=>(
                        cardA.suit > cardB.suit
                            ? 1
                            : cardA.suit < cardB.suit
                            ? -1
                            : cardB.value - cardA.value
                    )),
                ...this.cards.filter(card=>!card.pinValue && (card.suit === 'D' || card.suit === 'H') && card.value === 2),
                ...this.cards.filter(card=>!card.pinValue && (card.suit === 'C' || card.suit === 'S') && card.value === 2)
            ];
        } else {
            cards = [
                ...this.cards.filter(card=>card.pinValue)
                    .sort((cardA, cardB)=>cardA.pinValue - cardB.pinValue),
                ...this.cards.filter(card=>!card.pinValue)
            ];
        }
        this.cards.splice(0, this.cards.length, ...cards);
        return this.cards;
    }

    pinCard(updateCard, sortBy) {
        const selectedCard = this.cards.find(card=>card.cardId === updateCard.cardId);
        const pinValue = this.cards.filter(card => card.pinValue).length + 1;
        if (selectedCard.pinValue) {
            this.cards.forEach(card=>card.pinValue = card.pinValue > selectedCard.pinValue ? card.pinValue - 1 : card.pinValue);
            selectedCard.pinValue = 0;
        } else {
            selectedCard.pinValue = pinValue;
        }
        selectedCard.selected = false;
        this.sortCards(sortBy);
        return this.cards;
    }
}
