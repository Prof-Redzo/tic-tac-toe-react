
const Board = ({ boardValues, handleFieldClick, gameOver }) => (
  
  <div className="board">
    {boardValues.map((value, index) => (
      <div
        key={index}
        className={`field ${gameOver ? "disabled" : ""}`}
        onClick={() => handleFieldClick(index)}
      >
        {value}
      </div>
    ))}
  </div>
);

export default Board;