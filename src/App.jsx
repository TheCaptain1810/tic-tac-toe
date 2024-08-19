import Square from './components/Square';
import { useState } from 'react';

function App() {

  const [ squares, setSquares ] = useState(Array(9).fill(null));
  const [ xIsNext, setXIsNext ] = useState(true);

  const winner = calculateWinner(squares);
  let status;
  winner ? 
    status = "Winner: " + winner :
    squares.includes(null) ? 
    status = "Next Player: " + (xIsNext ? "X" : "O") :
    status = "It's a draw!";

  const handleClick = (i) => {
    if (squares[i] || winner) return;
    const newSquares = squares.slice();
    xIsNext ? newSquares[i] = "X" : newSquares[i] = "O";
    setSquares(newSquares);
    setXIsNext(!xIsNext);
  }

  return (
    <div className='flex flex-col gap-5 items-center'>
      <div className='flex flex-col gap-5'>
        <h1 className='text-center'>{status}</h1>
        <div className='grid grid-cols-3 w-fit'>
          <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
          <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
          <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
          <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
          <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
          <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
          <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
          <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
          <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
        </div>
      </div>
      <footer>
        <a href="https://pranavpise.netlify.app" target='_blank' className='hover:opacity-70 cursor-pointer'>
          &copy;{new Date().getFullYear()} Pranav Pise
        </a>
      </footer>
    </div>
  )
}

const calculateWinner = (squares) => {
  let lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [0, 1, 2],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; ++i) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

export default App
