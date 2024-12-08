import React from "react";

const Score = ({ scores }) => {
  return (
    <div className="scoreboard">
      <h2>Scoreboard</h2>
      <div>Player 1 (X): {scores.X} wins</div>
      <div>Player 2 (O): {scores.O} wins</div>
      <div>Draws: {scores.DRAW}</div>
    </div>
  );
};

export default Score;
