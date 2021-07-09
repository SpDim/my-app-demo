import './square.css';

const Square = ({value, play}) => (
    <button className="square" onClick={play}>
        {value}
    </button>
);

export default Square;