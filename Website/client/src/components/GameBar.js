import React,{useState,useEffect,useRef} from 'react'

import { resetGame } from './GameLogic';

import './css/Game.css'

import ComputerIcon from '@mui/icons-material/Computer';
import GroupIcon from '@mui/icons-material/Group';
import MicIcon from '@mui/icons-material/Mic';
import LightbulbIcon from '@mui/icons-material/Lightbulb';


function GameBar({
    userData,
    boardStatus,
    checkCondition,
    chat,
    myColor,
    setchat,
    ComingSoon,
    GameStatus,
    time,
    setTime,
    setGameStatus,
    startMultiplayerGame,
    isGameOver,
    gameMode,
    setGameMode,
    sendSystemNotification,
    setopponentData,
    waitingForPlayer,
    setWaitingForPlayer,
    joinButtonLoading,
    createButtonLoading,
    leaveGameButtonLoading,
    CreateNewRoom,
    DeleteRoom,
    JoinRoom,
    startGame,
    opponentData,
    startGameButtonLoading,
    leaveGame,
}) {
    

    //Join room input field
    const [joinRoomInput, setJoinRoomInput] = useState("");

    //Scroll Moves/Chats to the latest
    const ChatsEndRef = useRef(null)
    useEffect(() => {
        ChatsEndRef.current?.scrollIntoView({behaviour: "smooth"})
    }, [chat])

    //Increases time every 1 second
    useEffect(() => {
        let interval = null;
        if(GameStatus === true && !isGameOver){
            interval = setInterval(() => {
                setTime((time) => time+1);
            },1000);
        }else{
            clearInterval(interval);
        }
        return () => {
            clearInterval(interval);
        };
    },[GameStatus,isGameOver,setTime])


    return (
        <div className='right-menu'>
            <div className="right-menu-container">
                    {/* board status */}
                    <div className={`board-status ${boardStatus}`} >
                        {userData.boardid?`Board: ${userData.boardid}`:'NO REGISTERED BOARD FOUND'}
                    </div>
                    {/* Timer */}
                    <div className="timer">
                        <p>{Math.floor((time)/3600) > 9?(Math.floor((time)/3600)):(`0${Math.floor((time)/3600)}`)}
                            :
                            {Math.floor(((time)/60)%60) > 9?(Math.floor(((time)/60)%60)):(`0${Math.floor(((time)/60)%60)}`)}
                            :
                            {Math.floor((time)%60) > 9?(Math.floor((time)%60)):(`0${Math.floor((time)%60)}`)}</p>
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
                            {item.message.toString().split('\n').map((str,key) => (
                                <p key={key}>{str}</p>
                            ))}
                            {/* <p>{item.message}</p> */}
                            </div>
                        ))}
                        <div ref={ChatsEndRef} />
                    </div>
                    {/* Play Options */}
                    {   
                        gameMode !== 'MultiplayerOnline' &&
                        GameStatus===false && 
                        isGameOver===false && 
                        waitingForPlayer===false && (
                        <div className="options">
                            <div className="button" onClick = {() => {
                                setGameMode("MultiplayerOnline")
                                setchat([]);
                                resetGame();
                                setTime(0);
                            }}>
                                Play Online
                            </div>
                            <div className='half-button-container'>
                                <div 
                                    className="button-half"
                                    onClick={() => {
                                        ComingSoon();
                                    }}
                                >
                                    <ComputerIcon fontSize='large' />
                                </div>
                                <div 
                                    className="button-half right"
                                    onClick={() => {
                                        startMultiplayerGame();
                                    }}
                                >
                                    <GroupIcon fontSize='large' />
                                </div>
                            </div>
                        </div>)
                    }
                    {/* INGAME OPTIONS */}
                    {   
                        gameMode==="MultiplayerOffline" &&
                        GameStatus===true && 
                        isGameOver===false && (
                        <div className="options">
                            <div className="button" onClick = {() => {
                                setGameStatus(false);
                                sendSystemNotification("Game Ended","user ended the game");
                            }}>
                                End Game
                            </div>
                            <div className='half-button-container'>
                                <div 
                                    className="button-half"
                                    onClick={() => {
                                        ComingSoon();
                                    }}
                                >
                                    <MicIcon fontSize='large' />
                                </div>
                                <div 
                                    className="button-half right"
                                    onClick={() => {
                                        ComingSoon();
                                    }}
                                >
                                    <LightbulbIcon fontSize='large' />
                                </div>
                            </div>
                        </div>)
                    }
                    {
                        gameMode==="MultiplayerOffline" &&
                        isGameOver===true && (
                        <div className="options">
                            <div className="button" onClick = {() => {
                                startMultiplayerGame();
                            }}>
                                Play Again
                            </div>
                            <div className="button" onClick = {() => {
                                resetGame();
                                setchat([]);
                                setTime(0);
                            }}>
                                Back to Main Menu
                            </div>
                            
                        </div>)
                    }
                    {/* Menu for Online Game */}
                    {
                        gameMode === "MultiplayerOnline" &&
                        waitingForPlayer === false &&
                        GameStatus === false &&
                        isGameOver === false &&
                        !opponentData.username &&
                        (
                            <div className="options">

                                <div className='join-room-container'>
                                    <input 
                                        type="text"
                                        id='room-id' 
                                        placeholder='RoomID' 
                                        className='join-room-input'
                                        value={joinRoomInput}
                                        onChange={(e)=>{
                                            setJoinRoomInput(e.target.value)
                                        }}
                                    />
                                    <div 
                                        className='button-join'
                                        onClick={async () => {
                                            await JoinRoom(joinRoomInput);
                                            setJoinRoomInput("");
                                        }}
                                    >

                                        {joinButtonLoading?
                                            ( <div className='button-loading'></div>):
                                            ('Join')
                                        }
                                    </div>
                                </div>
                                <div 
                                    className="button-small"
                                    onClick={async () => {
                                        await CreateNewRoom();
                                    }}
                                >
                                    {createButtonLoading?
                                        (<div className='button-loading'></div>):
                                        ('Create Room')
                                    }
                                </div>
                                <div 
                                    className="button-small"
                                    onClick={() => {
                                        setGameMode('off');
                                    }}
                                >
                                    Main menu
                                </div>
                            </div>)
                    }
                    {
                        gameMode === "MultiplayerOnline" &&
                        waitingForPlayer === true &&
                        GameStatus === false &&
                        isGameOver === false &&
                        (
                            <div className="options">
                                <div className="button" onClick = {async () => {
                                    await DeleteRoom()
                                }}>
                                    {   leaveGameButtonLoading?
                                        (<div className='button-loading'></div>):
                                        ('Leave Game')
                                    }
                                </div>    
                            </div>)
                    }
                    {
                        gameMode === "MultiplayerOnline" &&
                        waitingForPlayer === false &&
                        GameStatus === false &&
                        isGameOver === false &&
                        opponentData.username &&
                        (
                            <div className="options">
                                <div className="button" onClick = {async () => {
                                    await startGame();
                                }}>
                                    {   startGameButtonLoading?
                                        (<div className='button-loading'></div>):
                                        ('Start Game')
                                    }
                                </div>  
                                <div className="button" onClick = {async () => {
                                    await leaveGame();
                                }}>
                                    {   leaveGameButtonLoading? 
                                        (<div className='button-loading'></div>):
                                        ('Leave Game')
                                    }
                                </div>   
                            </div>)
                    }
                    {
                        gameMode === "MultiplayerOnline" &&
                        waitingForPlayer === false &&
                        GameStatus === true &&
                        isGameOver === false &&
                        opponentData.username &&(
                            <div className="options">
                                <div className="button" onClick = {async() => {
                                    await leaveGame();
                                }}>
                                    {   leaveGameButtonLoading? 
                                        (<div className='button-loading'></div>):
                                        ('Leave Game')
                                    }
                                </div>
                                <div className='half-button-container'>
                                    <div 
                                        className="button-half"
                                        onClick={() => {
                                            ComingSoon();
                                        }}
                                    >
                                        <MicIcon fontSize='large' />
                                    </div>
                                    <div 
                                        className="button-half right"
                                        onClick={() => {
                                            ComingSoon();
                                        }}
                                    >
                                        <LightbulbIcon fontSize='large' />
                                    </div>
                                </div>
                            </div>)
                    }
                    
                    {
                    
                    gameMode !== 'MultiplayerOffline' &&
                    GameStatus===false && 
                    isGameOver===true && 
                    waitingForPlayer===false &&
                    
                        (
                            <div className="options">
                                <div 
                                    className="button"
                                    onClick={() => {
                                        setGameMode('off');
                                        setopponentData({});
                                        setGameStatus(false);
                                        setWaitingForPlayer(false);
                                        resetGame();
                                    }}
                                >
                                    Main menu
                                </div>
                            </div>)
                    }

                </div>
        </div>
    )
}

export default GameBar
