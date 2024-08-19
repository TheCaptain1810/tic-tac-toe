/* eslint-disable react/prop-types */

export default function Square(props) {

  const { value, onSquareClick } = props;

  return (
    <button 
        className="w-16 h-16 text-3xl border flex items-center justify-center md:w-28 md:h-28 font-bold md:text-5xl cursor-pointer"
        onClick={onSquareClick}
    >
        {value}
    </button>
  )
}
