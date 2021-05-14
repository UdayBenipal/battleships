import Button from './button.js';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

const PlayerInfo = ({ gameMode, setGameInfo }) => {
    const history = useHistory();

    const [error, setError] = useState('');
    const [data, setData] = useState({
        playerName: '',
        roomName: ''
    });

    const { playerName, roomName } = data
    
    const createGame = async () => {
        if(playerName==='' && roomName==='' && gameMode==='multi') {
            setError('Please enter your and room name');
        } else if(playerName==='') {
            setError('Please enter your name');
        } else if(roomName==='' && gameMode==='multi') {
            setError('Please enter room name');
        } else {
            setError('');

            if(gameMode==='single') {
                setGameInfo({gameMode, playerName, roomName});
                history.push('/room');
                return;
            }

            try {
                const newRoom = { roomName, playerName, isNew: true };
                const res = await axios.post('/api/room', newRoom);

                setGameInfo({gameMode, playerName, roomName});
                history.push('/room');
            } catch(err) {
                if(err.response.data.error!=null) {
                    setError(err.response.data.error);
                }
                console.error(err.response.data);
            }
        }
    };

    const joinGame = async () => {
        if(playerName==='' && roomName==='') {
            setError('Please enter your and room name');
        } else if(playerName==='') {
            setError('Please enter your name');
        } else if(roomName==='') {
            setError('Please enter room name');
        } else {
            setError('');

            try {
                const newRoom = {roomName, playerName,isNew: false};
                const res = await axios.post('/api/room', newRoom);

                setGameInfo({gameMode, playerName, roomName});
                history.push('/room');
            } catch(err) {
                if(err.response.data.error!=null) {
                    setError(err.response.data.error);
                }
                console.error(err.response.data);
            }
        }
    };

    const onChange = (e) => setData({...data, [e.target.name]: e.target.value})

    return (
        <>
            <input 
                className='input'
                type='text'
                name='playerName'
                placeholder='Your Name'
                value={playerName}
                onChange={e => onChange(e)}/>
            {
            gameMode==='multi' &&
            (<input 
                className='input'
                type='text'
                name='roomName'
                placeholder='Room Name'
                value={roomName}
                onChange={e => onChange(e)}/>)
            }
            <div 
                className='error'>
                {error}
            </div>
            <Button
                className={'playerInfoBtn'}
                text={'Create Game'}
                onClick={createGame}/>
            {
            gameMode==='multi' && 
            (<Button
                className={'playerInfoBtn'}
                text={'Join Game'}
                onClick={joinGame}/>)
            }
        </>
    );
};

export default PlayerInfo;
