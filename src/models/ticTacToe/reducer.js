import calculateWinner from "../../libraries/ticTacToe";
import { play, jumpTo, setPlayer } from "./actions";

const initialState = {
    history: [{squares: Array(9).fill(null)}], 
    stepNumber: 0, 
    xIsNext: true,
    status: 'Next player: X',
    winner: null,
    players: {
        player1: '',
        player2: ''
    }
  };
  
function reducer(state = initialState, action) {
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
        // const status = 
        //     winner
        //     ? 'Winner: ' + winner
        //     : 'Next player: ' + (!state.xIsNext ? 'X' : 'O');
        const status = (() => {
            let result = '';
            // console.log('HISTORY', history);
            if(winner || history.length === 10 ) {
              result = 'Winner: ';

              if(winner === 'X') {
                result += state.players.player1
              } else if (winner === 'O') {
                result += state.players.player2
              } else {
                result = 'Draw';
              }

              return result;
            } else 
              return 'Next player: ' + (state.xIsNext ? state.players.player1 + '(X)' : state.players.player2 + '(O)')
          })();        
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
    case setPlayer.type:
        const playerName = action.payload.name;
        const playerKey = action.payload.key;
        return {
            ...state,
            players: {
                ...state.players,
                [playerKey]: playerName
            }
        }
    
    default: 
        return state;
    }
}

export { 
    reducer, 
    initialState, 
};