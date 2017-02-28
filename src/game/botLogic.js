import { ROWS, COLUMNS } from '../constants/BoardSize';

const DIRECTIONS = [[1, 0], [0, 1], [1, -1], [1, 1]];
const MIN = -1000;
const MAX = 1000;
let DEPTH = 0;
let botPlayerNum = 0;

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

// Evaluation function - extremely costly based on current board state
const evaluate = (boardState, x, y) => {
  let possibleWins = 0;
  let possibleThrees = 0;
  DIRECTIONS.forEach((n) => {
    let playerOneCount = 1;
    let playerTwoCount = 1;
    for (let sign = -1; sign <= 1; sign += 2) {
      const dx = n[0] * sign;
      const dy = n[1] * sign;
      let cx = x + dx;
      let cy = y + dy;
      if (cx < 0 || cy < 0 || cx > 5 || cy > 6) {
        break;
      }
      const checkPlayer = boardState[cx][cy];
      if (checkPlayer === null) {
        break;
      }
      while (cx > -1 && cy > -1 && cx < 6 && cy < 7) {
        if (boardState[cx][cy] !== checkPlayer) {
          break;
        }
        if (checkPlayer === botPlayerNum) {
          playerOneCount += 1;
        } else {
          playerTwoCount += 1;
        }
        possibleWins = (playerOneCount > 3) ? possibleWins + 1 : possibleWins;
        possibleWins = (playerTwoCount > 3) ? possibleWins - 1 : possibleWins;
        possibleThrees = (playerOneCount > 2) ? possibleThrees + 1 : possibleThrees;
        possibleThrees = (playerTwoCount > 2) ? possibleThrees - 1 : possibleThrees;
        cx += dx;
        cy += dy;
      }
    }
  });
  return (possibleThrees * 2) + (possibleWins * 9);
};

// Evaluate each empty space in board
function evaluateBoard(boardState) {
  let evalScore = 0;
  for (let col = 0; col < COLUMNS; col += 1) {
    let row = 0;
    while (row < ROWS - 1 && boardState[row][col] === null) {
      evalScore += evaluate(boardState, row, col);
      row += 1;
    }
  }
  return evalScore;
}

function botLogic(boardState, depth, maximizingPlayer, currentMove, alpha, beta) {
  // Check for Victor on all nodes except root node
  if (depth > 0 && isVictor(boardState, currentMove.row, currentMove.col)) {
    return maximizingPlayer ? depth - 20 : 20 - depth;
  }

  // Evaluate the board and return an approximate score
  if (depth > DEPTH) {
    return evaluateBoard(boardState);
  }

  let best = maximizingPlayer ? alpha : beta;
  const maximizer = [];
  const possibleMoves = availableMoves(boardState);
  const thisPlayer = maximizingPlayer ? botPlayerNum : (botPlayerNum + 1) % 2;

  for (let i = 0; i < possibleMoves.length; i += 1) {
    const newMove = boardState.map((row, rowNum) => {
      if (rowNum !== possibleMoves[i].row) {
        return row;
      }
      return row.map((value, colNum) => (possibleMoves[i].col === colNum ? thisPlayer : value));
    });

    const val = botLogic(newMove, depth + 1, !maximizingPlayer, possibleMoves[i], alpha, beta);

    if (maximizingPlayer) {
      best = Math.max(best, val);
      alpha = Math.max(best, alpha);
    } else {
      best = Math.min(best, val);
      beta = Math.min(best, beta);
    }

    if (depth === 0) {
      maximizer.push(val);
    }
    if (beta <= alpha) {
      break;
    }
  }
  if (depth === 0) {
    return possibleMoves[maximizer.indexOf(alpha)].col;
  }
  return best;
}



function getMove(moveNo, boardState, row, col, level, currentPlayer) {
  DEPTH = parseInt(level, 10) + 2;
  botPlayerNum = currentPlayer;
  // Not enough moves would have been played to determine if there is an end point or not.
  if (moveNo < 2 && DEPTH) {
    if (moveNo === 0) {
      return 3;
    }
    return (col > 1 && col < 5) ? 3 : 2;
  }
  const move = botLogic(boardState, 0, true, { row, col }, MIN, MAX);
  return move;
}

export default getMove;


