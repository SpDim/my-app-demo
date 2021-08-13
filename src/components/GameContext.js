import React, { useReducer, createContext } from 'react';
import calculateWinner from '../libraries/ticTacToe'
import { reducer, initialState } from '../models/ticTacToe/reducer';
import { play, jumpTo } from '../models/ticTacToe/actions';

export const GameContext = createContext(); 

export const GameProvider = props => {
    const [state, dispatch] = useReducer(reducer, initialState); 
    const current = state.history[state.stepNumber]; 
    const winner = calculateWinner(current.squares);
    const status = 
      winner
      ? 'Winner: ' + winner
      : 'Next player: ' + (state.xIsNext ? 'X' : 'O');
    const obj = {
      state: state, 
      history: state.history,
      status: status,
      play: i => dispatch(play({ i })),
      jumpTo: step => dispatch(jumpTo({ step })),
    }    
    return (
      <GameContext.Provider value={obj}>
        {props.children}
      </GameContext.Provider>
    );
}