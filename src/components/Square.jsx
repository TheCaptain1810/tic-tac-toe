/* eslint-disable react/prop-types */

export default function Square(props) {

  const { value, onSquareClick } = props;

  return (
    <button 
        className="border flex items-center justify-center min-w-28 min-h-28 font-bold text-5xl cursor-pointer"
        onClick={onSquareClick}
    >
        {value}
    </button>
  )
}
