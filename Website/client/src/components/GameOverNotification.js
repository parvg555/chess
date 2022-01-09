import React from 'react'
import {resetGame} from './GameLogic.js';
import './css/GameOverNotification.css';
import CloseIcon from '@mui/icons-material/Close';

function GameOverNotification({isGameOver,setchat,result,setGameStatus}) {
    return (
        <>
        { isGameOver?(
            <div className='notification'>
                <div className='notification-dialogue'>
                        {/* cross */}
                    <div className='notification-cross'>
                        <CloseIcon 
                            fontSize='large'
                            onClick = {() => {
                                resetGame();
                                setGameStatus(false);
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
