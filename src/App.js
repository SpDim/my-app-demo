import React, { useReducer } from 'react';
import Game from './components/game'
import calculateWinner from './libraries/ticTacToe';
import { reducer, initialState } from './models/ticTacToe/reducer';
import { play, jumpTo } from './models/ticTacToe/actions';

function App() {
  const [state, dispatch] = useReducer(reducer, initialState); 
  const current = state.history[state.stepNumber]; 
  const winner = calculateWinner(current.squares);
  const status = 
    winner
    ? 'Winner: ' + winner
    : 'Next player: ' + (state.xIsNext ? 'X' : 'O');

  return (
      <Game 
          play={i => dispatch(play({ i }))}
          jumpTo={step => dispatch(jumpTo({ step }))}
          status={status}
          history={state.history}
      />   
  );
}

export default App;