import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import Cell from './Cell';
import Circle from './Circle';
import startGame from './actions/startGame';
import { ROWS, COLUMNS, CELL_SIZE } from './constants/BoardSize';
import { HUMAN } from './constants/PlayerTypes';

const hintedRow = (boardState, col) => {
  let row = ROWS - 1;
  while (boardState[row][col] !== null && row > -1) {
    row -= 1;
  }
  return row;
};

const isHintCell = (hintCell, row, col) => (
                hintCell.hintRow === row &&
                hintCell.hintCol === col &&
                hintCell.hintRow !== -1);

class Board extends Component {
  state = {
    hintRow: 0,
    hintCol: 0,
  }
  render() {
    const { players, boardState, victor, currentPlayer, startNewGame, moveNo } = this.props;
    const isTie = moveNo === (ROWS * COLUMNS);
    const player = players[currentPlayer];
    const winner = victor !== null ? players[victor.winner] : null;
    let playermsg = winner ? `Player ${winner.name} is victorious` :
                               `Player ${player.name}'s turn`;
    const color = winner ? winner.color : player.color;
    if (isTie) {
      playermsg = 'Game is tied!';
    }
    return (
      <div>
        <svg height="720" width="840">

          <defs>
            <mask id="cutCircle">
              <rect
                width={CELL_SIZE}
                height={CELL_SIZE}
                fill="white"
              />
              <circle
                cx={CELL_SIZE / 2}
                cy={CELL_SIZE / 2}
                r={CELL_SIZE * 0.45}
                fill="black"
              />
            </mask>
          </defs>

          {boardState.map((row, rowIndex) => (
            row.map((column, columnIndex) => (
              <Cell
                key={`cellBg_${rowIndex}_${columnIndex}`}
                rowNumber={rowIndex}
                colNumber={columnIndex}
                type="background"
                active={!isTie && victor === null && player.type === HUMAN}
                createHint={col => this.setState({ hintRow: hintedRow(boardState, col), hintCol: col })}
              />
            ))
          ))}

          {boardState.map((row, rowIndex) => (
            row.map((column, columnIndex) => (
              (column !== null || isHintCell(this.state, rowIndex, columnIndex))
              &&
              <Circle
                key={`circle_${rowIndex}_${columnIndex}`}
                rowNumber={rowIndex}
                colNumber={columnIndex}
                color={isHintCell(this.state, rowIndex, columnIndex) ? player.color : players[column].color}
                hint={isHintCell(this.state, rowIndex, columnIndex)}
              />
            ))
          ))}

          {boardState.map((row, rowIndex) => (
            row.map((column, columnIndex) => (
              <Cell
                key={`cell_${rowIndex}_${columnIndex}`}
                rowNumber={rowIndex}
                colNumber={columnIndex}
                active={!isTie && victor === null && player.type === HUMAN}
                createHint={col => this.setState({ hintRow: hintedRow(boardState, col), hintCol: col })}
              />
            ))
          ))}
        </svg>

        <div
          style={{ display: 'inline-block',
            width: '60px',
            height: '720px',
            position: 'absolute',
            left: '850px',
            paddingLeft: '10px',
          }}
        >
          <div>
            <p> {playermsg} </p>
          </div>
          <svg>
            <circle
              cx="20px"
              cy="70px"
              r="20px"
              fill={color}
            />
          </svg>
          <img
            src="../res/restart.png"
            height="40"
            width="40"
            onClick={() => startNewGame(players)}
          />
        </div>
      </div>
    );
  }
}

Board.propTypes = {
  players: PropTypes.arrayOf(PropTypes.object).isRequired,
  boardState: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.number)).isRequired,
  currentPlayer: PropTypes.number.isRequired,
  victor: PropTypes.object,
  startNewGame: PropTypes.func.isRequired,
  moveNo: PropTypes.number.isRequired,
};

const mapStateToProps = state => ({
  players: state.players,
  boardState: state.boardState,
  victor: state.victor,
  currentPlayer: state.currentPlayer,
  moveNo: state.moveNo,
});

const mapDispatchToProps = dispatch => ({
  startNewGame: players => dispatch(startGame(players)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Board);

