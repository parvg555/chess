import React,{useEffect,useRef} from 'react'

import { resetGame } from './GameLogic';

import './css/Game.css'

import ComputerIcon from '@mui/icons-material/Computer';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import GroupIcon from '@mui/icons-material/Group';

function GameBar({
    userData,
    boardStatus,
    checkCondition,
    chat,
    myColor,
    setchat,
    ComingSoon
}) {

    const ChatsEndRef = useRef(null)

    useEffect(() => {
        ChatsEndRef.current?.scrollIntoView({behaviour: "smooth"})
    }, [chat])

    return (
        <div className='right-menu'>
            <div className="right-menu-container">
                    {/* board status */}
                    <div className={`board-status ${boardStatus}`} >
                        {userData.boardid?`Board: ${userData.boardid}`:'NO REGISTERED BOARD FOUND'}
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
                        <div ref={ChatsEndRef} />
                    </div>
                    {/* Play Options */}
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
                                    ComingSoon();
                                }}
                            >
                                <GroupIcon fontSize='large' />
                            </div>
                        </div>
                    </div>

                    {/* INGAME OPTIONS */}


                </div>
        </div>
    )
}

export default GameBar
