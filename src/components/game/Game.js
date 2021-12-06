import React, { useState, useContext, useEffect } from 'react';
import { connect } from 'react-redux';
import Board from '../board';
import { GameContext } from '../GameContext';
import { play, jumpTo, setPlayer } from '../../models/ticTacToe/actions';
import { store } from '../../redux/store';
import calculateWinner from '../../libraries/ticTacToe';

import './game.css';

/*
 1. Arxika o player1 na pairn timh apo to API https://jsonplaceholder.typicode.com/users/1
 2. Arxika o player2 na pairn timh apo to API https://jsonplaceholder.typicode.com/users/2
 3. oi players na ginoun kommati tou redux state, kai h setPlayers na ginei ena action gia to redux
*/

function Game({ history, jumpTo, winner, xIsNext, setPlayer, players, status }) {
  // const [players, setPlayers] = useState({
  //   player1: '',
  //   player2: ''
  // });

  // useEffect(() => {
  //   const response1 = async fetch(users/1)
  //   setPlayers({
  //     players, player1: response1.name
  //   })

  //   const response1 = async fetch(users/2)
  //   setPlayers({
  //     players, player2: response2.name
  //   })
  // }, [])

  const fetchUsers = async (userIndex) => {
    // setLoaderCounter(loaderCounter + 1);
    try {
      const data = await fetch(`https://jsonplaceholder.typicode.com/users/${userIndex}`);
      const jsonData = await data.json();
      setPlayer({
        name: jsonData.name,
        key: `player${userIndex}`
      });
      //  setLoaderCounter( loaderCounter => loaderCounter - 1);
    } catch (error) {
        console.log(error);
      // setLoaderCounter( loaderCounter => loaderCounter - 1);
    }
  };

  useEffect(() => {
    fetchUsers(1);
    fetchUsers(2);
  }, [])

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

  const onChangePlayer = (event, playerKey) => {
    if(history.length === 1) {
      setPlayer({
        name: event.target.value,
        key: playerKey
      });
    }
    // const newVal = event.target.value;
    //  // setPlayers(playerKey, newVal);
    // setPlayers( (players) => {
    //   return {
    //     ...players,
    //     [playerKey]: newVal
    //   }  
    // })
  };

  

  return (
    <>
      <input
        type='text' 
        value={players.player1} 
        onChange={(e) => onChangePlayer(e, 'player1')}
      />
      <input 
        type='text' 
        value={players.player2}
        onChange={(e) => onChangePlayer(e, 'player2')}
      /><br/>

      <div className="game">
        <div className="game-board">
          <Board />
        </div>

        <div className="game-info">
          <div>
            {
              // (() => {
              //   let result = '';
              //   console.log('HISTORY', history);
              //   if(winner || history.length === 10 ) {
              //     result = 'Winner: ';

              //     if(winner === 'X') {
              //       result += players.player1
              //     } else if (winner === 'O') {
              //       result += players.player2
              //     } else {
              //       result = 'Draw';
              //     }

              //     return result;
              //   } else 
              //     return 'Next player: ' + (xIsNext ? players.player1 + '(X)' : players.player2 + '(O)')
              // })() 

              status

            // winner
            //   ? 'Winner: ' + 
            //     winner === 'X' 
            //       ? players.player1 
            //         : winner === 'O' 
            //           ? players.player2 
            //             : '-' 
            //   : 'Next player: ' + (xIsNext ? players.player1 + '(X)' : players.player2 + '(O)')
            }
          </div>
          <ol>{moves}</ol>
        </div>
      </div>
    </>
  );
};

const mapStateToProps = (state, ownProps) => {
  const stepNumber = state.stepNumber;
  const history = state.history[stepNumber];
  const squares = history?.squares;
  const winner = calculateWinner(squares);
  const players = state.players;
  const status = state.status;
  // const status =             
  //   winner
  //   ? 'Winner: ' + winner
  //   : 'Next player: ' + (state.xIsNext ? 'X' : 'O')
  return {
    history: state.history,
    winner,
    xIsNext: state.xIsNext,
    players,
    status,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    play: i => dispatch(play({ i })),
    jumpTo: step => dispatch(jumpTo({ step })),
    setPlayer: (payload) => dispatch(setPlayer(payload)),
  };
};

// const GameContainer = props => {
//   const { history, jumpTo, play, status } = useContext(GameContext);
//   return <Game history={history} jumpTo={jumpTo} play={play} status={status} />
// }

export default connect(
  mapStateToProps, 
  mapDispatchToProps,
)(Game);