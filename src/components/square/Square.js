import { useContext } from 'react';
import { GameContext } from '../GameContext';
import { connect } from 'react-redux';
import { play, jumpTo } from '../../models/ticTacToe/actions';
import { store } from '../../redux/store';

import './square.css';


const Square = ({ value, play, index }) => (
    <button className="square" onClick={() => play(index)}>
        {value}
    </button>
);

const mapStateToProps = (state, ownProps) => {
    const stepNumber = state.stepNumber;
    const history = state.history[stepNumber];
    const squares = history.squares;
    const currentSquare = squares[ownProps.index];
    // console.log('current: ', currentSquare);
    // console.log('history: ', history);
    console.log('SQUARES: ', squares);
    console.log('stepNumber: ', stepNumber);
    return {
        // squares: state.history[state.history.length - 1].squares
        value: currentSquare,
    };
};


const mapDispatchToProps = (dispatch) => {
    return {
        play: i => dispatch(play({ i }))
    };
};

// const SquareContainer = ({ index }) => {
//     const { history, play } = useContext(GameContext);
//     const squares = history[history.length - 1].squares;
//     return <Square value={squares[index]}  play={() => play(index)}/>
// }

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(Square);