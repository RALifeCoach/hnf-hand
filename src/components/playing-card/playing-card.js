import React, {Component} from 'react';
import _ from 'lodash';

export default class PlayingCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            show: false
        };
        this.selectTimer = null;
        this.pinTimer = null;
        this.moveTimer = null;
    }

    render() {
        this.buildValues();
        return (
            <div style={this.cardStyle}
                 onClick={this.props.onSelect ? ()=>this.onSelect() : null}
            >
                {this.props.card.cardText &&
                    <div style={this.textStyle}>
                        {this.props.card.cardText}
                    </div>
                }
                {!this.props.card.cardText &&
                    <div>
                        {this.props.card.suit === 'J' &&
                            <div style={this.markStyle}>
                                {this.suits[this.props.card.suit].image}
                            </div>
                        }
                        {this.props.card.suit !== 'J' &&
                            <div>
                                <div style={this.markStyle}>
                                    {this.props.card.rank}
                                </div>
                                <div style={this.props.imageLocation === 'below' ? this.belowSuitStyle : this.besideSuitStyle}>
                                    {this.suits[this.props.card.suit].image}
                                </div>
                            </div>
                        }
                        {this.props.card.suit !== 'J' &&
                            <div>
                                <div style={this.props.imageLocation === 'below' ? this.belowReverseStyle : this.besideReverseStyle}>
                                    {this.suits[this.props.card.suit].image}
                                </div>
                                <div style={this.reverseMarkStyle}>
                                    {this.props.card.rank}
                                </div>
                            </div>
                        }
                        {this.props.card.suit === 'J' &&
                            <div style={this.reverseMarkStyle}>
                                {this.suits[this.props.card.suit].image}
                            </div>
                        }
                        {this.props.selected && this.props.onPinned &&
                            <i className="glyphicon glyphicon-pushpin"
                               style={this.pinStyle}
                               onClick={this.props.onPinned ? event=>this.onPinned(event) : null}
                            />
                        }
                        {this.props.selected && this.props.onMoved &&
                            <i className="glyphicon glyphicon-move"
                               style={this.moveStyle}
                               onClick={this.props.onMoved ? event=>this.onMoved(event) : null}
                            />
                        }
                    </div>
                }
            </div>
        );
    }

    buildValues() {
        this.suits = {
            C: {
                image: String.fromCharCode(9827),
                colour: '#000000'
            },
            D: {
                image: String.fromCharCode(9830),
                colour: '#FF0000'
            },
            H: {
                image: String.fromCharCode(9829),
                colour: '#FF0000'
            },
            S: {
                image: String.fromCharCode(9824),
                colour: '#000000'
            },
            J: {
                image: String.fromCharCode(9733),
                colour: '#0000FF'
            }
        };
        const fontSize = (100 * this.props.size) + 'px';
        const belowOffsetTop = '30%';
        const pinOffsetTop = '60%';
        const moveOffsetTop = '80%';
        const besideOffsetLeft = '30%';
        const baseTopMark = '3%';
        const baseTopSuit = '1%';
        const baseLeftMark = '9%';
        const baseLeftSuit = '5%';
        this.cardStyle = {
            width: (350 * this.props.size) + 'px',
            height: (490 * this.props.size) + 'px',
            background: '#CCC5B3',
            MozBorderRadius: '12px',
            WebkitBorderRadius: '12px',
            borderRadius: '12px',
            MozBoxShadow: '1px 1px 6px rgba(0, 0, 0, 0.25)',
            WebkitBoxShadow: '1px 1px 6px rgba(0, 0, 0, 0.25)',
            boxShadow: '1px 1px 6px rgba(0, 0, 0, 0.25)',
            position: 'absolute',
            overflow: 'hidden',
            top: this.props.selected ? '0' : '10px',
            left: this.props.left
        };
        this.markStyle = {
            fontSize,
            position: 'absolute',
            fontWeight: 'bold',
            top: baseTopMark,
            left: baseLeftMark,
            color: this.props.card.suit && this.suits[this.props.card.suit].colour
        };
        this.reverseMarkStyle = {
            fontSize,
            position: 'absolute',
            fontWeight: 'bold',
            MozTransform: 'rotate(180deg)',
            MsTransform: 'rotate(180deg)',
            WebkitTransform: 'rotate(180deg)',
            transform: 'rotate(180deg)',
            top: 'auto',
            left: 'auto',
            bottom: baseTopMark,
            right: baseLeftMark,
            color: this.props.card.suit && this.suits[this.props.card.suit].colour
        };
        const baseSuitStyle = {
            fontSize,
            position: 'absolute',
            fontFamily: '"Lucida Sans Unicode", "Lucida Grande", sans-serif',
            display: 'block',
            fontStyle: 'normal',
            fontWeight: 'normal',
            fontVariant: 'normal',
            textTransform: 'none',
            textRendering: 'auto',
            color: this.props.card.suit && this.suits[this.props.card.suit].colour
        };
        this.belowSuitStyle = Object.assign({}, baseSuitStyle, {
            top: belowOffsetTop,
            left: baseLeftMark
        });
        this.besideSuitStyle = Object.assign({}, baseSuitStyle, {
            top: baseTopSuit,
            left: besideOffsetLeft
        });
        this.pinStyle = {
            position: 'absolute',
            top: pinOffsetTop,
            left: baseLeftMark,
            opacity: this.props.card.pinValue ? 1 : .2
        };
        this.textStyle = {
            position: 'absolute',
            top: '10%',
            left: '10%',
            width: '80%'
        };
        this.moveStyle = {
            position: 'absolute',
            top: moveOffsetTop,
            left: baseLeftMark
        };
        const baseReverseSuitStyle = Object.assign({}, baseSuitStyle, {
            MozTransform: 'rotate(180deg)',
            MsTransform: 'rotate(180deg)',
            WebkitTransform: 'rotate(180deg)',
            transform: 'rotate(180deg)',
            top: 'auto',
            left: 'auto'
        });
        this.belowReverseStyle = Object.assign({}, baseSuitStyle, baseReverseSuitStyle, {
            top: 'auto',
            left: 'auto',
            bottom: belowOffsetTop,
            right: baseLeftSuit
        });
        this.besideReverseStyle = Object.assign({}, baseSuitStyle, baseReverseSuitStyle, {
            top: 'auto',
            left: 'auto',
            bottom: baseTopSuit,
            right: besideOffsetLeft
        });
    }

    onSelect() {
        if (this.selectTimer) {
            clearTimeout(this.selectTimer);
        }
        this.selectTimer = setTimeout(()=>this.props.onSelect(), 300);
    }

    onPinned(event) {
        event.stopPropagation();
        if (this.moveTimer) {
            clearTimeout(this.moveTimer);
        }
        this.moveTimer = setTimeout(()=>this.props.onPinned(), 300);
    }

    onMoved(event) {
        event.stopPropagation();
        if (this.moveTimer) {
            clearTimeout(this.moveTimer);
        }
        this.moveTimer = setTimeout(()=>this.props.onMoved(), 300);
    }
}

PlayingCard.defaultProps = {
    size: 1,
    imageLocation: 'below',
    left: '0',
    top: '0',
    pinValue: 0,
    onSelect: null,
    onPinned: null
};
