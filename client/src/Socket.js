import io from 'socket.io-client';
let socket;
let roomName;

export const initiateSocket = (room_name) => {
  socket = io();
  roomName = room_name;
  console.log('Connecting socket...');
}

// export const disconnectSocket = () => {
//   console.log('Disconnecting socket...');
//   if(socket) socket.disconnect();
// }

export const markReady = (playerNumber) => {
  if (socket) socket.emit('ready', { roomName, playerNumber });
}

export const onStartGame = (cb) => {
  if (!socket) return(true);
  socket.on('startGame', info => {
    // console.log('start the game');
    return cb(info);
  });
}

export const fire = (index) => {
  if (socket) socket.emit('fire', { roomName, index });
}

export const onCheckFire = (cb) => {
  if (!socket) return(true);
  socket.on('checkFire', info => {
    console.log('onCheckFire');
    return cb(info);
  });
}

export const fireReply = (index, reply) => {
  if (socket) socket.emit('fireReply', { roomName, index, reply });
}

export const onFireResult = (cb) => {
  if (!socket) return(true);
  socket.on('fireResult', info => {
    console.log('onFireResult');
    return cb(info);
  });
}
