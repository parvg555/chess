//Library Import
import React , {useState, useEffect} from 'react'
//Dependency Import

//Components Import
import Square from './Square.js'

//Css Import
import './css/Board.css'

function Board({board, updateChat, myColor}) {

    //Reverses the board according to the color of player
    const [currBoard, setCurrBoard] = useState([]);
    useEffect(() => {
        setCurrBoard(
            myColor === 'w' ? board.flat() : board.flat().reverse()
        )
    }, [board,myColor])

    return (
        <div className='board'>
            {currBoard.flat().map((piece,i) => (<Square key={i} id={i} piece={piece} updateChat = {updateChat} turn = {myColor} />))}
        </div>
    )
}

export default Board
//creates a board with squares and pieces