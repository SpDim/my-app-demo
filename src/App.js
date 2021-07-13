import React, { useReducer } from 'react';
import Game from './components/game'
import calculateWinner from './libraries/ticTacToe';
import { reducer, initialState } from './models/ticTacToe/reducer';

function App() {
  const [state, dispatch] = useReducer(reducer, initialState); 
  const play = (i) => dispatch({ type: 'PLAY', payload: { i } });
  const jumpTo = (step) => dispatch({ type: 'JUMP_TO', payload: { step } });
  
  const current = state.history[state.stepNumber]; 
  const winner = calculateWinner(current.squares);
  const status = 
    winner
    ? 'Winner: ' + winner
    : 'Next player: ' + (state.xIsNext ? 'X' : 'O');

  return (
      <Game 
          play={play}
          jumpTo={jumpTo}
          status={status}
          history={state.history}
      />   
  );
}

export default App;