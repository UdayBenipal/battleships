import Button from '../landingComponents/button.js';
import { useState } from 'react';

const ShipsGrid = ({ setDraggedShip, shipsPlaced }) => {

    const [isVertical, setIsVertical] = useState(true);
    const rotateShips = () => setIsVertical(!isVertical);

    const setDraggedShipInfo = (e) => {
        const index = e.target.id.slice(-1);
        const name = e.target.id.slice(0, -1);
        let length;

        if('destroyer'===name) length=2;
        else if('submarine'===name || 'cruiser'===name) length=3;
        else if('battleship'===name) length=4;
        else if('carrier'===name) length=5;

        setDraggedShip({ index, name, length, isVertical });
    };

    return (
        <div className='shipsGrid'>
            <div className='instructions'>Drag and Drop The Ships In Water</div>
            <div className='btnContainer'>
                <Button
                    className={'rotateBtn'}
                    text={'Rotate Ships'}
                    onClick={rotateShips}/>
            </div>
            {
            !shipsPlaced[0] &&
            (<div className={`destroyerContainer ${isVertical ? 'vertical' : 'horizontal'}`} draggable='true'>
                <div id='destroyer0' className={isVertical ? 'top' : 'left'} onMouseDown={setDraggedShipInfo} onTouchStart={setDraggedShipInfo}></div>
                <div id='destroyer1' className={isVertical ? 'bottom' : 'right'} onMouseDown={setDraggedShipInfo} onTouchStart={setDraggedShipInfo}></div>
            </div>)
            }
            {
            !shipsPlaced[1] &&
            (<div className={`submarineContainer ${isVertical ? 'vertical' : 'horizontal'}`} draggable='true'>
                <div id='submarine0' className={isVertical ? 'top' : 'left'} onMouseDown={setDraggedShipInfo} onTouchStart={setDraggedShipInfo}></div>
                <div id='submarine1' onMouseDown={setDraggedShipInfo} onTouchStart={setDraggedShipInfo}></div>
                <div id='submarine2' className={isVertical ? 'bottom' : 'right'} onMouseDown={setDraggedShipInfo} onTouchStart={setDraggedShipInfo}></div>
            </div>)
            }
            {
            !shipsPlaced[2] &&
            (<div className={`cruiserContainer ${isVertical ? 'vertical' : 'horizontal'}`} draggable='true'>
                <div id='cruiser0' className={isVertical ? 'top' : 'left'} onMouseDown={setDraggedShipInfo} onTouchStart={setDraggedShipInfo}></div>
                <div id='cruiser1' onMouseDown={setDraggedShipInfo} onTouchStart={setDraggedShipInfo}></div>
                <div id='cruiser2' className={isVertical ? 'bottom' : 'right'} onMouseDown={setDraggedShipInfo} onTouchStart={setDraggedShipInfo}></div>
            </div>)
            }
            {
            !shipsPlaced[3] &&
            (<div className={`battleshipContainer ${isVertical ? 'vertical' : 'horizontal'}`} draggable='true'>
                <div id='battleship0' className={isVertical ? 'top' : 'left'} onMouseDown={setDraggedShipInfo} onTouchStart={setDraggedShipInfo}></div>
                <div id='battleship1' onMouseDown={setDraggedShipInfo} onTouchStart={setDraggedShipInfo}></div>
                <div id='battleship2' onMouseDown={setDraggedShipInfo} onTouchStart={setDraggedShipInfo}></div>
                <div id='battleship3' className={isVertical ? 'bottom' : 'right'} onMouseDown={setDraggedShipInfo} onTouchStart={setDraggedShipInfo}></div>
            </div>)
            }
            {
            !shipsPlaced[4] &&
            (<div className={`carrierContainer ${isVertical ? 'vertical' : 'horizontal'}`} draggable='true'>
                <div id='carrier0' className={isVertical ? 'top' : 'left'} onMouseDown={setDraggedShipInfo} onTouchStart={setDraggedShipInfo}></div>
                <div id='carrier1' onMouseDown={setDraggedShipInfo} onTouchStart={setDraggedShipInfo}></div>
                <div id='carrier2' onMouseDown={setDraggedShipInfo} onTouchStart={setDraggedShipInfo}></div>
                <div id='carrier3' onMouseDown={setDraggedShipInfo} onTouchStart={setDraggedShipInfo}></div>
                <div id='carrier4' className={isVertical ? 'bottom' : 'right'} onMouseDown={setDraggedShipInfo} onTouchStart={setDraggedShipInfo}></div>
            </div>)
            }
        </div>
    )
};

export default ShipsGrid;
