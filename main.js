import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import Player from './src/game/Player';
import Bot from './src/game/Bot';

import Board from './src/Board';
import ChoosePlayers from './src/ChoosePlayers';

import startGame from './src/actions/startGame';
import store from './src/game/configureStore';

import { BOT, HUMAN } from './src/constants/PlayerTypes';
import { PLAYER_ONE_COLOR, PLAYER_TWO_COLOR } from './src/constants/Colors';


const validate = (player1info, player2info) => {
  let valid = true;
  if (player1info.type === BOT && player2info.type === BOT) {
    alert('Both Players cannot be bots.');
    valid = false;
  } else if (player1info.type === HUMAN && player1info.name === '') {
    alert('Please enter a legitimate name for Player 1.');
    valid = false;
  } else if (player2info.type === HUMAN && player2info.name === '') {
    alert('Please enter a legitimate name for Player 2.');
    valid = false;
  }
  return valid;
};

class Main extends Component {
  state = {
    screen: 'home',
    players: [],
  };

  startGame = (playerInformation) => {
    const player1info = playerInformation.playerOne;
    const player2info = playerInformation.playerTwo;

    if (!validate(player1info, player2info)) {
      return;
    }

    const player1 = player1info.type === HUMAN ?
    new Player(player1info.name, PLAYER_ONE_COLOR, 0, HUMAN) :
    new Bot(`Level ${player1info.level} BOT`, PLAYER_ONE_COLOR, player1info.level, BOT);

    const player2 = player2info.type === HUMAN ?
    new Player(player2info.name, PLAYER_TWO_COLOR, 0, HUMAN) :
    new Bot(`Level ${player2info.level} BOT`, PLAYER_TWO_COLOR, player2info.level, BOT);

    store.dispatch(startGame([
      player1,
      player2,
    ]));

    this.setState({
      screen: 'game',
    });
  }

  render() {
    const { screen } = this.state;

    return (
      <Provider store={store}>
        <div>
          { screen === 'home' && <ChoosePlayers onChosen={this.startGame} />}
          { screen === 'game' && <Board /> }
        </div>
      </Provider>
    );
  }
}

ReactDOM.render(<Main />, document.getElementById('root'));
