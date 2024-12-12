import React from "react";

const Score = ({ scores }) => {
  return (
    <div className="scoreboard">
      <h2>SCOREBOARD</h2>
      <div className="score">
        Player 1 (X): {scores.X} - {scores.O} Player 2 (O)
      </div>
    </div>
  );
};

export default Score;