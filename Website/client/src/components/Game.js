//Library Import
import React,{useEffect , useState, useRef} from 'react';
import axios from '../axios.js';
import Cookies from 'js-cookie';
import {useNavigate} from 'react-router-dom';
import {DndProvider} from 'react-dnd';
import {HTML5Backend} from 'react-dnd-html5-backend';
import io from 'socket.io-client';
import useAsyncEffect from 'use-async-effect'

//Dependency Import
import { gameSubject,initGame,resetGame } from './GameLogic.js';

//Components Import
import Board from './Board.js';
import {CONNECTION_PORT} from '../credentials.js';
import GameOverNotification from "./GameOverNotification.js";
import LeftMenu from './LeftMenu.js';
import PlayerDetails from './PlayerDetails.js';
import GameBar from './GameBar.js';
import SystemNotification from './SystemNotification.js';

//Css Import
import './css/Game.css';

//Creating a socket instance for TCP connection
let socket;

function Game({logo}) {
    //enabling page navigation
    const navigate = useNavigate();

    //Extracting the Token 
    const token = Cookies.get('token');

    //Use States for Game control
    const [userData, setuserData] = useState({});
    const [opponentData, setopponentData] = useState({
        // 'name':"Parv Gupta",
        // 'username':"parvg555"
    });
    const [notification, setnotification] = useState({});
    const [time,setTime] = useState(0);
    const [gameStatus, setGameStatus] = useState(false);
    const [chat, setchat] = useState([]);
    const [board, setboard] = useState([]);
    const [isGameOver, setisGameOver] = useState();
    const [result, setResult] = useState();
    const [turn, setturn] = useState();
    const [myColor, setmyColor] = useState('w');
    const [checkCondition, setcheckCondition] = useState();
    const [gameMode, setGameMode] = useState();

    const [boardStatus, setboardStatus] = useState("disconnected");
    const [onlineGame,setonlineGame] = useState(false);
    const [vsComputer,setvsComputer] = useState(false);
    const [multiPlayer, setmultiPlayer] = useState(false);

    //start MultiplayerOffline Game
    const startMultiplayerGame = () => {
        setchat([]);
        setGameMode("MultiplayerOffline");
        setTime(0);
        sendSystemMessage('Multi-Player Game Started');
        sendSystemMessage('Pass the device to take moves');
        resetGame();
        setGameStatus(true);
    }

    // reads the token and extracts the id of user
    useAsyncEffect(async isMounted => {
        await axios.get('/getUserData',{
            headers:{
                'token':token,
            }
        }).then((response) => {
            if(!response.data.success){
                Cookies.remove('token');
                navigate('/');
            }
            if(!isMounted()) return;
            setuserData(response.data)
            if(response.data.boardid){
                setboardStatus('disconnected');
            } 
            console.log(response.data);
        }).catch((error) => {
            Cookies.remove('token');
            navigate('/');
        })
    },[token]);

    //Socket Connection for TCP
    useEffect(() => {
        socket = io(CONNECTION_PORT);
    },[])


    //Update the chat after every Move
    const updateChat = (move) => {
        const item = {
            sender:turn,
            message:move
        }
        setchat((chat) => [...chat,item]);
    }

    //Sending System Notification
    const sendSystemNotification = (heading,text) =>{
        setnotification({
            title:heading,
            text:text
        })
    }

    //updating chat with a system message
    const sendSystemMessage = (message) => {
        const item = {
            sender:'c',
            message:message
        }
        setchat((chat) => [...chat,item]);
    }

    //Coming Soon notification
    const ComingSoon = () => {
        sendSystemNotification('Coming Soon!','Work in Progress')
    }

    // declaring a new chess game to subscribe to game in bg
    // const chess = new Chess();
    
    useEffect(() => {
        initGame();
        const subscribe = gameSubject.subscribe((game) => {
            setboard(game.board);
            setisGameOver(game.isGameOver);
            setResult(game.result);
            setturn(game.turn);
            setcheckCondition(game.check);
        })
        return () => subscribe.unsubscribe()
    }, [])

    return (
        
        <div className='Game'>
            {/* System Notification */}
            <SystemNotification
                notification={notification}
                setnotification={setnotification}
            />
            {/* GAME OVER NOTIFICATION */}
            <GameOverNotification
                isGameOver = {isGameOver}
                setchat = {setchat}
                result = {result}
                gameStatus = {gameStatus}
                setGameStatus = {setGameStatus}
            />                        
            {/* LEFT MENU BAR */}
            <div className='menu'>
                <LeftMenu
                    logo = {logo}
                    ComingSoon={ComingSoon}
                />
            </div>
            {/* GAMING AREA */}
            <div className='gaming-area'>
                <PlayerDetails
                    name = {opponentData.name}
                    details = {opponentData.username}
                    visible={opponentData.username?true:false}
                />
                <div className='chess-container'>
                    <div className='chess'>
                        {/* <h2>container for chess board</h2> */}
                        <DndProvider backend = {HTML5Backend} >
                            <Board 
                                board ={board} 
                                updateChat={updateChat} 
                                myColor={
                                    gameMode==="MultiplayerOffline"?(turn):(myColor)
                                }
                                gameStatus = {gameStatus} 
                                sendSystemMessage = {sendSystemMessage}
                            />
                        </DndProvider>
                    </div>
                </div>
                <PlayerDetails
                    name = {userData.name}
                    details = {userData.username}
                    visible={userData.username?true:false}
                />
            </div>
            {/* RIGHT MENU BAR */}
            <GameBar
                userData = {userData}
                boardStatus={boardStatus}
                checkCondition = {checkCondition}
                chat={chat}
                myColor = {myColor}
                setchat = {setchat}
                ComingSoon={ComingSoon}
                time = {time}
                setTime={setTime}
                GameStatus = {gameStatus}
                setGameStatus = {setGameStatus}
                startMultiplayerGame = {startMultiplayerGame}
                isGameOver = {isGameOver}
            />
        </div>
    )
}

export default Game
