import './App.css';
import Login from './components/Login';

function App() {

  const logo = "https://static.wixstatic.com/media/2cd43b_ef10eb43396941a884948e2c40954a9b~mv2.png/v1/fill/w_278,h_249,q_90/2cd43b_ef10eb43396941a884948e2c40954a9b~mv2.png"

  return (
    <div className="App">
      <Login logo ={logo}/>
    </div>
  );
}

export default App;
