import Button from '../landingComponents/button.js';
import { useState } from 'react';

const ShipsGrid = () => {

    const [isVertical, setIsVertical] = useState(true);
    const rotateShips = () => setIsVertical(!isVertical);

    return (
        <div className="shipsGrid">
            <div className="instructions">Drag and Drop The Ships In Water</div>
            <div className="btnContainer">
                <Button
                    className={'rotateBtn'}
                    text={'Rotate Ships'}
                    onClick={rotateShips}/>
            </div>
            <div className={`destroyerContainer ${isVertical ? "vertical" : "horizontal"}`} draggable="true">
                <div id="destoryer0"></div>
                <div id="destroyer1"></div>
            </div>
            <div className={`submarineContainer ${isVertical ? "vertical" : "horizontal"}`} draggable="true">
                <div id="submarine0"></div>
                <div id="submarine1"></div>
                <div id="submarine2"></div>
            </div>
            <div className={`cruiserContainer ${isVertical ? "vertical" : "horizontal"}`} draggable="true">
                <div id="cruiser0"></div>
                <div id="cruiser1"></div>
                <div id="cruiser2"></div>
            </div>
            <div className={`battleshipContainer ${isVertical ? "vertical" : "horizontal"}`} draggable="true">
                <div id="battleship0"></div>
                <div id="battleship1"></div>
                <div id="battleship2"></div>
                <div id="battleship3"></div>
            </div>
            <div className={`carrierContainer ${isVertical ? "vertical" : "horizontal"}`} draggable="true">
                <div id="carrier0"></div>
                <div id="carrier1"></div>
                <div id="carrier2"></div>
                <div id="carrier3"></div>
                <div id="carrier4"></div>
            </div>
        </div>
    )
};

export default ShipsGrid;
