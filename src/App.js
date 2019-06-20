import React, { Component } from 'react';
import './App.css';
import SideBar from './Components/SideBar';
import Footer from './Components/Footer';
import Header from './Components/Header';
import Join from './Components/Join';
import Chats from './Components/Chats/Chats';
import io from 'socket.io-client';
import Msg from './Components/Msg';
import axios from 'axios';
import loading from './loading.png';

class App extends Component {
  state = {
    roomName: '',
    name: '',
    users: [],
    msg: 'message here...',
    gifs: [
      'https://media1.giphy.com/media/SiNGhMu9W4180gvZk5/giphy.gif',
      'https://media3.giphy.com/media/kEKcOWl8RMLde/giphy.gif',
      'https://media1.tenor.com/images/3407ac126f4a0dbc6d2c57a261eedf06/tenor.gif?itemid=11869791',
      'https://media.giphy.com/media/9fbYYzdf6BbQA/giphy.gif',
      'https://upload-assets.vice.com/files/2016/04/29/1461944107Header.gif',
      'http://firealpaca.com/images/douga/alpaca_gifanime.gif',
      'https://cdn-images-1.medium.com/max/1600/1*-e5Hl_0novHiOgPNVXzNLw.gif'
    ],
    sentGifs:[
      {sender: 'Idrak', src: 'https://techcrunch.com/wp-content/uploads/2015/08/safe_image.gif?w=730&crop=1'},
      {sender: 'May', src: 'https://compote.slate.com/images/697b023b-64a5-49a0-8059-27b963453fb1.gif'}      
    ]
  }
  componentDidMount() {
    this.socket = io('/');
    this.socket.on('updateList', users => {
      this.setState({users});
    });
    this.socket.on('userJoined', data => {
      if (data.room == this.state.roomName) {
        this.setState({msg: data.name + ' joined the room!'});
        document.querySelector('.msg-box').style.display = 'block';
        setTimeout(() => {
          document.querySelector('.msg-box').style.display = 'none';
        }, 2000);
      }
    });
    this.socket.on('userLeft', data => {
      if (data.room == this.state.roomName) {
        this.setState({msg: data.name + ' left the room.'});
        document.querySelector('.msg-box').style.display = 'block';
        setTimeout(() => {
          document.querySelector('.msg-box').style.display = 'none';
        }, 2000);
      }
    });
    this.socket.on('newSentGifs', data => {
      if (data.roomName == this.state.roomName) {
        this.loadNewGif(data.newGif)
      }
    });
  }

  loadNewGif = newGif => {
    var newMsg = newGif;
    
    if (newMsg.sender == this.state.name) {
      newMsg.sender = 'Me';
    }

    var sentGifs = this.state.sentGifs;
    sentGifs.push(newMsg);

    this.setState({sentGifs});
    setTimeout(this.scrollBottom(), 1000);
  }

  updateRoomInfo = (name, room) => {
    axios.get('https://api.giphy.com/v1/gifs/trending?api_key=HGqbIYKPYqFQ8r4W24R88g7b91nfr8p0&limit=25&rating=G')
    .then(doc => {
        var gifs = [];

        for (let i=0;i<25;i++) {
          gifs.push("https://i.giphy.com/media/"+doc.data.data[i].id+"/giphy.webp");
        }

        this.setState({gifs});
    });
    this.setState({name, roomName: room});
    document.querySelector('.overlay').style.display = 'none';

    this.socket.emit('newUser', {
      name,
      room
    });
  }
  leaveRoom = () => {
    window.location.reload();
  }
  search = e => {
    e.preventDefault();
    this.setState({gifs:['https://www.voya.ie/Interface/Icons/LoadingBasketContents.gif']});
    const searchBox = document.querySelector('#search');
    
    axios.get('https://api.giphy.com/v1/gifs/search?api_key=HGqbIYKPYqFQ8r4W24R88g7b91nfr8p0&q='+searchBox.value+'&limit=15&offset=0&rating=G&lang=en')
    .then(doc => {
        var gifs = [];

        for (let i=0;i<15;i++) {
          gifs.push("https://i.giphy.com/media/"+doc.data.data[i].id+"/giphy.webp");
        }

        this.setState({gifs});
    });

    searchBox.value = '';
  }
  sendGif = src => {
    this.socket.emit('sendNewGif', {
      room: this.state.roomName,
      newGif: {sender: this.state.name, src}
    });
  }
  scrollBottom = () => {
    var element = document.getElementById("chats");
    element.scrollTop = element.scrollHeight;
  }
  render () {
    return (
      <div className="App">
          <Msg msg={this.state.msg} />
          <div className="overlay"></div>
          <Join newUser={this.newUser} updateRoomInfo={this.updateRoomInfo} />
          <Header leaveRoom={this.leaveRoom} roomName={this.state.roomName}/>
          <SideBar users={this.state.users} name={this.state.name} roomName={this.state.roomName}/>
          <Footer sendGif={this.sendGif} search={this.search} gifs={this.state.gifs} name={this.state.name}/>
          <Chats sentGifs={this.state.sentGifs}/>
      </div>
    );
  }
}

export default App;
