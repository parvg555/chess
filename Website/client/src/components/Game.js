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
import { gameSubject,initGame,move,resetGame } from './GameLogic.js';

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
    const [waitingForPlayer, setWaitingForPlayer] = useState(false);
    //Join button and Create Room Loading
    const [joinButtonLoading, setJoinButtonLoading] = useState(false);
    const [createButtonLoading, setCreateButtonLoading] = useState(false);
    const [leaveGameButtonLoading, setLeaveGameButtonLoading] = useState(false);
    const [joinRoomInput, setJoinRoomInput] = useState();
    // const [SocketConnecting,setSocketConnecting] = useState(false);
    // const [onlineGameMode,setOnlineGameMOde] = useState();


    const [boardStatus, setboardStatus] = useState("disconnected");

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
                socket.emit('logout');
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
            socket.emit('logout');
            navigate('/');
        })
    },[token]);

    //Socket Connection for TCP
    useEffect(() => {
        socket = io(CONNECTION_PORT,{
            transports:['websocket']
        });
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

    //Mounting USERNAME on socket change and username change
    useEffect(()=>{
        if(userData.username){
            socket.emit('mount-username',userData.username);
        }
    },[userData]) 

    //mounting username on connection
    useEffect(() => {
        socket.on('connect',() => {
            if(userData.username){
                socket.emit('mount-username',userData.username);
            }
        });
    })

    //Checking if connection is lost
    useAsyncEffect(() => {
        socket.on('disconnect', () => {
            if(gameMode === "MultiplayerOnline"){
                setGameMode();
                setGameStatus(false);
                sendSystemNotification("Disconnected","Connection Lost");
                sendSystemMessage("PLEASE REFRESH!");
            }
            setWaitingForPlayer(false);
            setopponentData({});
        })
    },[gameMode]);

    //Checking if opponent left the game
    useAsyncEffect(() => {
        socket.off('opponent-left').on('opponent-left', () => {
            socket.timeout(10000).emit('leave-game',(error,response)=>{
                if(response) sendSystemMessage('Opponent Left the match');
            });
            setGameMode();
            setGameStatus(false);
            sendSystemMessage("PLEASE REFRESH!");
            sendSystemNotification("Game Over","opponent left the game");
            setWaitingForPlayer(false);
            setopponentData({});
            
        })
    },[gameMode]);

    //check if opponent makes a move
    useAsyncEffect(() => {
        socket.off('move').on('move', (move) => {
            makeMoveWithoutEmitting(move.from,move.to);
        })
    })

    //Make a move without emitting the data to opponent
    //called when a move is received from opponent
    const makeMoveWithoutEmitting  = async (from,to) => {
        if(gameStatus && from !== to && move(from,to)){
            updateChat(`${from} → ${to}`);
        }else if(!gameStatus){
            sendSystemMessage("Please Start a game to move!")
        }else if(from !== to){
            sendSystemMessage("Invalid Move")
        }else{
            sendSystemMessage("not your turn");
        }
    }

    //Make Move Function
    const makeMove  = async (from,to) => {
        var checkingIfItsMyTurn = false;
        if(gameMode === 'MultiplayerOnline'){
            if(turn === myColor) checkingIfItsMyTurn=true;
        }else{
            checkingIfItsMyTurn = true;
        }
        if(gameStatus && checkingIfItsMyTurn && from !== to && move(from,to)){
            if(gameMode === 'MultiplayerOnline'){
                const move = {
                    from:from,
                    to:to
                }
                await socket.emit('make-move',move);
            }
            updateChat(`${from} → ${to}`);
        }else if(!gameStatus){
            sendSystemMessage("Please Start a game to move!")
        }else if(from !== to && checkingIfItsMyTurn){
            sendSystemMessage("Invalid Move")
        }else{
            sendSystemMessage("not your turn");
        }
    }

    //function to create new room 
    const CreateNewRoom = async () => {
        setCreateButtonLoading(true);
        try{
            await socket.timeout(10000).emit('create-room',(err,response) => {
                if(err){
                    sendSystemMessage("Connection Timed Out");
                }else{
                    if(response === "Error"){
                        sendSystemNotification(" Error!","Please Retry");
                    }else if(response === "inroom"){
                        sendSystemMessage("You already have a ongoing game in a room");
                    }else{
                        sendSystemMessage(`Your RoomId: ${response}\n
                                           Share this with your friend to connect`);
                        setopponentData({
                            'name':"Waiting for opponent",
                            'username':'waiting'
                        })
                        setWaitingForPlayer(true);
                    }
                }
                setCreateButtonLoading(false);
            });
        }catch(err){
            sendSystemNotification("Timeout", "Please retry!");
            setCreateButtonLoading(false);
        }
    }

    //Deleting Room
    const DeleteRoom = async () => {
        setLeaveGameButtonLoading(true);
        try{
            await socket.timeout(10000).emit('delete-room',(err,response) => {
                if(err){
                    sendSystemMessage("An Error Occured");
                    
                }else if(response === 'deleted'){
                    setGameMode();
                    setGameStatus(false);
                    setWaitingForPlayer(false);
                    setopponentData({});
                    sendSystemNotification('Game Over','Room Deleted');
                }else if(response === 'noroom'){
                    sendSystemMessage("NOT IN A ROOM");
                }
                setLeaveGameButtonLoading(false);
            })
            
        }catch(error){
            sendSystemNotification("Timeout", "Please retry!");
            setLeaveGameButtonLoading(false);
        }
    }

    //Leave ongoing Game
    const leaveGame = async ()=>{
        setLeaveGameButtonLoading(true);
        try{
            await socket.timeout(10000).emit('leave-game',(err,response) => {
                if(response!=='error'){
                    setGameMode();
                    setGameStatus(false);
                    setWaitingForPlayer(false);
                    setopponentData({});
                    sendSystemNotification('Game Over','Game Left');
                }else{
                    sendSystemMessage('Please Try Again');
                }
                setLeaveGameButtonLoading(false);
            });

        }catch(error){
            sendSystemNotification("Timeout","Please Try Again!");
            setLeaveGameButtonLoading(false);
        }
    }

    //Join Room
    const JoinRoom = async () => {
        setJoinButtonLoading(true);
        try{
            const myData = {
                name:userData.name,
                username:userData.username
            }
            await socket.timeout(10000).emit('join-room',joinRoomInput,myData,(err,response) => {
                if(err){
                    sendSystemMessage("An Error Occured");
                }else{
                    if(response === 'noroom'){
                        sendSystemMessage("INVALID ROOM ID");
                    }else if(response === 'full'){
                        sendSystemMessage("Room Already Full");
                    }else if(response === 'Error'){
                        sendSystemMessage("PLEASE RETRY!");
                    }else{
                        sendSystemMessage(`Joined Room: ${response}`);
                        setJoinRoomInput("");
                        setopponentData({
                            'name':"Waiting for opponent to start",
                            'username':'waiting'
                        })
                        setWaitingForPlayer(true);
                        setmyColor('b');
                    }
                }
                setJoinButtonLoading(false);
            })
        }catch(error){
            sendSystemNotification("Timeout", "Please retry!");
            setJoinButtonLoading(false);
        }
    }

    //Checking if opponent Joins a match
    useEffect(() => {
        socket.off('opponent-data').on('opponent-data',(data) => {
            setopponentData(data);
            setWaitingForPlayer(false);
            
        })
    })


    //Cheking if game is started
    useEffect(() => {
        socket.off('game-started').on('game-started',() => {
            sendSystemMessage('Game Started');
            resetGame();
            setTime(0);
            setGameStatus(true);
        })
    },[gameStatus])

    //start an online game
    const startGame = async () => {
        const myData = {
            name:userData.name,
            username:userData.username
        }
        await socket.emit('start-game',myData);
        sendSystemMessage('Game Started');
        resetGame();
        setmyColor('w');
        setTime(0);
        setGameStatus(true);
    }

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
                    socket = {socket}
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
                                myColor={
                                    gameMode==="MultiplayerOffline"?(turn):(myColor)
                                }
                                makeMove = {makeMove}
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
                gameMode = {gameMode}
                setGameMode = {setGameMode}
                sendSystemNotification={sendSystemNotification}
                socket={socket}
                sendSystemMessage={sendSystemMessage}
                setopponentData = {setopponentData}
                waitingForPlayer = {waitingForPlayer}
                setWaitingForPlayer = {setWaitingForPlayer}
                joinButtonLoading = {joinButtonLoading}
                setJoinButtonLoading = {setJoinButtonLoading}
                createButtonLoading = {createButtonLoading}
                setCreateButtonLoading = {setCreateButtonLoading}
                leaveGameButtonLoading = {leaveGameButtonLoading}
                setLeaveGameButtonLoading = {setLeaveGameButtonLoading}
                CreateNewRoom={CreateNewRoom}
                DeleteRoom={DeleteRoom}
                JoinRoom = {JoinRoom}
                joinRoomInput = {joinRoomInput}
                setJoinRoomInput = {setJoinRoomInput}
                startGame = {startGame}
                opponentData = {opponentData}
                startGameButtonLoading = {false}
                leaveGame = {leaveGame}
            />
        </div>
    )
}

export default Game
