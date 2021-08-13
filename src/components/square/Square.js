import { useContext } from 'react';
import './square.css';
import { GameContext } from '../GameContext';

const Square = ({ value, play }) => (
    <button className="square" onClick={play}>
        {value}
    </button>
);

const SquareContainer = ({ index }) => {
    const { history, play } = useContext(GameContext);
    const squares = history[history.length - 1].squares;
    return <Square value={squares[index]}  play={() => play(index)}/>
}

export default SquareContainer;