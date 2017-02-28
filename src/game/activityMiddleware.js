import ActionTypes from '../constants/ActionTypes';

const middleware = ({ getState, dispatch }) => next => (action) => {

  next(action);

  const state = getState();

  setTimeout(() => {
    if (action.type === ActionTypes.PLACE_PLAYER && state.victor === null) {
      state.players[state.currentPlayer].onMyTurn(state.moveNo, state.boardState, dispatch,
      action.payload.row, action.payload.col, state.currentPlayer);
    } else if (action.type === ActionTypes.START_GAME) {
      state.players[state.currentPlayer].onMyTurn(state.boardState, dispatch);
    }
  }, 0);
};

export default middleware;
