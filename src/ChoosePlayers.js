import React, { Component, PropTypes } from 'react';

import { HUMAN } from './constants/PlayerTypes';
import PlayerSelect from './PlayerSelect';


class ChoosePlayers extends Component {
  static propTypes = {
    onChosen: PropTypes.func.isRequired,
  };

  state = {
    playerOne: {
      type: HUMAN,
      name: 'Player 1',
      level: '1',
    },
    playerTwo: {
      type: HUMAN,
      name: 'Player 2',
      level: '1',
    },
  }

  render() {
    const { onChosen } = this.props;
    const state = this.state;
    return (
      <div>
        <div className="choosePlayerScreen">
          <p className="welcomeTitle">Welcome to Connect-4!</p>
        </div>
        <div className="choosePlayerScreen">
          <PlayerSelect
            player={state.playerOne}
            onChange={player => this.setState({ playerOne: player })}
          />
        </div>
        <div className="choosePlayerScreen">
          <PlayerSelect
            player={state.playerTwo}
            onChange={player => this.setState({ playerTwo: player })}
          />
        </div>
        <div className="choosePlayerScreen">
          <button onClick={() => onChosen(state)} >
            START GAME
          </button>
        </div>
      </div>
    );
  }
}

export default ChoosePlayers;
