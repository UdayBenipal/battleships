import { useState, useEffect } from 'react';
import { onCheckFire, fireReply } from '../../Socket';

const PlayerGrid = ({ gameMode, draggedShip, setShipPlaced, compTurn, setCompTurn, changeTurn, setMessage }) => {
    const [grid, setGrid] = useState([]);

    const [update, setUpdate] = useState({ index:-2 });

    useEffect(() => {
        const index = update.index;
        const mgrid = [...grid]; 

        if(index>=0 && 
           !mgrid[index]?.includes('hit') && 
           !mgrid[index]?.includes('miss')) {
            
            if(mgrid[index]?.includes('taken')) {
                mgrid[index] += ' hit';

                let hits = 0;
                mgrid.forEach(square => {
                    if(square?.includes('hit')) {
                        hits+=1;
                    }
                });

                if(hits===17) {
                    setMessage("Opponent Won");
                }
            }
            else mgrid[index] += ' miss';

            setGrid(mgrid);
            changeTurn();
        }
    }, [update, grid, changeTurn, setMessage]);

    useEffect(() => {
        let squares = [];
        for(let i = 0; i < 100; i++) {squares.push(undefined);}
        setGrid(squares);
    }, [gameMode]);

    useEffect(() => {
        if('multi'===gameMode) {
            onCheckFire(({ index }) => { 
                fireReply(index, grid[index]);
                setUpdate({ index });
            });
        }
    }, [gameMode, grid]);

    useEffect(() => {
        let mgrid = [...grid];

        const computerTurn = () => {
            let i = Math.floor(Math.random()*100);
            let square = mgrid[i];

            if(square?.includes('hit') || square?.includes('miss')) computerTurn();

            // if(square.classList.contains('destroyer')) destroyerCountCPU+=1;
            // else if(square.classList.contains('submarine')) submarineCountCPU+=1;
            // else if(square.classList.contains('cruiser')) cruiserCountCPU+=1;
            // else if(square.classList.contains('battleship')) battleshipCountCPU+=1;
            // else if(square.classList.contains('carrier')) carrierCountCPU+=1;

            if(mgrid[i]?.includes('taken')) {
                mgrid[i] += ' hit';

                let hits = 0;
                mgrid.forEach(square => {
                    if(square?.includes('hit')) {
                        hits+=1;
                    }
                });

                if(hits===17) {
                    setMessage("Opponent Won");
                }

            }
            else mgrid[i] += ' miss';
        }

        if(compTurn) {
            setCompTurn(false);
            computerTurn();
            setGrid(mgrid);
        }

    }, [grid, compTurn, setCompTurn, setMessage]);

    const placeShip = (e) => {
        let mgrid = [...grid];

        const width = 10;
        const { index, name, length, isVertical } = draggedShip;

        let dropLocation = parseInt(e.target.dataset.id);
        let x = dropLocation%width;
        let y = Math.floor(dropLocation/width);
        let start = 0;
        let multilpier = 1;

        if(isVertical) {
            let top = index;
            let bottom = (length-1)-top;
            if((y-top)<0 || width<=(y+bottom)) {
                return;
            }
            start = dropLocation-(top*width);
            multilpier = 10;
        } else {
            let left = index;
            let right = (length-1)-left;
            if((x-left)<0 || width<=(x+right)) {
                return;
            }
            start = dropLocation-left;
        }

        for(let i=0; i<length; ++i) {
            if(mgrid[start+(i*multilpier)]?.includes('taken')) {
                return;
            }
        }

        for(let i=0; i<length; ++i) {
            let classes = 'taken';
            if(i===0 && isVertical) classes += ' top';
            else if(i===0 && !isVertical) classes += ' left';
            else if(i===(length-1) && isVertical) classes += ' bottom';
            else if(i===(length-1) && !isVertical) classes += ' right';
            
            mgrid[start+(i*multilpier)] = `${classes} ${name}`;
        }

        setShipPlaced(name);
        setGrid(mgrid);
    }

    return (
        <div className="playerGrid"> 
            {grid.map((classNames, i) => {
                return (<div 
                    data-id={i} key={i}
                    className={classNames}
                    onDragEnter={e => e.preventDefault()}
                    onDragOver={e => e.preventDefault()}
                    onDrop={placeShip}
                />)
            })}
        </div>
        )
};

export default PlayerGrid;
