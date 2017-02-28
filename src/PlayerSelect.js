import React, { PropTypes } from 'react';
import { BOT, HUMAN } from './constants/PlayerTypes';

const LEVELS = [1, 2, 3, 4, 5];

const PlayerSelect = ({ player, onChange }) => (
  <div>
    <select
      value={player.type}
      onChange={e => onChange(Object.assign({}, player, { type: e.target.value }))}
    >
      <option value={BOT}>Bot</option>
      <option value={HUMAN}>Human</option>
    </select>

    { player.type === BOT && (
      <div>
        Choose Bot Level:
        <select
          value={player.level}
          onChange={e => onChange(Object.assign({}, player, { level: e.target.value }))}
        >
          { LEVELS.map(level => <option key={level} value={level}>Level {level}</option>) }
        </select>
      </div>
    )
    }

    {
      player.type === HUMAN && (
        <div>
          Enter player name:
          <input
            type="text"
            defaultValue={player.name}
            onChange={e => onChange(Object.assign({}, player, { name: e.target.value }))}
          />
        </div>
      )
    }
  </div>
);

PlayerSelect.propTypes = {
  player: PropTypes.objectOf(PropTypes.string).isRequired,
  onChange: PropTypes.func.isRequired,
};

export default PlayerSelect;

