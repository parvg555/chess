//Library Import
import {BrowserRouter as Router,Route, Routes} from 'react-router-dom';

//Dependency Import

//Components Import
import Login from './components/Login';
import Game from './components/Game';

//Css Import
import './App.css';

function App() {

  const logo = "https://static.wixstatic.com/media/2cd43b_ef10eb43396941a884948e2c40954a9b~mv2.png/v1/fill/w_278,h_249,q_90/2cd43b_ef10eb43396941a884948e2c40954a9b~mv2.png"


  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path='/' element = {
            <>
              <Login logo ={logo}/>
            </>
          } />
          <Route path='/game' element = {
            <>
              <Game logo = {logo}/>   
            </>
          } />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
