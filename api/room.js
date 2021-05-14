const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const { 
    roomExists,
    addPlayer,
    getRoom  } = require('../model/rooms')

// @route   POST api/users
// @desc    Add player
// @access  Public
router.post('/', 
[
    check('roomName', 'Room Name Is Required').not().isEmpty(),
    check('playerName', 'Player Name Is Required').not().isEmpty(),
    check('isNew', 'invalid request').not().isEmpty()
],
(req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        let errorArray = errors.array().map(e => e.msg);
        return res.status(400).json({ error: errorArray[0] });
    }

    const {roomName, playerName, isNew} = req.body;

    let exists = roomExists(roomName);

    if(isNew && exists) {
        return res.status(400).json({ error: "Room already exists" });
    } else if(!isNew && !exists) {
        return res.status(400).json({ error: "Room does not exists" });
    }

    let added = addPlayer(playerName, roomName);

    if(!added) {
        return res.status(400).json({ error: "Room already has 2 players" });
    }

    res.json({ success: "Player Registered" });
});


// @route   GET api/room
// @desc    get the room info of the player
// @access  Public
router.get('/', (req, res) => {
    let roomName = req.query.name;

    if(roomName==null || roomName==='') 
    return res.status(400).json({ error: 'Bad Request 0' });

    let room = getRoom(roomName);

    if(room===undefined) 
    return res.status(400).json({ error: 'Bad Request 1' });

    res.json(room);
});

module.exports = router;
