import { useState, useEffect } from 'react';

const EnemyGrid = () => {
    const [grid, setGrid] = useState([]);

    const computerGrid = [];
    const generateShip = (name, length) => {
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
            isTaken = isTaken || (computerGrid[start+(i*mutiplier)] !== undefined);
        }

        if(!isTaken) {
            for(let i = 0; i < length; ++i) {
                computerGrid[start+(i*mutiplier)] = `taken ${name}`;
            }
        } else {
            generateShip(name, length);
        }
    }

    useEffect(() => {
        let squares = [];
        for(let i = 0; i < 100; i++) {
            squares.push(undefined);
            computerGrid.push(undefined);
        }
        setGrid(squares);

        generateShip('destroyer', 2);
        generateShip('submarine', 3);
        generateShip('cruiser', 3);
        generateShip('battleship', 4);
        generateShip('carrier', 5);
        console.log(computerGrid);
    }, []);

    return (
        <div className='enemyGrid'>
            {grid.map((classNames, i) => {
                return (<div 
                    data-id={i} key={i}
                    className={classNames}
                />)
            })}
        </div>
    )
};

export default EnemyGrid;
