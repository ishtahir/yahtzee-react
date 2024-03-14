import { create } from "zustand";
import { random } from "lodash";

export type Die = {
  locked: boolean;
  value: number;
};

export type Score = {
  score: number;
  touched: boolean;
};

export type Scores = Record<string, Score>;

export type TestID = {
  testID?: string;
};

export function diffNum(num: number = 0) {
  let number = random(1, 6);
  while (number === num) {
    number = random(1, 6);
  }
  return number;
}

type DiceState = {
  diceRow: Die[];
  gameOver: boolean;
  lowerScores: Scores;
  totalScore: number;
  upperScores: Scores;
  resetGame(): void;
  setDiceRow(diceRow: Die[]): void;
  setGameOver(val: boolean): void;
  setLowerScores(scores: Scores): void;
  setTotalScore(): void;
  setUpperScores(scores: Scores): void;
};

function genDiceRow() {
  const diceRowInit = [
    { value: random(1, 6), locked: false },
    { value: random(1, 6), locked: false },
    { value: random(1, 6), locked: false },
    { value: random(1, 6), locked: false },
    { value: random(1, 6), locked: false },
  ];

  return diceRowInit;
}

const lowerScoresInit = {
  "three of a kind": { score: 0, touched: false },
  "four of a kind": { score: 0, touched: false },
  "full house": { score: 0, touched: false },
  "small straight": { score: 0, touched: false },
  "large straight": { score: 0, touched: false },
  chance: { score: 0, touched: false },
  yahtzee: { score: 0, touched: false },
};

const upperScoresInit = {
  ones: { score: 0, touched: false },
  twos: { score: 0, touched: false },
  threes: { score: 0, touched: false },
  fours: { score: 0, touched: false },
  fives: { score: 0, touched: false },
  sixes: { score: 0, touched: false },
};

const useDiceStore = create<DiceState>((set) => ({
  diceRow: genDiceRow(),
  gameOver: false,
  lowerScores: lowerScoresInit,
  totalScore: 0,
  upperScores: upperScoresInit,
  resetGame: () =>
    set({
      diceRow: genDiceRow(),
      gameOver: false,
      lowerScores: structuredClone(lowerScoresInit),
      upperScores: structuredClone(upperScoresInit),
    }),
  setDiceRow: (diceRow) => set({ diceRow }),
  setGameOver: (gameOver) => set({ gameOver }),
  setLowerScores: (scores) => set({ lowerScores: scores }),
  setTotalScore: () =>
    set((state) => {
      const upper = Object.values(state.upperScores);
      const lower = Object.values(state.lowerScores);
      const upperTotal = upper
        .map((val) => val.score)
        .reduce((acc, curr) => acc + curr, 0);
      const lowerTotal = lower
        .map((val) => val.score)
        .reduce((acc, curr) => acc + curr, 0);

      return {
        totalScore: upperTotal + lowerTotal,
      };
    }),
  setUpperScores: (scores) => set({ upperScores: scores }),
}));

export default useDiceStore;
