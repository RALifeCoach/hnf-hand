export function sortHand(cards, type) {
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
