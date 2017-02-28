import ActionTypes from '../constants/ActionTypes';

const dropDisc = column => (dispatch, getState) => {
  const spaces = getState().boardState;
  for (let rowNum = spaces.length - 1; rowNum >= 0; rowNum -= 1) {
    const row = spaces[rowNum];
    if (row[column] === null) {
      return dispatch({
        type: ActionTypes.PLACE_PLAYER,
        payload: {
          row: rowNum,
          col: column,
        },
      });
    }
  }
};

export default dropDisc;
