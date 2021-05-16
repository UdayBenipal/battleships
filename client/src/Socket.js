import io from 'socket.io-client';
let socket;

export const initiateSocket = (room) => {
  socket = io();
  console.log('Connecting socket...');
}

// export const disconnectSocket = () => {
//   console.log('Disconnecting socket...');
//   if(socket) socket.disconnect();
// }

export const markReady = (roomName, playerNumber) => {
  if (socket) socket.emit('ready', { roomName, playerNumber });
}

export const onStartGame = (cb) => {
  if (!socket) return(true);
  socket.on('startGame', info => {
    console.log('start the game');
    return cb(info);
  });
}
