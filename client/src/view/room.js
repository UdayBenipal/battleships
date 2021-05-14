import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import PlayerGrid from './components/playerGrid.js';
import ShipsGrid from './components/shipsGrid.js';
import EnemyGrid from './components/enemyGrid.js';
import Message from './components/message.js'

const Room = ({data}) => {
    const history = useHistory();

    const [roomName, setRoomName] = useState(null);
    const [player, setPlayer] = useState({ ready : false});
    const [enemy, setEnemy] = useState(null);

    useEffect(() => {
        const fetchAndStoreData = async () => {
            try {
                setRoomName(data.roomName);

                const res =  await axios.get(`/api/room?name=${data.roomName}`);
                const players = res.data.players;

                setPlayer(players.find(p => p.name===data.playerName));
                if(players.length===2) setEnemy(players.find(p => p.name!==data.playerName));

            } catch(err) {
                console.error(err.response.data);
            }
        }

        if(data.gameMode==='multi') {
            fetchAndStoreData();
        } else if(data.gameMode==='single') {
            setRoomName('Battleship');
            setPlayer({ name: data.playerName, number: 1, ready: false });
            setEnemy({ name: 'Computer', number: 2, ready: true});
        } else {
            history.push('/');
        }
    }, [data]);

    return (
        <div>
            <PlayerGrid/>
            {
            player.ready ?
            <EnemyGrid/> :
            <ShipsGrid/>
            }
            <Message/>
        </div>
    )
}

export default Room
