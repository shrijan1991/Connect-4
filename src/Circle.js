import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { CELL_SIZE } from './constants/BoardSize';


const Circle = ({ rowNumber, colNumber, color, hint, isWinningPiece }) => {
  const animation = 'discDrop'.concat(rowNumber);
  const animationStyle = hint ? { opacity: '0.65' } : {
    animationName: animation,
    animationTimingFunction: 'ease-in',
    animationDuration: '0.3s',
  };
  return (
    <g>
      <circle
        cx={(colNumber * CELL_SIZE) + (CELL_SIZE / 2)}
        cy={(rowNumber * CELL_SIZE) + (CELL_SIZE / 2)}
        r={CELL_SIZE / 2}
        fill={color}
        style={animationStyle}
      />

      {isWinningPiece && (
        <circle
          cx={(colNumber * CELL_SIZE) + (CELL_SIZE / 2)}
          cy={(rowNumber * CELL_SIZE) + (CELL_SIZE / 2)}
          r={CELL_SIZE / 2}
          fill="White"
          className="blink"
        />
        )
      }
    </g>
  );
};

Circle.propTypes = {
  color: PropTypes.string.isRequired,
  colNumber: PropTypes.number.isRequired,
  rowNumber: PropTypes.number.isRequired,
  hint: PropTypes.bool.isRequired,
  isWinningPiece: PropTypes.arrayOf(PropTypes.number),
};

const mapStateToProps = (state, ownProps) => ({
  isWinningPiece: state.victor && state.victor.winningPieces.find(loc => (
    loc[0] === ownProps.rowNumber && loc[1] === ownProps.colNumber
  )),
});
export default connect(mapStateToProps, null)(Circle);
