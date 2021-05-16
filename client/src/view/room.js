import './room.css';
import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import PlayerGrid from './roomComponents/playerGrid.js';
import ShipsGrid from './roomComponents/shipsGrid.js';
import EnemyGrid from './roomComponents/enemyGrid.js';
import Info from './roomComponents/info.js'

import { initiateSocket, markReady, onStartGame, onFireResult } from '../Socket';

const Room = ({data}) => {
    const history = useHistory();

    const [startGame, setStartGame] = useState(false);

    const [roomName, setRoomName] = useState(null);

    const [turn, setTurn] = useState(-2);

    const [player, setPlayer] = useState({ ready : false, number: -1});
    const [shipsPlaced, setShipsPlaced] = useState([false, false, false, false, false]);
    const [draggedShip, setDraggedShip] = useState({ 
        index: -1, name: '', length: -1 , isVertical: true
    });
    
    const [enemy, setEnemy] = useState({ ready : false, number: -1});
    const [compTurn, setCompTurn] = useState(false);

    const [result, setResult] = useState({
        index: -1, result: undefined
    });  

    useEffect(() => {
        const fetchAndStoreData = async () => {
            try {
                setRoomName(data.roomName);

                const res =  await axios.get(`/api/room?name=${data.roomName}`);
                const players = res.data.players;

                setPlayer(players.find(p => p.name===data.playerName));
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
    }, [data, history]);

    const setShipPlaced = name => {
        let mshipsPlaced = [...shipsPlaced];

        if('destroyer'===name) mshipsPlaced[0]=true;
        else if('submarine'===name) mshipsPlaced[1]=true;
        else if('cruiser'===name) mshipsPlaced[2]=true;
        else if('battleship'===name) mshipsPlaced[3]=true;
        else if('carrier'===name) mshipsPlaced[4]=true;

        setShipsPlaced(mshipsPlaced);

        let allShipsPlaced = true;
        mshipsPlaced.forEach(ship => { allShipsPlaced = allShipsPlaced && ship });

        if(allShipsPlaced) {
            setPlayer({...player, ready: true});
            if('single'===data.gameMode) {
                setStartGame(true);
                changeTurn();
            } else if('multi'===data.gameMode) {
                initiateSocket(roomName);

                onStartGame(({ players }) => {
                    setEnemy(players.find(p => p.name!==player.name));
                    changeTurn();
                    setStartGame(true);
                });

                onFireResult(({ index, result }) => {
                    setResult({ index, result });
                });

                markReady(player.number);
            }
        }
    }

    const changeTurn = () => {
        if(1===turn) setTurn(2);
        else if(2===turn || -2===turn) setTurn(1);
    }

    useEffect(() => {
        if(turn===player.number) {
            console.log('your turn');
        } else if(turn===enemy.number) {
            console.log('oponents turn');
            if(data.gameMode==='single') {
                setCompTurn(true);
                if(1===turn) setTurn(2);
                else if(2===turn || -2===turn) setTurn(1);
            }
        }
    }, [turn, player.number, enemy.number, data]);

    return (
        <div className='backGround'>
            <Info roomName={roomName}/>
            <div className='gridContainer'>
                <PlayerGrid gameMode={data.gameMode} draggedShip={draggedShip} setShipPlaced={setShipPlaced} compTurn={compTurn} setCompTurn={setCompTurn} changeTurn={changeTurn}/>
                {
                !player.ready ?
                <ShipsGrid setDraggedShip={setDraggedShip} shipsPlaced={shipsPlaced}/> :
                startGame ?
                <EnemyGrid gameMode={data.gameMode} player={player} turn={turn} changeTurn={changeTurn} result={result}/> :
                <h1>waiting for the opponent to place all their ships after connecting</h1>
                }
            </div>
        </div>
    )
}

export default Room
