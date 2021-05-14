const rooms = []
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
        player.number = 1;
        room = { name: roomName, players: [player]};
        rooms.push(room);
    } else {
        if(room.players.length===2) return false;

        player.number = 2;
        room.players.push(player);
    }
    console.log(room);
    return true;
}

function getRoom(roomName) {
    let room = rooms.find(room => room.name === roomName);
    return room;
}

module.exports = {
    roomExists,
    addPlayer,
    getRoom
};
