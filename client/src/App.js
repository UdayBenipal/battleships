import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Landing from './view/landing'
import Room from './view/room'

function App() {
  let data = {
        gameMode: null,
        playerName: '',
        roomName: ''
      };

  const setGameInfo = (gameData) => {data = {...gameData}};

  return (
    <Router>
      <>
        <Switch>
          <Route exact path='/' component={() => <Landing setGameInfo={setGameInfo}/>}/>
          <Route exact path='/room' component={() => <Room data={data}/>}/>
        </Switch>
      </>
    </Router>
  );
}

export default App;
