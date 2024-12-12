import React from "react";

const Board = ({ boardValues, handleFieldClick }) => {
  return (
    <div className="board">
      {boardValues.map((value, index) => (
        <div className="field" key={index} onClick={() => handleFieldClick(index)}>
          {value}
        </div>
      ))}
    </div>
  );
};

export default Board;
