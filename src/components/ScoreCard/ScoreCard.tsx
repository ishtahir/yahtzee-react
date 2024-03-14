import { useEffect } from "react";

import useDiceStore from "../../stores/useDiceStore";
import type { Die, TestID } from "../../stores/useDiceStore";

import {
  checkFullHouse,
  checkLargeStraight,
  checkNumOfKind,
  checkSmallStraight,
  sumOfAllDice,
} from "../../utils/helpers";

type ScoreCardProps = {
  handleTakeTurn(reset: boolean): void;
  setRollsLeft(val: number): void;
} & TestID;

const ScoreCard = ({
  testID,
  handleTakeTurn,
  setRollsLeft,
}: ScoreCardProps) => {
  const diceRow = useDiceStore((state) => state.diceRow);
  const gameOver = useDiceStore((state) => state.gameOver);
  const upperScores = useDiceStore((state) => state.upperScores);
  const lowerScores = useDiceStore((state) => state.lowerScores);
  const totalScore = useDiceStore((state) => state.totalScore);
  const setUpperScores = useDiceStore((state) => state.setUpperScores);
  const setLowerScores = useDiceStore((state) => state.setLowerScores);
  const setTotalScore = useDiceStore((state) => state.setTotalScore);

  const calcUpperScores = (num: number) => {
    const scoreCopy = structuredClone(upperScores);
    const vals = diceRow.map((die) => die.value);

    const total = vals.reduce((count, val) => {
      if (val === num) count++;
      return count;
    }, 0);

    if (num === 1) {
      if (scoreCopy.ones.touched) return;
      scoreCopy.ones.score = total * num;
      scoreCopy.ones.touched = true;
    }
    if (num === 2) {
      if (scoreCopy.twos.touched) return;
      scoreCopy.twos.score = total * num;
      scoreCopy.twos.touched = true;
    }
    if (num === 3) {
      if (scoreCopy.threes.touched) return;
      scoreCopy.threes.score = total * num;
      scoreCopy.threes.touched = true;
    }
    if (num === 4) {
      if (scoreCopy.fours.touched) return;
      scoreCopy.fours.score = total * num;
      scoreCopy.fours.touched = true;
    }
    if (num === 5) {
      if (scoreCopy.fives.touched) return;
      scoreCopy.fives.score = total * num;
      scoreCopy.fives.touched = true;
    }
    if (num === 6) {
      if (scoreCopy.sixes.touched) return;
      scoreCopy.sixes.score = total * num;
      scoreCopy.sixes.touched = true;
    }

    setUpperScores(scoreCopy);
    setRollsLeft(3);
    setTotalScore();
    handleTakeTurn(true);
  };

  const calcLowerScores = (rule: string) => {
    const scoreCopy = structuredClone(lowerScores);

    if (scoreCopy[rule as keyof typeof lowerScores].touched) return;

    const diceType = diceRow.reduce((obj: Record<string, number>, die: Die) => {
      Object.hasOwn(obj, die.value) ? obj[die.value]++ : (obj[die.value] = 1);
      return obj;
    }, {});

    if (rule === "three of a kind")
      scoreCopy[rule].score = checkNumOfKind(3, diceType);
    if (rule === "four of a kind")
      scoreCopy[rule].score = checkNumOfKind(4, diceType);
    if (rule === "full house") scoreCopy[rule].score = checkFullHouse(diceType);
    if (rule === "small straight")
      scoreCopy[rule].score = checkSmallStraight(diceType);
    if (rule === "large straight")
      scoreCopy[rule].score = checkLargeStraight(diceType);
    if (rule === "chance") scoreCopy[rule].score = sumOfAllDice(diceType);
    if (rule === "yahtzee") scoreCopy[rule].score = checkNumOfKind(5, diceType);

    scoreCopy[rule as keyof typeof lowerScores].touched = true;

    setLowerScores(scoreCopy);
    setRollsLeft(3);
    setTotalScore();
    handleTakeTurn(true);
  };

  useEffect(() => {
    if (!gameOver) return;
    const upperClone = structuredClone(upperScores);
    const lowerClone = structuredClone(lowerScores);

    for (const key in upperClone) {
      const val = upperClone[key as keyof typeof upperClone];
      val.touched = true;
    }

    for (const key in lowerClone) {
      const val = lowerClone[key as keyof typeof lowerClone];
      val.touched = true;
    }

    setUpperScores(upperClone);
    setLowerScores(lowerClone);
  }, [gameOver]);

  return (
    <div className="score-card" data-testid={testID}>
      <h2>Yahtzee Score Card</h2>
      {Object.entries(upperScores).map(([rule, obj], ind) => (
        <menu
          style={{ cursor: obj.touched ? "not-allowed" : "pointer" }}
          className="rules"
          key={rule}
          onClick={() => calcUpperScores(ind + 1)}
        >
          <li className={obj.touched ? "score-rule" : ""}>
            {rule.toUpperCase()}
          </li>
          <li className="score-points">{obj.touched ? obj.score : "_"}</li>
        </menu>
      ))}
      {Object.entries(lowerScores).map(([rule, obj]) => (
        <menu
          style={{ cursor: obj.touched ? "not-allowed" : "pointer" }}
          className="rules"
          key={rule}
          onClick={() => calcLowerScores(rule)}
        >
          <li className={obj.touched ? "score-rule" : ""}>
            {rule.toUpperCase()}
          </li>
          <li className="score-points">{obj.touched ? obj.score : "_"}</li>
        </menu>
      ))}
      <menu className="rules">
        <li>TOTAL SCORE:</li>
        <li className="total-score">{totalScore}</li>
      </menu>
    </div>
  );
};

export default ScoreCard;
