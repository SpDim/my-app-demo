import calculateWinner from "../../libraries/ticTacToe";
import { play, jumpTo } from "./actions";

const initialState = {
    history: [{squares: Array(9).fill(null)}], 
    stepNumber: 0, 
    xIsNext: true,
    status: 'Next player: X'
  };
  
function reducer(state, action) {
    console.log('inReducer.', action, play.type, action.type, play.type === action.type);
    // const history = [...state.history]; 
    // console.log('history: ' ,history);
    // const current = history[history.length];
    // const winner = calculateWinner(current?.squares);
    // const status = 
    //   winner
    //   ? 'Winner: ' + winner
    //   : 'Next player: ' + (!state.xIsNext ? 'X' : 'O');
    switch (action.type) {
    case play.type: 
        // console.log('play action: ', action);
        console.log('state: ', state);
        // const history = [...state.history]; 
        // const current = history[history.length - 1];
        const i = action.payload.i;
        // console.log(calculateWinner(squares));
        // if (calculateWinner(squares) || squares[i]) {
        //     return state
        // }
        let stepNumber = state.stepNumber;
        const newHistory = [...state?.history];
        const currHist = newHistory[stepNumber];
        const squares = [...currHist?.squares];
        squares[i] = state.xIsNext ? 'X' : 'O';
        return {
            ...state, 
            history: [...state.history].concat([{squares}]),
            xIsNext: !state.xIsNext,
            stepNumber: stepNumber += 1,
            // status
        }  
    case jumpTo.type:
        const step = action.payload.step;
        return {
            ...state,
            history: state.history.slice(0, step + 1),
            stepNumber: step,
            xIsNext: (step % 2) === 0,
            // status
        }
    default: 
        return state;
    }
}

export { 
    reducer, 
    initialState, 
};