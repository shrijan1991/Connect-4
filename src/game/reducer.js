import ActionTypes from '../constants/ActionTypes';
import { ROWS, COLUMNS } from '../constants/BoardSize';

import checkWin from './checkWin';

const initialState = {
  /* The entire game player placements, null for empty ones */
  boardState: new Array(ROWS).fill(new Array(COLUMNS).fill(null)),

  /* The list of players that are playing this game */
  players: [],

  /* The index of the player in the `players` array */
  currentPlayer: 0,

  /* The id of the player who has won the game, null for unfinished game */
  victor: null,

  // Count of the number of moves made.
  moveNo: 0,
};

const pushDisk = (original, toRow, toColumn, player) => (
  original.map((row, rowNum) => {
    if (rowNum !== toRow) {
      return row;
    }

    return row.map((value, colNum) => (toColumn === colNum ? player : value));
  })
);

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.START_GAME:
      return Object.assign({}, initialState, {
        players: action.payload,
      });

    case ActionTypes.PLACE_PLAYER: {
      const newBoardState = pushDisk(state.boardState, action.payload.row,
          action.payload.col, state.currentPlayer);
      const winParameters = checkWin(newBoardState, action.payload.row,
          action.payload.col);
      return Object.assign({}, state, {
        boardState: newBoardState,
        currentPlayer: (state.currentPlayer + 1) % 2,
        victor: winParameters ?
        { winner: state.currentPlayer,
          winningPieces: winParameters,
        } : null,
        moveNo: state.moveNo + 1,
      });
    }

    default:
      return state;
  }
};

export default reducer;
