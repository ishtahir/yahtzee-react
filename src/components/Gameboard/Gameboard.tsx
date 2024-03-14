import { useEffect, useRef, useState } from "react";

import useDiceStore from "../../stores/useDiceStore";
import useLeaderboardStore from "../../stores/useLeaderboardStore";

import DiceRow from "../DiceRow/DiceRow";
import ScoreCard from "../ScoreCard/ScoreCard";
import Leaderboard from "../Leaderboard/Leaderboard";

import { random } from "lodash";

const Gameboard = () => {
  const diceRow = useDiceStore((state) => state.diceRow);
  const gameOver = useDiceStore((state) => state.gameOver);
  const totalScore = useDiceStore((state) => state.totalScore);
  const resetGame = useDiceStore((state) => state.resetGame);
  const setDiceRow = useDiceStore((state) => state.setDiceRow);
  const setGameOver = useDiceStore((state) => state.setGameOver);

  const leaderboard = useLeaderboardStore((state) => state.leaderboard);
  const setLeaderboard = useLeaderboardStore((state) => state.setLeaderboard);

  const [rollsLeft, setRollsLeft] = useState(2);

  const roundsRef = useRef<number>(0);
  const scoreEntered = useRef<boolean>(false);

  const totalRounds = 13;

  const rollActiveDice = () => {
    const dice = diceRow.map((die) => {
      if (!die.locked) die.value = random(1, 6);
      return die;
    });

    setDiceRow(dice);
  };

  const resetDice = () => {
    const newDice = diceRow.map((die) => {
      die.value = random(1, 6);
      die.locked = false;
      return die;
    });

    setDiceRow(newDice);
  };

  const lockAllDice = () => {
    const dice = diceRow.map((die) => {
      die.locked = true;
      return die;
    });
    setDiceRow(dice);
  };

  const handleTakeTurn = (reset: boolean = false) => {
    if (gameOver) return;

    if (reset) {
      roundsRef.current++;
      roundsRef.current < totalRounds ? resetDice() : lockAllDice();
    } else {
      rollActiveDice();
    }
    setRollsLeft((prev) => prev - 1);
  };

  const startNewGame = () => {
    resetGame();
    setRollsLeft(2);
    roundsRef.current = 0;
    scoreEntered.current = false;
  };

  const addToLeaderboard = () => {
    if (scoreEntered.current) return;

    const name = prompt("Enter your name")?.toLocaleLowerCase() ?? "N/A";
    const titleCase = name.charAt(0).toUpperCase() + name?.slice(1);
    const sortedLeaders = [
      ...leaderboard,
      { name: titleCase, score: totalScore, date: new Date() },
    ].sort((a, b) => b.score - a.score);
    if (sortedLeaders.length > 10) sortedLeaders.length = 10;
    setLeaderboard(sortedLeaders);
    scoreEntered.current = true;
  };

  const disableButton =
    gameOver || diceRow.every((die) => die.locked) || rollsLeft === 0;

  useEffect(() => {
    if (roundsRef.current === totalRounds) {
      setGameOver(true);
    }
  }, [roundsRef.current]);

  useEffect(() => {
    if (gameOver) {
      setTimeout(addToLeaderboard, 500);
    }
  }, [gameOver]);

  return (
    <div className="gameboard">
      <DiceRow />
      {gameOver ? (
        <button
          className="roll-btn"
          data-testid="gameboard-new-game-button"
          onClick={startNewGame}
        >
          Start new game
        </button>
      ) : (
        <button
          disabled={disableButton}
          data-testid="gameboard-rolls-left-button"
          onClick={() => handleTakeTurn()}
          className="roll-btn"
        >
          {rollsLeft} {rollsLeft === 1 ? "roll" : "rolls"} left
        </button>
      )}
      <div className="row">
        <ScoreCard
          handleTakeTurn={handleTakeTurn}
          setRollsLeft={setRollsLeft}
        />
        {leaderboard.length > 0 && <Leaderboard />}
      </div>
    </div>
  );
};

export default Gameboard;
