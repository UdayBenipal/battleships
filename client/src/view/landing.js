import './landing.css';
import { useState } from 'react';
import SelectMode from './components/selectMode.js';
import PlayerInfo from './components/playerInfo.js'

const Landing = ({ setGameInfo} ) => {

    const [gameMode, setGameMode] = useState(null);

    const setMode = gameMode => setGameMode(gameMode);

    return (
        <div className='background'>
            <h1 className="title">BATTLESHIP</h1>
            <div className='container'>
                { 
                gameMode===null ? 
                <SelectMode setGameMode={setMode}/> : 
                <PlayerInfo gameMode={gameMode} setGameInfo={setGameInfo}/>
                }
            </div>
        </div>
    );
}

export default Landing;
