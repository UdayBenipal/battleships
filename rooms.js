// const rooms = []
// /*
// Structure:
//     rooms --> [{name, players: [player1, player2]}]
//     player --> { id, name, number, ready}
// */
// function addPlayer(id, playerName, roomName) {
//     let room = rooms.find(room => room.name === roomName);
//     let player = {id: id, name: playerName, number: 1, ready: false};

//     if(room===undefined) {
//         player.number = 1;
//         room = { name: roomName, players: [player]};
//         rooms.push(room);
//     } else {
//         if(room.players.length==2) return [null, null];

//         if(room.players[0].number===1) player.number = 2;
//         room.players.push(player);
//     }
//     return [room, player];
// }

// function removePlayer(id) {
//     let playerIndex = 0;
//     let roomIndex = rooms.findIndex(room => {
//         playerIndex = room.players.findIndex(player => player.id===id);
//         return playerIndex!==-1;
//     });

//     if(roomIndex===-1 || playerIndex===-1) return [null, null];

//     let room;
//     if(rooms[roomIndex].players.length===1) {
//         room = rooms.splice(roomIndex, 1)[0];
//     } else {
//         room = rooms[roomIndex];
//     }

//     return [room.name, room.players.splice(playerIndex, 1)[0]];
// }

// function markPlayerReady(id) {
//     let player;
//     let room = rooms.find(r => {
//         player = r.players.find(p => p.id===id);
//         return player!==undefined;
//     });

//     if(room===undefined || player===undefined) return [null, null];

//     player.ready = true;

//     return [room, player];
// }

// function startGame(room) {
//     return room.players.length===2 && room.players[0].ready && room.players[1].ready;
// }

// function findRoomName(id) {
//     let room = rooms.find(r => (r.players.findIndex(p => p.id===id)) !== -1);

//     if(room===undefined) return null;

//     return room.name;
// }

// module.exports = {
//     addPlayer,
//     removePlayer,
//     markPlayerReady,
//     startGame,
//     findRoomName
// };
