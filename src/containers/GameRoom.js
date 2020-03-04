import React, { Component } from 'react';
import Slide from 'react-reveal/Slide';
import Zoom from 'react-reveal/Zoom';

class GameRoom extends Component {
    componentDidMount() {
        const matchDetails = document.querySelector('.matchDetails');
        const gameScreen = document.querySelector('.gameScreen');

        matchDetails.style.display = 'block';
        gameScreen.style.display = 'none';

        setTimeout(() => {
            matchDetails.style.display = 'none';
            gameScreen.style.display = 'block';
        }, 3000);
        this.setState({opponent: ''});
    }
    render() {
        return (
            <div className="GameRoom">
                <div className="matchDetails">
                    <Slide left>
                        <h1>{this.props.username}</h1>
                    </Slide>
                    <h2>VS</h2>
                    <Slide right>
                        <h1>{this.props.opponent}</h1>
                    </Slide>
                </div>
                <div className="gameScreen">
                    <div className="opponent-score">
                        <h3>{this.props.opponent}: {this.props.opponentScore}</h3>
                        <div className="row">
                            <div className="col-xs">
                                <img src="https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/144/apple/237/victory-hand_270c.png"/>
                            </div>
                            <div className="col-xs">
                                <img src="https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/144/apple/237/raised-fist_270a.png"/>
                            </div>
                            <div className="col-xs">
                                <img src="https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/144/apple/237/raised-hand-with-fingers-splayed_1f590.png"/>
                            </div>
                        </div>
                    </div>
                    <br/>
                    <div className="playground">
                        {this.props.myMoveImg !== '' ? 
                            <Zoom down>
                                <img className="opponentMove" src={this.props.opponentMoveImg}/> 
                            </Zoom>
                        :''}
                        <h1>{this.props.countDown}</h1>
                        {this.props.myMoveImg !== '' ? 
                            <Zoom up>
                                <img src={this.props.myMoveImg}/>
                            </Zoom>
                        :''}
                    </div>
                    <br/>
                    <div className="my-score">
                        <div className="row">
                            <div onClick={() => this.props.handleThrow('scissors', 'https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/144/apple/237/victory-hand_270c.png')} className="col-xs">
                                <img src="https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/144/apple/237/victory-hand_270c.png"/>
                            </div>
                            <div onClick={() => this.props.handleThrow('rock', 'https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/144/apple/237/raised-fist_270a.png')} className="col-xs">
                                <img src="https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/144/apple/237/raised-fist_270a.png"/>
                            </div>
                            <div onClick={() => this.props.handleThrow('paper', 'https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/144/apple/237/raised-hand-with-fingers-splayed_1f590.png')} className="col-xs">
                                <img src="https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/144/apple/237/raised-hand-with-fingers-splayed_1f590.png"/>
                            </div>
                        </div>
                        <h2>{this.props.username}: {this.props.myScore}</h2>
                    </div>
                </div>
            </div>
        );
    }
}

export default GameRoom;