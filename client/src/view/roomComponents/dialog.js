import Button from '../landingComponents/button.js'
import { useHistory } from 'react-router-dom';

const Dialog = ({message}) => {
    const history = useHistory();

    const onClick = () => { history.push('/'); }

    return (
        <div className='dialog'>
            <h1>{message}</h1>
            <Button className={'msgButton'} text={'Return To Main Page'} onClick={onClick}/>
        </div>
    )
}

export default Dialog
