import { useState, useEffect } from 'react';

const PlayerGrid = () => {
    const [grid, setGrid] = useState([]);

    useEffect(() => {
        let squares = [];
        for(let i = 0; i < 100; i++) {
            squares.push(<div data-id={i} />);
        }
        setGrid(squares);
    }, []);

    return (
        <div className="playerGrid">
            {grid}
        </div>
    )
};

export default PlayerGrid;
