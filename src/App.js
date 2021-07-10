import React, { useReducer } from 'react';
import Game from './components/game'
import calculateWinner from './libraries/ticTacToe';

function App(props) {
  // const [history, setHistory] = useState([{squares: Array(9).fill(null)}]);
  // const [stepNumber, setStepNumber] = useState(0);
  // const [xIsNext, setXisNext] = useState(true);

  const initialState = {
    history: [{squares: Array(9).fill(null)}], 
    stepNumber: 0, 
    xIsNext: true
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  function reducer(state, action) {
    // ....
  }
  
  const play = (i) => {
    const nHistory = [...history]; 
    const current = nHistory[nHistory.length - 1];
    const squares = current.squares.slice();
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = xIsNext ? 'X' : 'O';
    setHistory(nHistory.concat([{ squares }]));
    setStepNumber(nHistory.length);
    setXisNext(!xIsNext);
  }
  
  const jumpTo = (step) => {
    setStepNumber(step);
    setXisNext((step % 2) === 0);
  }

  const current = history[stepNumber]; 
  const winner = calculateWinner(current.squares);
  const status = 
    winner
    ? 'Winner: ' + winner
    : 'Next player: ' + (xIsNext ? 'X' : 'O');

  return (
      <Game 
          play={play}
          jumpTo={jumpTo}
          status={status}
          history={history}
      />   
  );
}

export default App;