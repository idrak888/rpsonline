const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const app = express();
const server = http.createServer(app);
const io = socketIo(server);

const port = process.env.PORT || 3100;

var searchingPlayers = [];
var searchingSockets = [];
var clients = [];
var roomName = '';

app.use(express.static(__dirname + '/../../build'));
io.sockets.on('connection', socket => {
    socket.on('newPlayer', data => {
        clients.push(socket);
        io.emit('updatePlayerCount', clients.length);
    });
    socket.on('initSearch', data => {
        searchingPlayers.push(data.username);
        searchingSockets.push(socket);

        if (searchingPlayers.length >= 2) {
            var player1 = {username: searchingPlayers[0], socket: searchingSockets[0]};
            var player2 = {username: searchingPlayers[1], socket: searchingSockets[1]};
            roomName = `${player1.username}vs${player2.username}`;

            player1.socket.join(roomName);
            player2.socket.join(roomName);
            io.to(player1.socket.id).emit('matched', {
                opponent: player2.username
            });
            io.to(player2.socket.id).emit('matched', {
                opponent: player1.username
            });
            setTimeout(() => {
                io.to(roomName).emit('startRound', roomName);
            }, 4000);

            searchingPlayers.splice(0, 2);
            searchingSockets.splice(0, 2);
        }   
    });
    socket.on('handleThrow', data => {
        var roomName = data.roomName;
        var username = data.username;
        var move = data.move;
        var img = data.img;

        socket.to(roomName).emit('opponentMove', {
            move,
            img
        });
    });
    socket.on('cancelSearch', data => {
        var i = searchingPlayers.indexOf(data.username);
        searchingPlayers.splice(i, 1);
        searchingSockets.splice(i, 1);
    });
    socket.on('disconnect', () => {
        var i = clients.indexOf(socket);

        socket.leave(roomName);
        socket.to(roomName).emit('opponentLeft');

        clients.splice(i, 1);
        searchingPlayers.splice(i, 1);
        io.emit('updatePlayerCount', clients.length);
    });
});

server.listen(port, () => {
    console.log('Server started on port ' + port);
});