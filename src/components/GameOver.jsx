import React from "react";

const GameOver = ({ winner, playAgain }) => {
  return (
    <div>
      <h2>Game Over</h2>
      {winner === "DRAW" ? <h2>It's a draw!</h2> : <h2>Winner is: <b>{winner}</b></h2>}
      <button className="play-again-button" onClick={playAgain}>
        Play Again
      </button>
    </div>
  );
};

export default GameOver;
