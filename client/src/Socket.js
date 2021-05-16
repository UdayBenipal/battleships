import io from 'socket.io-client';
let socket;
let roomName;

export const initiateSocket = (room_name) => {
  socket = io();
  roomName = room_name;
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
    return cb(info);
  });
}

export const fire = (index) => {
  if (socket) socket.emit('fire', { roomName, index });
}

export const onCheckFire = (cb) => {
  if (!socket) return(true);
  socket.on('checkFire', info => {
    return cb(info);
  });
}

export const fireReply = (index, reply) => {
  if (socket) socket.emit('fireReply', { roomName, index, reply });
}

export const onFireResult = (cb) => {
  if (!socket) return(true);
  socket.on('fireResult', info => {
    return cb(info);
  });
}
