import React , {useState, useEffect} from 'react'
import Square from './Square.js'
import './css/Board.css'

function Board({board, updateChat, myColor}) {

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
