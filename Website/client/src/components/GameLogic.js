import Chess from 'chess.js';
import { BehaviorSubject } from 'rxjs';


const chess = new Chess()

export const initGame = () => {
    updateGame();
}

export const gameSubject = new BehaviorSubject();

export const move = (from,to) => {
    const legalMove = chess.move({from,to,promotion:'q'});
    if (legalMove) {
        updateGame()
        return true;
    }
    return false
}

const updateGame = () => {
    const newGame = {
        board: chess.board()
    }
    gameSubject.next(newGame)
}