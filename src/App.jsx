import { useState, useEffect } from "react";
import { PLAYER } from "./constants";

import Score from "./components/Score";
import Board from "./components/Board";
import GameOver from "./components/GameOver";
import "./App.css";

const Game = () => {
  const [activePlayer, setActivePlayer] = useState(PLAYER.TWO);
  const [boardValues, setBoardValues] = useState(Array(9).fill(""));
  const [gameOver, setGameOver] = useState(false);
  const [winner, setWinner] = useState("");
  const [scores, setScores] = useState({
    [PLAYER.ONE]: 0,
    [PLAYER.TWO]: 0,
    DRAW: 0,
  });

  const handleFieldClick = (position) => {
    if (!boardValues[position] && !gameOver) {
      setBoardValues((prev) => {
        const newBoard = [...prev];
        newBoard[position] = activePlayer;
        return newBoard;
      });
    }
  };

  const checkIfGameOver = () => {
    const winPatterns = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (const [a, b, c] of winPatterns) {
      if (
        boardValues[a] &&
        boardValues[a] === boardValues[b] &&
        boardValues[a] === boardValues[c]
      ) {
        setGameOver(true);
        setWinner(activePlayer);
        setScores((prev) => ({
          ...prev,
          [activePlayer]: prev[activePlayer] + 1,
        }));
        return;
      }
    }

    if (boardValues.every((value) => value !== "")) {
      setGameOver(true);
      setWinner("DRAW");
      setScores((prev) => ({
        ...prev,
        DRAW: prev.DRAW + 1,
      }));
    } else {
      setActivePlayer((prev) => (prev === PLAYER.ONE ? PLAYER.TWO : PLAYER.ONE));
    }
  };

  useEffect(() => {
    checkIfGameOver();
  }, [boardValues]);

  const playAgain = () => {
    setBoardValues(Array(9).fill(""));
    setActivePlayer(PLAYER.TWO);
    setGameOver(false);
    setWinner("");
  };

  return (
    <div className="game-container">
      <Score scores={scores} />
      <h1>Tic Tac Toe</h1>
      <Board
        boardValues={boardValues}
        handleFieldClick={handleFieldClick}
        gameOver={gameOver}
      />
      {gameOver && <GameOver winner={winner} playAgain={playAgain} />}
    </div>
  );
};

export default Game;
