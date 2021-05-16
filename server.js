const express = require('express');
const http = require('http');
const socketio = require('socket.io');
const { markPlayerReady, startGame, removeRoom } = require('./model/rooms')

const app = express();
const server = http.createServer(app);
const io = socketio(server);

app.use(express.json( { extended: false }));

app.get('/', (req, res) => res.send('Api all set'));

//Define Route
app.use('/api/room', require('./api/room'));



io.on('connection', socket => {

    socket.on('ready', ({ roomName, playerNumber }) => {
        const [err, players] = markPlayerReady(roomName, playerNumber);

        if(err) return;

        socket.join(roomName);

        if(startGame(roomName)) {
            io.in(roomName).emit('startGame', { players });
            removeRoom(roomName);
        }
    })

    socket.on('fire', ({ roomName, index }) => {
        socket.to(roomName).emit('checkFire', { index });
    });

    socket.on('fireReply', ({ roomName, index, reply }) => {
        socket.to(roomName).emit('fireResult', { index, result: reply });
    });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
