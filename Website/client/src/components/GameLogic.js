import Chess from 'chess.js';
import { BehaviorSubject } from 'rxjs';


let stalmate = 'k7/1R1RN3/p3p3/P3P2p/1PP4P/3K1PP1/8/8 b - h3 0 1';

const chess = new Chess()

export const initGame = () => {
    updateGame();
}

export const gameSubject = new BehaviorSubject();

export const move = (from, to) => {
    const legalMove = chess.move({ from, to, promotion: 'q' });
    if (legalMove) {
        updateGame()
        return true;
    }
    return false
}

const updateGame = () => {
    const isGameOver = chess.game_over();
    const newGame = {
        board: chess.board(),
        isGameOver,
        turn: chess.turn(),
        check: chess.in_check(),
        result: isGameOver ? getGameResult() : null
    }
    gameSubject.next(newGame)
}

function getGameResult() {
    if (chess.in_checkmate()) {
        const winner = chess.turn() === "w" ? "BLACK" : "WHITE";
        return `CHECKMATE-WINNER-${winner}`
    } else if (chess.in_draw()) {
        let reason = '50-MOVES-RULE';
        if (chess.in_stalemate()) {
            reason = 'STALEMATE'
        } else if (chess.in_threefold_repetition()) {
            reason = 'REPETITION'
        } else if (chess.insufficient_material()) {
            reason = 'INSUFFICIENT MATERIAL'
        }

        return `DRAW-${reason}`;
    } else {
        return 'UNKNOWN REASON';
    }
}

export const resetGame = () => {
    chess.reset();
    updateGame();
}