import React from 'react'
import {resetGame} from './GameLogic.js';
import './css/GameOverNotification.css';
import CloseIcon from '@mui/icons-material/Close';
import { Socket } from 'socket.io-client';

function GameOverNotification({
    isGameOver,
    setchat,
    result,
    setGameStatus,
    gameStatus,
    setGameMode,
    setopponentData,
    gameMode,
    socket
}) {

    return (
        <>
        { (isGameOver && gameStatus)?(
            <div className='notification'>
                <div className='notification-dialogue'>
                        {/* cross */}
                    <div className='notification-cross'>
                        <CloseIcon 
                            fontSize='large'
                            onClick = {async() => {
                                setGameStatus(false);
                                if(gameMode === 'MultiplayerOnline'){
                                    setGameMode('off');
                                    await socket.emit('game-over');
                                    setopponentData({});
                                }
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
                </div>
            </div>
        ):('')}
        </>
    )
}

export default GameOverNotification
