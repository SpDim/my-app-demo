import calculateWinner from "../../libraries/ticTacToe";
import { play, jumpTo } from "./actions";

const initialState = {
    history: [{squares: Array(9).fill(null)}], 
    stepNumber: 0, 
    xIsNext: true,
    status: 'Next player: X',
    winner: null
  };
  
function reducer(state, action) {
    console.log('inReducer.', action, play.type, action.type, play.type === action.type);
    // const history = [...state.history]; 
    // console.log('history: ' ,history);
    // const current = history[history.length - 1];
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
        // if (calculateWinner(squares) || squares[i]) {
        //     return state
        // }
        let stepNumber = state.stepNumber;
        const history = [...state.history];
        const currHist = history[stepNumber];
        console.log('currHist: ', currHist);
        const squares = [...currHist.squares];
        const winner = calculateWinner(squares); 
        const status = 
            winner
            ? 'Winner: ' + winner
            : 'Next player: ' + (!state.xIsNext ? 'X' : 'O');        
        if (winner || squares[i]) {    
            // stepNumber += 1;
            console.log('Winner: ', winner);    
            return state
        }
        squares[i] = state.xIsNext ? 'X' : 'O';
        return {
            ...state, 
            history: [...history].concat([{squares}]),
            xIsNext: !state.xIsNext,
            stepNumber: stepNumber += 1,
            status,
            winner: calculateWinner(squares)
        }  
    case jumpTo.type:
        const step = action.payload.step;
        return {
            ...state,
            history: state.history.slice(0, step + 1),
            stepNumber: step,
            xIsNext: (step % 2) === 0,
            // status,
            // winner
        }
    default: 
        return state;
    }
}

export { 
    reducer, 
    initialState, 
};