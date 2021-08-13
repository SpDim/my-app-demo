import React, { useContext } from 'react';
import Board from '../board';
import { GameContext } from '../GameContext';

import './game.css';

function Game({ history, jumpTo, status }) {
  const moves = history.map((step, move) => {
    const desc = move ? 
    'Go to move #' + move : 
    'Go to game start';
    return (
      <li key={move}>
        <button onClick={() => jumpTo(move)}>{desc}</button>
      </li>
    );
  });

  return (
    <div className="game">
      <div className="game-board">
        <Board />
      </div>
      <div className="game-info">
        <div>{status}</div>
        <ol>{moves}</ol>
      </div>
    </div>
  );
}

const GameContainer = props => {
  const { history, jumpTo, play, status } = useContext(GameContext);
  return <Game history={history} jumpTo={jumpTo} play={play} status={status} />
}

export default GameContainer;