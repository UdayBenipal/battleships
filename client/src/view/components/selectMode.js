import Button from './button.js';

const SelectMode = ({setGameMode}) => {

    const setSingle = () => { setGameMode('single');};

    const setMulti = () => { setGameMode('multi'); };

    return (
        <>
            <Button
                className={'setModeBtn'}
                text={'Play Against Computer'}
                onClick={setSingle}/>
            <Button
                className={'setModeBtn'}
                text={'Play Against Friend'}
                onClick={setMulti}/>
        </>
    );
};

export default SelectMode;
