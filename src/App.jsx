/* eslint-disable react/prop-types */
import Square from './components/Square';
import { useState } from 'react';

function Board(props) {
  const { xIsNext, squares, onPlay } = props;

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
    onPlay(newSquares);
  }

  return (
    <div className='flex flex-col gap-5'>
      <h1 className='text-center text-xl md:text-3xl'>{status}</h1>
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

export default function App() {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove];

  const handlePlay = (nextSquares) => {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }

  const jumpTo = (nextMove) => {
    setCurrentMove(nextMove);
  }

  const moves = history.map((squares, move) => {
    let description;
    move > 0 ? (description = "Go to the move #" + move) : (description = "Go to the game start");
    return (
      <li key={move}>
        <button onClick={() => jumpTo(move)} className='p-2 rounded-lg'>{description}</button>
      </li>
    );
  })

  return (
    <div className='min-h-screen flex flex-col items-center'>
      <div className='flex-1 flex flex-col gap-4 md:flex-row items-center mt-2'>
        <div className='md:border-r-2 border-white md:p-12'>
          <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
        </div>
        <div>
          <ol className='flex flex-col gap-1 text-center items-center justify-center'>{moves}</ol>
        </div>
      </div>
      <footer className='mb-8'>
        <a href="https://pranavpise.netlify.app" target='_blank' className='hover:opacity-70 cursor-pointer'>
          &copy;{new Date().getFullYear()} Pranav Pise
        </a>
      </footer>
    </div>
  )
}
