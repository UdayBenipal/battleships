import { useState, useEffect } from 'react';
import { fire } from '../../Socket';

const EnemyGrid = ({ gameMode, player, turn, changeTurn, result, setMessage }) => {
    const [grid, setGrid] = useState([]);
    const [computerGrid, setCompuerGrid] = useState([]);

    useEffect(() => {
        const mresult = {...result};
        const mgrid = [...grid];

        if(mresult.index>=0 && 
           !mgrid[mresult.index]?.includes('hit') && 
           !mgrid[mresult.index]?.includes('miss')) {
            
            if(mresult.result?.includes('taken')) {
                mgrid[mresult.index] += ' hit';

                let hits = 0;
                mgrid.forEach(square => {
                    if(square?.includes('hit')) {
                        hits+=1;
                    }
                });

                if(hits===17) {
                    setMessage("You Won");
                }
            }
            else mgrid[mresult.index] += ' miss';

            setGrid(mgrid);
            changeTurn();
        }
    }, [result, grid, changeTurn, setMessage]);

    const revealSquare = e => {
        const i = parseInt(e.target.dataset.id);
        let mgrid = [...grid];

        if(turn!==player.number ||
           mgrid[i]?.includes('hit') || 
           mgrid[i]?.includes('miss')) {
            return;
        }

        if('single'===gameMode) {
            let hits = 0;
            if(computerGrid[i]?.includes('taken')) {
                mgrid[i] += ' hit';

                mgrid.forEach(square => {
                    if(square?.includes('hit')) {
                        hits+=1;
                    }
                });

                if(hits===17) {
                    setMessage("You Won");
                }

            } else mgrid[i] += ' miss';
            setGrid(mgrid);
            changeTurn();
        } else if('multi'===gameMode){
            fire(i);
        }
    };

    useEffect(() => {
        const generateShip = (name, length, mComputerGrid) => {
            const width = 10;
            let mutiplier = 1;
            let direction = Math.floor(Math.random() * 2);

            let offset = length-1;
            let start = -1;
            if(direction===0) { //vertical
                mutiplier = 10;
                let randomX = Math.floor(Math.random()*(width));
                let randomY = Math.floor(Math.random()*(width-offset));
                start = (width*randomY)+randomX;
            } else if(direction===1) { //horizontal
                let randomX = Math.floor(Math.random()*(width-offset));
                let randomY = Math.floor(Math.random()*(width));
                start = (width*randomY)+randomX;
            }

            let isTaken = false;
            for(let i = 0; i < length; ++i) {
                isTaken = isTaken || (mComputerGrid[start+(i*mutiplier)]?.includes('taken'));
            }

            if(!isTaken) {
                for(let i = 0; i < length; ++i) {
                    mComputerGrid[start+(i*mutiplier)] = `taken ${name}`;
                }
            } else {
                generateShip(name, length, mComputerGrid);
            }
        };

        let squares = [];
        for(let i = 0; i < 100; i++) { squares.push(undefined); }
        setGrid(squares);

        if('single'===gameMode) {
            let mComputerGrid = [];
            for(let i = 0; i < 100; i++) { mComputerGrid.push(undefined); }

            generateShip('destroyer', 2, mComputerGrid);
            generateShip('submarine', 3, mComputerGrid);
            generateShip('cruiser', 3, mComputerGrid);
            generateShip('battleship', 4, mComputerGrid);
            generateShip('carrier', 5, mComputerGrid);

            setCompuerGrid(mComputerGrid);

        }
    }, [gameMode]);

    return (
        <div className='enemyGrid'>
            {grid.map((classNames, i) => {
                return (<div 
                    data-id={i} key={i}
                    className={classNames}
                    onClick={revealSquare}
                    onTouchEnd={revealSquare}
                />)
            })}
        </div>
    )
};

export default EnemyGrid;
