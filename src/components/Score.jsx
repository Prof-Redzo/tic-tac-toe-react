import { PLAYER } from "../constants";

const Score = ({ scores }) => (
  
  <div className="scoreboard">
    <h2>Scoreboard</h2>
    <div>Player 1 (X): {scores[PLAYER.ONE]} wins</div>
    <div>Player 2 (O): {scores[PLAYER.TWO]} wins</div>
    <div>Draws: {scores.DRAW}</div>
  </div>
);

export default Score;