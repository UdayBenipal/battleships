const express = require('express');
const http = require('http');
const socketio = require('socket.io');
const { markPlayerReady, startGame } = require('./model/rooms')

const app = express();
const server = http.createServer(app);
const io = socketio(server);

app.use(express.json( { extended: false }));

app.get('/', (req, res) => res.send('Api all set'));

//Define Route
app.use('/api/room', require('./api/room'));



io.on('connection', socket => {
    console.log("connction established");

    socket.on('ready', ({ roomName, playerNumber }) => {
        const [err, players] = markPlayerReady(roomName, playerNumber);

        if(err) return;

        socket.join(roomName);

        if(startGame(roomName)) io.in(roomName).emit('startGame', { players });
    })

    socket.on('fire', ({ roomName, index }) => {
        // console.log(`attack on ${index}`);
        socket.to(roomName).emit('checkFire', { index });
    });

    socket.on('fireReply', ({ roomName, index, reply }) => {
        // console.log(reply);
        socket.to(roomName).emit('fireResult', { index, result: reply });
    });
});
//     //when player connects
//     socket.on('joinGame', ({playerName, roomName}) => {
//         // console.log(`${playerName} joined the ${roomName}`);
//         const [room, player] = addPlayer(socket.id, playerName, roomName);

//         if(room === null || player===null) return;

//         socket.join(room.name);

//         // console.log(`Joined ${room.name} as player ${player.number}`);

//         io.in(room.name).emit('connected', { playerName: player.name, number: player.number });
//     });

//     socket.on('ready', () => {

//         const [room, player] = markPlayerReady(socket.id);

//         if(room === null || player===null) return;

//         io.in(room.name).emit('markedReady', {number: player.number});

//         if(startGame(room)) io.in(room.name).emit('startGame', {});
//     });

//     socket.on('fire', ({ box }) => {
//         const roomName = findRoomName(socket.id);

//         if(roomName===null) return;

//         socket.to(roomName).emit('checkFire', { box });
//     });

//     socket.on('hitOrMiss', ({ number, shipName, box}) => {
//         const roomName = findRoomName(socket.id);

//         if(roomName===null) return;

//         io.in(roomName).emit('fireReply', { number, shipName, box });
//     });

//     socket.on('disconnect', () => {
         
//         const [roomName, player] = removePlayer(socket.id);

//         if(roomName===null || player===null) return;

//         io.in(roomName).emit('disconnected', { playerName: player.name, number: player.number });
//     });
// })

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
