let rooms = []
/*
Structure:
    rooms --> [{name, players: [player1, player2]}]
    player --> { name, number, ready}
*/

function roomExists(roomName) {
    let roomIndex = rooms.findIndex(room => room.name === roomName);
    return roomIndex!==-1;
}

function addPlayer(playerName, roomName) {
    let room = rooms.find(room => room.name === roomName);
    let player = {name: playerName, ready: false};

    if(room===undefined) {
        if(rooms.length>20) rooms = [];

        player.number = 1;
        room = { name: roomName, players: [player] };
        rooms.push(room);
    } else {
        if(room.players.length===2) return false;

        player.number = 2;
        room.players.push(player);
    }
    return true;
}

function getRoom(roomName) {
    let room = rooms.find(room => room.name === roomName);
    return room;
}

function markPlayerReady(roomName, playerNumber) {
    let room = rooms.find(room => room.name === roomName);

    if(room==null) return [true, null];

    room.players[playerNumber-1].ready = true;

    console.log('ready', room)

    return [false, room.players];
}

function startGame(roomName) {
    let room = rooms.find(room => room.name === roomName);

    if(room.players.length<2) return false;

    return (room.players[0].ready && room.players[1].ready);
}

function removeRoom(roomName) {
    rooms = rooms.filter(room => room.name !== roomName);
}


module.exports = {
    roomExists,
    addPlayer,
    getRoom,
    markPlayerReady,
    startGame,
    removeRoom
};
