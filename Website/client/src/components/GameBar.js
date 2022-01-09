import React,{useEffect,useRef} from 'react'

import { gameSubject, resetGame } from './GameLogic';

import './css/Game.css'

import ComputerIcon from '@mui/icons-material/Computer';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
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
    isGameOver
}) {

    
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
    },[GameStatus,isGameOver])

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
                            <p>{item.message}</p>
                            </div>
                        ))}
                        <div ref={ChatsEndRef} />
                    </div>
                    {/* Play Options */}
                    {
                        GameStatus===false && 
                        isGameOver===false && (
                        <div className="options">
                            <div className="button" onClick = {() => {
                                resetGame();
                                setchat([]);
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
                        GameStatus===true && 
                        isGameOver===false && (
                        <div className="options">
                            <div className="button" onClick = {() => {
                                setGameStatus(false);
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

                </div>
        </div>
    )
}

export default GameBar
