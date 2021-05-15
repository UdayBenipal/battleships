import Button from '../landingComponents/button.js';

const ShipsGrid = () => {

    const rotateShips = () => {};

    return (
        <div className="shipsGrid">
            <div className="instructions">Drag and Drop The Ships In Water</div>
            <div className="destroyerContainer vertical" draggable="true">
                <div id="destoryer0"></div>
                <div id="destroyer1"></div>
            </div>
            <div className="submarineContainer vertical" draggable="true">
                <div id="submarine0"></div>
                <div id="submarine1"></div>
                <div id="submarine2"></div>
            </div>
            <div className="cruiserContainer vertical" draggable="true">
                <div id="cruiser0"></div>
                <div id="cruiser1"></div>
                <div id="cruiser2"></div>
            </div>
            <div className="battleshipContainer vertical" draggable="true">
                <div id="battleship0"></div>
                <div id="battleship1"></div>
                <div id="battleship2"></div>
                <div id="battleship3"></div>
            </div>
            <div className="carrierContainer vertical" draggable="true">
                <div id="carrier0"></div>
                <div id="carrier1"></div>
                <div id="carrier2"></div>
                <div id="carrier3"></div>
                <div id="carrier4"></div>
            </div>
            <div className="btnContainer">
                <Button
                    className={'rotateBtn'}
                    text={'Rotate Ships'}
                    onClick={rotateShips}/>
            </div>
        </div>
    )
};

export default ShipsGrid;
