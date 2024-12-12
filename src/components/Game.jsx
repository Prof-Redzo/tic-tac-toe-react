import React, { useState, useEffect } from "react";
import Score from "./Score";
import Board from "./Board";
import GameOver from "./GameOver";
import { PLAYER } from "../constants";

const Game = () => {
  const [activePlayer, setActivePlayer] = useState(PLAYER.TWO);
  const [boardValues, setBoardValues] = useState(["", "", "", "", "", "", "", "", ""]);
  const [gameOver, setGameOver] = useState(false);
  const [winner, setWinner] = useState("");
  const [scores, setScores] = useState({
    [PLAYER.ONE]: 0,
    [PLAYER.TWO]: 0,
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
      (boardValues[0] && boardValues[1] && boardValues[2] && boardValues[0] === boardValues[1] && boardValues[0] === boardValues[2]) ||
      (boardValues[3] && boardValues[4] && boardValues[5] && boardValues[3] === boardValues[4] && boardValues[3] === boardValues[5]) ||
      (boardValues[6] && boardValues[7] && boardValues[8] && boardValues[6] === boardValues[7] && boardValues[6] === boardValues[8]) ||
      (boardValues[0] && boardValues[3] && boardValues[6] && boardValues[0] === boardValues[3] && boardValues[0] === boardValues[6]) ||
      (boardValues[1] && boardValues[4] && boardValues[7] && boardValues[1] === boardValues[4] && boardValues[1] === boardValues[7]) ||
      (boardValues[2] && boardValues[5] && boardValues[8] && boardValues[2] === boardValues[5] && boardValues[2] === boardValues[8]) ||
      (boardValues[0] && boardValues[4] && boardValues[8] && boardValues[0] === boardValues[4] && boardValues[0] === boardValues[8]) ||
      (boardValues[2] && boardValues[4] && boardValues[6] && boardValues[2] === boardValues[4] && boardValues[2] === boardValues[6])
    ) {
      setGameOver(true);
      setWinner(activePlayer);
      const scoresCopy = { ...scores };
      scoresCopy[activePlayer] += 1;
      setScores(scoresCopy);
    } else if (filledFields.length === 9) {
      setGameOver(true);
      setWinner("DRAW");
    } else {
      setActivePlayer((prevState) => (prevState === PLAYER.ONE ? PLAYER.TWO : PLAYER.ONE));
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
    <>
      <Score scores={scores} />
      <Board boardValues={boardValues} handleFieldClick={handleFieldClick} />
      {gameOver && <GameOver winner={winner} playAgain={playAgain} />}
    </>
  );
};

export default Game;
