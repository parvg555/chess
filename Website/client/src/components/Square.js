import React from 'react'
import Piece from './Piece';
import './css/Square.css'
import {useDrop} from 'react-dnd';
import {move} from './GameLogic';

function Square({
    id , 
    piece , 
    updateChat, 
    turn, 
    gameStatus,
    sendSystemMessage
}) {

    const getXYPosition = (i) => {
        const x = turn==='w'? i % 8 : Math.abs((i%8) - 7);
        const y = turn ==='w'? Math.abs(Math.floor(i / 8) - 7) : Math.floor(i/8);
        return {x,y};
    }

    const isBlack = (i) => {
        const {x,y} = getXYPosition(i);
        return (x + y) % 2 === 0;
    }

    const getPostion = (i) => {
        const {x,y} = getXYPosition(i);
        const letter = ['a','b','c','d','e','f','g','h'][x];
        return `${letter}${y+1}`
    }

    const myPosition = getPostion(id);

    const [,drop] = useDrop({
        accept:'piece',
        drop: async (item) => {
            const [fromPosition] = item.id.split('_')
            if (gameStatus && fromPosition !== myPosition && move(fromPosition,myPosition)) {
                await updateChat(`${fromPosition} → ${myPosition}`);
            }else if(!gameStatus){
                sendSystemMessage("Please Start a game to move!")
            }else if(fromPosition !== myPosition){
                sendSystemMessage("Invalid Move")
            }
        },
    })

    return (
        <div className={`square ${(isBlack(id))?'black-square':'white-square'}`} ref={drop}>
            { piece &&  <Piece piece={piece} position = {getPostion(id)}/>}
        </div>
    )
}

export default Square
