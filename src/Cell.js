import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

import dropDisc from './actions/dropDisc';

import { CELL_SIZE } from './constants/BoardSize';
import { INNER_BOARD, OUTER_BOARD } from '../src/constants/Colors';


const Cell = ({ rowNumber, colNumber, placeDisk, type, active, createHint }) => (
  <svg
    x={(colNumber * CELL_SIZE) - (type === 'background' ? 3 : 0)}
    y={(rowNumber * CELL_SIZE) - (type === 'background' ? 5 : 0)}
    onClick={() => active && placeDisk(colNumber)}
    onMouseOver={() => createHint(colNumber)}
    width={CELL_SIZE}
    height={CELL_SIZE}
  >
    <rect
      width="100%"
      height="100%"
      fill={type === 'background' ? INNER_BOARD : OUTER_BOARD}
      mask="url(#cutCircle)"
    />
  </svg>
);

Cell.propTypes = {
  colNumber: PropTypes.number.isRequired,
  rowNumber: PropTypes.number.isRequired,
  placeDisk: PropTypes.func.isRequired,
  type: PropTypes.string,
  active: PropTypes.bool.isRequired,
  createHint: PropTypes.func.isRequired,
};

const mapDispatchToProps = dispatch => ({
  placeDisk: column => dispatch(dropDisc(column)),
});

const mapStateToProps = state => ({
  players: state.players,
  currentPlayer: state.currentPlayer,
});


export default connect(mapStateToProps, mapDispatchToProps)(Cell);
