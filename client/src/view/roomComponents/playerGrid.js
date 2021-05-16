import { useState, useEffect } from 'react';

const PlayerGrid = ({ draggedShip, setShipPlaced}) => {
    const [grid, setGrid] = useState([]);

    useEffect(() => {
        let squares = [];
        for(let i = 0; i < 100; i++) {squares.push(undefined);}
        setGrid(squares);
    }, []);

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
                console.log('oob v', top, bottom);
                return;
            }
            start = dropLocation-(top*width);
            multilpier = 10;
        } else {
            let left = index;
            let right = (length-1)-left;
            if((x-left)<0 || width<=(x+right)) {
                console.log('oob h', left, right);
                return;
            }
            start = dropLocation-left;
        }

        for(let i=0; i<length; ++i) {
            if(mgrid[start+(i*multilpier)]!==undefined) {
                console.log(`${start+i} is taken`);
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
    };

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
