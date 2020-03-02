import React, { Component } from 'react';
import './App.css';
import io from 'socket.io-client';

import Header from './components/Header';
import Main from './containers/Main';
import GameRoom from './containers/GameRoom';

class App extends Component {
  state = {
    playerCount: 0,
    round: 0,
    username: '',
    opponent: '',
    roomName: '',
    countDown: '',
    throwReady: false,
    myMove: '',
    opponentMove: '',
    myMoveImg: '',
    opponentMoveImg: '',
    myScore: 0,
    opponentScore: 0
  }
  componentDidMount() {
    this.setState({opponent: ''});
    
    this.socket = io('localhost:3100');
    this.socket.emit('newPlayer');
    this.socket.on('updatePlayerCount', playerCount => {
      this.setState({playerCount});
    });
    this.socket.on('matched', data => {
      this.setState({opponent: data.opponent});
    });
    this.socket.on('startRound', roomName => {
      this.setState({roomName});
      this.startRound();
    });
    this.socket.on('opponentMove', data => {
      this.setState({opponentMove: data.move, opponentMoveImg: data.img});

      if (this.state.myMove !== '') {
        this.evaluateScore(this.state.myMove);
      } 
    });
  }
  search = username => {
    this.setState({username});
    this.socket.emit('initSearch', {
      username
    });
  }
  cancelSearch = username => {
    this.setState({username: ''});
    this.socket.emit('cancelSearch', {
      username
    });
  }
  startRound = () => {
    if (this.state.round < 10) {
      this.setState({round: this.state.round+1, countDown: 3});
      setTimeout(() => {
        this.countDown();
      }, 600);
    } else {
      if (this.state.myScore > this.state.opponentScore) {
        alert('You win!');
      } else if (this.state.myScore < this.state.opponentScore) {
        alert('You lose!');
      } else {
        alert('draw');
      }
      window.location = '/';
    }
  }
  countDown = () => {
    var currentCount = this.state.countDown;
    if (currentCount > 1) {
      this.setState({countDown: currentCount - 1});
      setTimeout(() => {
        this.countDown();
      }, 600);

    } else {
      this.setState({countDown: 'Throw!'});
      setTimeout(() => {
        this.setState({countDown: '', throwReady: true});
      }, 500);
    }
  }
  handleThrow = (move, img) => {
    if (this.state.throwReady) {
      this.socket.emit('handleThrow', {
        roomName: this.state.roomName,
        username: this.state.username,
        move,
        img
      });

      this.setState({myMove: move, myMoveImg: img, throwReady: false});

      if (this.state.opponentMove !== '') {
        this.evaluateScore(move);
      } 
    }
  }
  evaluateScore = myMove => {
    var opponentMove = this.state.opponentMove;   
    var winner = '';
    var myScore = this.state.myScore;
    var opponentScore = this.state.opponentScore;

    switch(myMove) {
      case 'rock':
        if (opponentMove == 'rock') {
          winner = 'draw';
        } else if (opponentMove == 'paper') {
          winner = this.state.opponent;
        } else if (opponentMove == 'scissors') {
          winner = this.state.username;
        }
        break;
      case 'paper':
        if (opponentMove == 'paper') {
          winner = 'draw';
        } else if (opponentMove == 'rock') {
          winner = this.state.username;
        } else if (opponentMove == 'scissors') {
          winner = this.state.opponent;
        }
        break;
      case 'scissors':
        if (opponentMove == 'scissors') {
          winner = 'draw';
        } else if (opponentMove == 'paper') {
          winner = this.state.username;
        } else if (opponentMove == 'rock') {
          winner = this.state.opponent;
        }
        break;
      default: console.log('Invalid move');
    }

    if (winner == this.state.username) {
      this.setState({myScore: myScore+1});
    } else if (winner == this.state.opponent) {
      this.setState({opponentScore: opponentScore+1});
    } else {
      this.setState({opponentScore: opponentScore+1, myScore: myScore+1});
    }
    setTimeout(() => {
      this.setState({
        myMove: '', 
        opponentMove: '',
        myMoveImg: '',
        opponentMoveImg: ''
      });
      this.startRound();
    }, 2000);
  }
  render () {
    return (
      <div className="App">
          <Header/>
          {
            this.state.opponent === '' ?
              <Main 
                cancelSearch={this.cancelSearch} 
                search={this.search} 
                playerCount={this.state.playerCount}
              />
              :
              <GameRoom
                handleThrow={this.handleThrow} 
                countDown={this.state.countDown} 
                username={this.state.username} 
                opponent={this.state.opponent}
                myMoveImg={this.state.myMoveImg}
                opponentMoveImg={this.state.opponentMoveImg}
                myScore={this.state.myScore}
                opponentScore={this.state.opponentScore}
              />
          }
      </div>
    );
  }
}

export default App;
