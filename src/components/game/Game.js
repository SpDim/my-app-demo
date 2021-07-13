import React from 'react';
import Board from '../board';

import './game.css';

function Game({play, jumpTo, history, status}) {
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
          <Board 
            squares={history[history.length - 1].squares}
            play={play}
          />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <ol>{moves}</ol>
        </div>
      </div>
    );
  }

  export default Game;