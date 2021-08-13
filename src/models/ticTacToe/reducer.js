import calculateWinner from "../../libraries/ticTacToe";
import { play, jumpTo } from "./actions";

const initialState = {
    history: [{squares: Array(9).fill(null)}], 
    stepNumber: 0, 
    xIsNext: true,
  };
  
function reducer(state, action) {
    console.log('inReducer.', action, play.type, action.type, play.type === action.type);
    switch (action.type) {
    case play.type: 
        console.log('action: ', action);
        console.log('state: ', state);
        const history = [...state.history]; 
        const current = history[history.length - 1];
        const squares = current.squares.slice();
        const i = action.payload.i;
        if (calculateWinner(squares) || squares[i]) {
            return state;
        }
        squares[i] = state.xIsNext ? 'X' : 'O';
        return {
            ...state, 
            history: history.concat([{squares}]),
            xIsNext: !state.xIsNext,
            stepNumber: history.length,
        }  
    case jumpTo.type:
        const step = action.payload.step;
        return {
            ...state,
            history: state.history.slice(0, step + 1),
            stepNumber: step,
            xIsNext: (step % 2) === 0,
        }
    default: 
        return state;
    }
}

export { 
    reducer, 
    initialState, 
};