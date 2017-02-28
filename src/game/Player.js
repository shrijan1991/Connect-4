import ActionTypes from '../constants/ActionTypes';
import { ROWS, COLUMNS } from '../constants/BoardSize';

class Player {
  constructor(playername, playercolor, playerlevel, playerType) {
    Object.defineProperties(this, {
      name: { value: playername },
      color: { value: playercolor },
      level: { value: playerlevel },
      type: { value: playerType },
    });
  }

  onPlacePlayer(player, row, col) {
    // console.log(`${player.name} placed at ${row}, ${col}`);
  }

  onMyTurn(board, dispatch) {
    //
  }
}

export default Player;
