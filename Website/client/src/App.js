import './App.css';
import Login from './components/Login';
import {BrowserRouter as Router,Route, Routes} from 'react-router-dom';
import {useState, useEffect} from 'react';
import axios from './axios.js';
import Game from './components/Game';
import Cookies from 'js-cookie';
import  { Redirect,useNavigate } from 'react-router-dom'


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
