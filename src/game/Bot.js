import { ROWS, COLUMNS } from '../constants/BoardSize';
import ActionTypes from '../constants/ActionTypes';
import Player from './Player';
import getMove from './botLogic';

const availableMoves = (board) => {
  const moves = [];
  for (let col = 0; col < COLUMNS; col += 1) {
    let row = ROWS - 1;
    while (row > -1 && board[row][col] !== null) {
      row -= 1;
    }
    if (row > -1) {
      moves.push({ row, col });
    }
  }
  return moves;
};

class Bot extends Player {

  onMyTurn(moveNo, boardState, dispatch, row, col, currentPlayer) {
    const moves = availableMoves(boardState);
    const botMove = getMove(moveNo, boardState, row, col, this.level, currentPlayer);
    dispatch({
      type: ActionTypes.PLACE_PLAYER,
      payload: moves.find(move => (move.col === botMove)),
    });
  }
}

export default Bot;
