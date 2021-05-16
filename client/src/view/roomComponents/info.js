const Info = ({ roomName, topText }) => {
    return (
        <div className='info'>{topText===undefined ? roomName : topText}</div>
    )
};

export default Info;
