import React, { Component } from 'react';
import Zoom from 'react-reveal/Zoom';
import Jump from 'react-reveal/Jump';

class MainMenu extends Component {
    state = {
        username: ''
    }
    updateUsername = e => {
        this.setState({username: e.target.value});
    }
    search = () => {
        const form = document.querySelector('.form');
        const searching = document.querySelector('.searching');

        if (this.state.username.trim() !== '') {
            form.style.display = 'none';
            searching.style.display = 'block';

            this.props.search(this.state.username);
        }
    }
    cancelSearch = () => {
        const form = document.querySelector('.form');
        const searching = document.querySelector('.searching');

        if (this.state.username.trim() !== '') {
            form.style.display = 'block';
            searching.style.display = 'none';

            this.props.cancelSearch(this.state.username);
        }
    }
    render() {
        return (
            <div className="MainMenu">
                <Zoom bottom>
                    <img src="https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/144/apple/237/victory-hand_270c.png"/>
                </Zoom>
                <Zoom bottom>
                    <img src="https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/144/apple/237/raised-fist_270a.png"/>
                </Zoom>
                <Zoom bottom>
                    <img src="https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/144/apple/237/raised-hand-with-fingers-splayed_1f590.png"/>
                </Zoom>
                <br/>
                <br/>
                <div className="form">
                    <Jump>
                        <input onChange={this.updateUsername} value={this.state.username} type="text" placeholder="Username"/>
                    </Jump>
                    <br/>
                    <Jump>
                        <button onClick={this.search} className="btn">Play</button>
                        <p className="player-count">{`${this.props.playerCount} player(s) online`}</p>
                    </Jump>
                </div>
                <div className="searching">
                    <h2>Searching...</h2>
                    <button onClick={this.cancelSearch} className="btn">Cancel</button>
                </div>
                <br/>
                <div className="rules">
                    <h3>Rules</h3>
                    <p><strong>Rock</strong> beats <strong>scissors</strong>, <strong>scissors</strong> beats <strong>paper</strong>, <strong>paper</strong> beats <strong>rock</strong>.</p>
                    <p>You get a total of 5 quick rounds against another player. Player with the higher score wins!</p>
                </div>
            </div>
        );
    }
}

export default MainMenu;