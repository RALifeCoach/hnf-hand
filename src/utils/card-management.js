class CardManagement {
    constructor() {
        this.cards = {};
        this.counter = 0;
    }

    arrangeCards(cards) {
        this.counter += 1;
        cards.forEach(card => {
            const currentCard = this.cards[card.cardId];
            if (currentCard) {
                currentCard.counter = this.counter;
            } else {
                this.cards[card.cardId] = {
                    ...card,
                    selected: false,
                    counter: this.counter
                }
            }
        });
        Object.keys(this.cards).forEach(cardId => {
            if (this.cards[cardId].counter !== this.counter) {
                delete this.cards[cardId];
            }
        });
    }

    isSelected(card) {
        return this.cards[card.cardId].selected;
    }

    toggleSelect(card) {
        this.cards[card.cardId].selected = !this.cards[card.cardId].selected;
    }

    resetCards() {
        Object.keys(this.cards).forEach(cardId => {
            this.cards[cardId].selected = false;
        });
    }

    countSelectedCards() {
        return Object.keys(this.cards).reduce((counter, cardId) => counter += this.cards[cardId].selected ? 1 : 0, 0);
    }
}

export default new CardManagement();