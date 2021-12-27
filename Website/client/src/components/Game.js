import React, {useEffect , useState, useRef} from 'react'
import axios from '../axios.js';
import Cookies from 'js-cookie';
import  { useNavigate } from 'react-router-dom'
import './css/Game.css';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';
import LightbulbIcon from '@mui/icons-material/Lightbulb';
import NewspaperIcon from '@mui/icons-material/Newspaper';
import QrCodeIcon from '@mui/icons-material/QrCode';
import LanguageIcon from '@mui/icons-material/Language';
import InfoIcon from '@mui/icons-material/Info';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import HelpCenterIcon from '@mui/icons-material/HelpCenter';
import { Avatar, IconButton } from "@mui/material";
import ComputerIcon from '@mui/icons-material/Computer';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import {DndProvider} from 'react-dnd';
import {HTML5Backend} from 'react-dnd-html5-backend';
import CloseIcon from '@mui/icons-material/Close';
import { gameSubject,initGame,resetGame } from './GameLogic.js';
import io from 'socket.io-client'
import Chess from 'chess.js';
import Board from './Board.js';
import {CONNECTION_PORT} from '../credentials.js';

let socket;

function Game({logo}) {
    const navigate = useNavigate();
    const [userData, setuserData] = useState({});
    const [boardStatus, setboardStatus] = useState("online");
    const [userName, setuserName] = useState("parvg555");
    const [chat, setchat] = useState([]);
    const [board, setboard] = useState([]);
    const [isGameOver, setisGameOver] = useState();
    const [result, setResult] = useState();
    const [turn, setturn] = useState();
    const [myColor, setmyColor] = useState('w');
    const [checkCondition, setcheckCondition] = useState();
    const [onlineGame,setonlineGame] = useState(false);
    const [vsComputer,setvsComputer] = useState(false);
    const [multiPlayer, setmultiPlayer] = useState(false);


    //Socket Programming
    useEffect(() => {
        socket = io(CONNECTION_PORT);
    },[CONNECTION_PORT])


    //Update the chat after every Move
    const updateChat = (move) => {
        const item = {
            sender:turn,
            message:move
        }
        setchat([item,...chat]);
    }

    //updating chat with a system message
    const sendSystemMessage = (message) => {
        const item = {
            sender:'c',
            message:message
        }
        setchat([item,...chat]);
    }

    // declaring a new chess game to subscribe to game in bg
    const chess = new Chess();
    
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

    // reads the token and extracts the id of user
    useEffect(async () => {
            let isMounted = true;
            const token = Cookies.get('token');
            await axios.get('/getUserData',{
                headers:{
                    'token':token,
                }
            }).then((response) => {
                if(!response.data.success){
                    Cookies.remove('token');
                    navigate('/');
                }
                if(isMounted) {
                    setuserData(response.data)
                    // console.log(userData);
                }
            })
            return () => {
                isMounted = false;
            }
    },[]);

    return (
        
        <div className='Game'>
            {/* GAME OVER NOTIFICATION */}
            { isGameOver?(
                <div className='notification'>
                    <div className='notification-dialogue'>
                        {/* cross */}
                        <div className='notification-cross'>
                            <CloseIcon 
                                fontSize='large'
                                onClick = {() => {
                                    resetGame();
                                    setchat([]);
                                }}
                            />
                        </div>
                        {/* GAME OVER */}
                        <div className='notification-gameOver'>
                            GAME OVER!
                        </div>
                        <div className='notification-reason'>
                            {result}
                        </div>
                            
                        {/* REASON */}
                    </div>
                </div>
            ):('')}                        
            {/* LEFT MENU BAR */}
            <div className='menu'>
                <img  className='menu-logo' src={logo} alt="" />
                <div className='menu-item-container'>
                    <div className='menu-item'>
                        <SportsEsportsIcon fontSize='large' />
                        <h2>Play</h2>
                    </div>
                    <div className='menu-item'>
                        <AccountBoxIcon fontSize='large' />
                        <h2>Profile</h2>
                    </div>
                    <div className='menu-item'>
                        <LightbulbIcon fontSize='large' />
                        <h2>Learn</h2>
                    </div>
                    <div className='menu-item'>
                        <NewspaperIcon fontSize='large' />
                        <h2>News</h2>
                    </div>
                    <div className='menu-item'>
                        <QrCodeIcon fontSize='large' />
                        <h2>QR</h2>
                    </div>
                    
                </div>
                {/* sidebar footer */}
                <div className="sidebar-footer">
                    <div onClick={() => {
                            Cookies.remove('token');
                            navigate('/');
                        }} 
                        className='sidebar-footer-item'
                    >
                        <ExitToAppIcon/>
                        <h2>LogOut</h2>
                    </div>
                    <div className='sidebar-footer-item'>
                        <LanguageIcon/>
                        <h2>Language</h2>
                    </div>
                    <div className='sidebar-footer-item'>
                        <InfoIcon/>
                        <h2>Info</h2>
                    </div>
                    <div className='sidebar-footer-item'>
                        <HelpCenterIcon/>
                        <h2>Help</h2>
                    </div>
                </div> 
            </div>
            {/* GAMING AREA */}
            <div className='gaming-area'>

                <div className='player'>
                    <Avatar src="https://avatars.githubusercontent.com/u/61341517?v=4" variant="rounded" sx={{ width: 46, height: 46 }}/>
                    <div className="player-details">
                        <h2>Player Name</h2>
                        <p>India</p>
                    </div>
                </div>
                <div className='chess-container'>
                    <div className='chess'>
                        {/* <h2>container for chess board</h2> */}
                        <DndProvider backend = {HTML5Backend} >
                            <Board board ={board} updateChat={updateChat} myColor={turn} />
                        </DndProvider>
                    </div>
                </div>
                <div className='player'>
                    <Avatar src="https://avatars.githubusercontent.com/u/61341517?v=4" variant="rounded" sx={{ width: 46, height: 46 }}/>
                    <div className="player-details">
                        <h2>Player Name</h2>
                        <p>India</p>
                    </div>
                </div>
            </div>
            {/* RIGHT MENU BAR */}
            <div className="right-menu">
                <div className="right-menu-container">
                    {/* board status */}
                    <div className={`board-status ${boardStatus}`} >
                        Board Id: 21323123123
                    </div>
                    {/* Timer */}
                    <div className="timer">
                        <p>00:00</p>
                    </div>
                    {/* Moves Bar */}
                    <div className="moves">
                        {checkCondition?(
                            <div className='move move-center'>
                                <p>CHECK!</p>
                            </div>
                        ):''}
                        {chat.map((item,i) => (
                            <div key={i} className={
                                `move ${
                                    (item.sender) === myColor?'move_mine':(
                                        (item.sender) === 'c'?'move-center':''
                                    )
                                }`
                            }>
                            
                            {item.sender !== 'c'?(
                                <p className='move-name'>
                                    {item.sender === 'b'?"BLACK":"WHITE"}
                                </p>
                            ):''}
                            <p>{item.message}</p>
                            </div>
                        ))}
                        {/* <div className='move move_mine'>
                             <p className='move-name'>sender</p>
                             <p> move1 </p>
                        </div>
                        <div className='move'>
                             <p className='move-name'>sender</p>
                             <p> move1 </p>
                        </div>
                        <div className='move move-center'>
                             <p> System Messages Appear here </p>
                        </div> */}
                    </div>
                    {/* Options */}
                    <div className="options">
                        <div className="button" onClick = {() => {
                            resetGame();
                            setchat([]);
                        }}>
                            Play Online
                        </div>
                        <div className='half-button-container'>
                            <div className="button-half">
                                {/* <MicSharpIcon fontSize='large' /> */}
                                <ComputerIcon fontSize='large' />
                            </div>
                            <div className="button-half right">
                                {/* <LightbulbIcon fontSize='large' /> */}
                                <PersonAddIcon fontSize='large' />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Game
