import ActionTypes from '../constants/ActionTypes';

const startGame = players => ({
  type: ActionTypes.START_GAME,
  payload: players,
});

export default startGame;
