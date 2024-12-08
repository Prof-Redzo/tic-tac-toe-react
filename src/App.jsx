import { useEffect, useState } from "react";
import { PLAYER } from "./constants";

import Score from "./components/Score";
import "./App.css";

function App() {
  const [activePlayer, setActivePlayer] = useState(PLAYER.TWO);
  const [boardValues, setBoardValues] = useState([
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
  ]);
  const [gameOver, setGameOver] = useState(false);
  const [winner, setWinner] = useState("");
  const [scores, setScores] = useState({
    [PLAYER.ONE]: 0,
    [PLAYER.TWO]: 0,
    DRAW: 0, // Added to track the number of draws
  });

  const handleFieldClick = (position) => {
    const boardValuesCopy = [...boardValues];
    if (!boardValuesCopy[position] && !gameOver) {
      boardValuesCopy[position] = activePlayer;
      setBoardValues(boardValuesCopy);
    }
  };

  const checkIfGameOver = () => {
    const filledFields = boardValues.filter((value) => value !== "");

    if (
      (boardValues[0] &&
        boardValues[1] &&
        boardValues[2] &&
        boardValues[0] === boardValues[1] &&
        boardValues[0] === boardValues[2]) ||
      (boardValues[3] &&
        boardValues[4] &&
        boardValues[5] &&
        boardValues[3] === boardValues[4] &&
        boardValues[3] === boardValues[5]) ||
      (boardValues[6] &&
        boardValues[7] &&
        boardValues[8] &&
        boardValues[6] === boardValues[7] &&
        boardValues[6] === boardValues[8]) ||
      (boardValues[0] &&
        boardValues[3] &&
        boardValues[6] &&
        boardValues[0] === boardValues[3] &&
        boardValues[0] === boardValues[6]) ||
      (boardValues[1] &&
        boardValues[4] &&
        boardValues[7] &&
        boardValues[1] === boardValues[4] &&
        boardValues[1] === boardValues[7]) ||
      (boardValues[2] &&
        boardValues[5] &&
        boardValues[8] &&
        boardValues[2] === boardValues[5] &&
        boardValues[2] === boardValues[8]) ||
      (boardValues[0] &&
        boardValues[4] &&
        boardValues[8] &&
        boardValues[0] === boardValues[4] &&
        boardValues[0] === boardValues[8]) ||
      (boardValues[2] &&
        boardValues[4] &&
        boardValues[6] &&
        boardValues[2] === boardValues[4] &&
        boardValues[2] === boardValues[6])
    ) {
      setGameOver(true);
      setWinner(activePlayer);

      // Update scores for the winner
      setScores((prevScores) => ({
        ...prevScores,
        [activePlayer]: prevScores[activePlayer] + 1,
      }));
    } else if (filledFields.length === 9) {
      setGameOver(true);
      setWinner("DRAW");

      // Update scores for a draw
      setScores((prevScores) => ({
        ...prevScores,
        DRAW: prevScores.DRAW + 1,
      }));
    } else {
      setActivePlayer((prevState) =>
        prevState === PLAYER.ONE ? PLAYER.TWO : PLAYER.ONE
      );
    }
  };

  useEffect(() => {
    checkIfGameOver();
  }, [boardValues]);

  const playAgain = () => {
    setBoardValues(["", "", "", "", "", "", "", "", ""]);
    setActivePlayer(PLAYER.TWO);
    setGameOver(false);
    setWinner("");
  };

  return (
    <div>
      <Score scores={scores} />
      <h1>Tic Tac Toe</h1>
      <div className="board">
        {boardValues.map((value, index) => (
          <div
            key={index}
            className="field"
            onClick={() => handleFieldClick(index)}
          >
            {value}
          </div>
        ))}
      </div>
      {gameOver && (
        <div>
          <h2>Game over</h2>
          {winner === "DRAW" ? (
            <h2>It's a draw</h2>
          ) : (
            <h2>
              Winner is player: <b>{winner}</b>
            </h2>
          )}
          <button onClick={playAgain}>PLAY AGAIN?</button>
        </div>
      )}
    </div>
  );
}

export default App;
