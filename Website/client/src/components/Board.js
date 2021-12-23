import React from 'react'
import Square from './Square.js'
import './css/Board.css'

function Board({board, updateChat}) {

    return (
        <div className='board'>
            {board.flat().map((piece,i) => (<Square key={i} id={i} piece={piece} updateChat = {updateChat} />))}
        </div>
    )
}

export default Board
