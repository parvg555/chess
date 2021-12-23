import React from 'react'
import './css/Piece.css'
import {useDrag , DragPreviewImage} from 'react-dnd';

import b_b from '../assets/pieces2/b_b.png';
import b_w from '../assets/pieces2/b_w.png';
import k_b from '../assets/pieces2/k_b.png';
import k_w from '../assets/pieces2/k_w.png';
import n_b from '../assets/pieces2/n_b.png';
import n_w from '../assets/pieces2/n_w.png';
import p_b from '../assets/pieces2/p_b.png';
import p_w from '../assets/pieces2/p_w.png';
import q_b from '../assets/pieces2/q_b.png';
import q_w from '../assets/pieces2/q_w.png';
import r_b from '../assets/pieces2/r_b.png';
import r_w from '../assets/pieces2/r_w.png';

function Piece({piece : {type, color} , position}) {

    const getPiece  = () => {
        if(type === "b" && color === "b"){
            return b_b;
        }
        if(type === "b" && color === "w"){
            return b_w;
        }
        if(type === "k" && color === "b"){
            return k_b;
        }
        if(type === "k" && color === "w"){
            return k_w;
        }
        if(type === "n" && color === "b"){
            return n_b;
        }
        if(type === "n" && color === "w"){
            return n_w;
        }
        if(type === "p" && color === "w"){
            return p_w;
        }
        if(type === "p" && color === "b"){
            return p_b;
        }
        if(type === "q" && color === "b"){
            return q_b;
        }
        if(type === "q" && color === "w"){
            return q_w;
        }
        if(type === "r" && color === "b"){
            return r_b;
        }
        if(type === "r" && color === "w"){
            return r_w;
        }
    }

    const id = `${position}_${type}_${color}`

    const [ {isDragging}, drag , preview] = useDrag({
        type: 'piece',
        collect : (monitor) => {
            return {isDragging: !!monitor.isDragging()}
        },
        item: () => ({id}) 
    })

    return (
        <>
            <DragPreviewImage connect={preview} src={getPiece()} />
            <img className='piece' src={getPiece()} alt="" ref = {drag} style={{visibility: isDragging?'hidden':'visible'}}/>
        </>
    )
}

export default Piece
