class Config {
    constructor() {
        this.buttonHighlight = '#f00';
        this.cardBackground = '#CCC5B3';
        this.cardMarkFontSize = '20px';
        this.baseTopMark = '3%';
        this.baseTopSuit = '1%';
        this.baseLeftMark = '9%';
        this.baseLeftSuit = '5%';
        this.belowOffsetTop = '30%';
        this.pinOffsetTop = '60%';
        this.moveOffsetTop = '80%';
        this.besideOffsetLeft = '30%';
        this.suitConstants = {
            C: {
                image: String.fromCharCode(9827),
                color: '#000'
            },
            D: {
                image: String.fromCharCode(9830),
                color: '#F00'
            },
            H: {
                image: String.fromCharCode(9829),
                color: '#F00'
            },
            S: {
                image: String.fromCharCode(9824),
                color: '#000'
            },
            J: {
                image: String.fromCharCode(9733),
                color: '#00F'
            }
        };
    }
}

export default new Config();
