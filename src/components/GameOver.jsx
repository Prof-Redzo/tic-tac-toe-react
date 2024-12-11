
const GameOver = ({ winner, playAgain }) => (
  
  <div className="game-over">
    <h2>Game Over</h2>
    {winner === "DRAW" ? (
      <h2>It's a draw!</h2>
    ) : (
      <h2>
        Winner: <b>{winner}</b>
      </h2>
    )}
    <button className="play-again-button" onClick={playAgain}>
      Play Again
    </button>
  </div>
);

export default GameOver;