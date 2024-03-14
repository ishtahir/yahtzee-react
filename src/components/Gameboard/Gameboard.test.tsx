import { describe, it, expect } from "@jest/globals";
import { fireEvent, render, screen } from "@testing-library/react";
// import { isEqual } from "lodash";
import useDiceStore from "../../stores/useDiceStore";

import Gameboard from "./Gameboard";

const mockResetGame = jest.fn();
const mockSetDiceRow = jest.fn();
const mockSetGameOver = jest.fn();

const mockDiceRow = [
  { value: 1, locked: false },
  { value: 2, locked: true },
  { value: 3, locked: false },
  { value: 4, locked: true },
  { value: 5, locked: false },
];

// jest.mock("../../stores/useDiceStore", () => ({
//   __esModule: true,
//   default: jest.fn(),
//   // default: (selector: any) =>
//   //   selector({
//   // diceRow: mockDiceRow,
//   // gameOver: false,
//   // totalScore: 0,
//   // upperScores: {
//   //   ones: { score: 0, touched: false },
//   //   twos: { score: 0, touched: false },
//   //   threes: { score: 0, touched: false },
//   //   fours: { score: 0, touched: false },
//   //   fives: { score: 0, touched: false },
//   //   sixes: { score: 0, touched: false },
//   // },
//   // lowerScores: {
//   //   "three of a kind": { score: 0, touched: false },
//   //   "four of a kind": { score: 0, touched: false },
//   //   "full house": { score: 0, touched: false },
//   //   "small straight": { score: 0, touched: false },
//   //   "large straight": { score: 0, touched: false },
//   //   chance: { score: 0, touched: false },
//   //   yahtzee: { score: 0, touched: false },
//   // },
//   // resetGame: mockResetGame,
//   // setDiceRow: mockSetDiceRow,
//   // setGameOver: mockSetGameOver,
//   //   }),
// }));

jest.mock("../../stores/useDiceStore", () => ({
  __esModule: true,
  default: jest.fn().mockImplementation(() => ({
    diceRow: mockDiceRow,
    setDiceRow: mockSetDiceRow,
  })),
}));

// jest.mock("../../stores/useDiceStore", () => jest.fn());

describe("Gameboard", () => {
  beforeEach(() => {
    jest
      .spyOn(useDiceStore, "setDiceRow")
      .mockReturnValue({ diceRow: mockDiceRow });
    render(<Gameboard />);
  });

  afterEach(() => jest.clearAllMocks());

  it("should render Gameboard", () => {
    expect(screen).toBeTruthy();
  });

  it("should show the DiceRow", () => {
    const { container } = render(<Gameboard />);
    const el = container.firstChild as HTMLElement;

    expect(el.children[0]).toHaveClass("dice-row");
  });

  it("should show the rolls left button", () => {
    const btn = screen.getByTestId("gameboard-rolls-left-button");

    expect(btn).toBeTruthy();
    expect(btn).toHaveClass("roll-btn");
  });

  // it.skip("should press rolls left button and get new dice values", () => {
  //   const btn = screen.getByTestId("gameboard-rolls-left-button");

  //   const diceBefore = screen
  //     .queryAllByTestId("dice")
  //     .map((dice) => dice.textContent);
  //   // const diceBefore = jest.fn().mockReturnValue({
  //   //   diceRow: [
  //   //     { value: 1, locked: false },
  //   //     { value: 2, locked: false },
  //   //     { value: 3, locked: false },
  //   //     { value: 4, locked: false },
  //   //     { value: 5, locked: false },
  //   //   ],
  //   // });jest

  //   fireEvent.click(btn);

  //   // const diceAfter = jest.fn().mockReturnValue({
  //   //   diceRow: [
  //   //     { value: 5, locked: false },
  //   //     { value: 4, locked: false },
  //   //     { value: 3, locked: false },
  //   //     { value: 2, locked: false },
  //   //     { value: 1, locked: false },
  //   //   ],
  //   // });

  //   const diceAfter = screen
  //     .queryAllByTestId("dice")
  //     .map((dice) => dice.textContent);

  //   expect(isEqual(diceBefore, diceAfter)).toBe(false);
  // });

  it("should update the rolls left button value after it's clicked", () => {
    const btn = screen.getByTestId("gameboard-rolls-left-button");

    expect(btn.textContent).toBe("2 rolls left");

    fireEvent.click(btn);

    expect(btn.textContent).toBe("1 roll left");
  });

  it("should show the score card", () => {
    const scoreCard = screen.getByText("Yahtzee Score Card");

    expect(scoreCard).toBeTruthy();
    expect(scoreCard.parentElement).toHaveClass("score-card");
    expect(scoreCard.parentElement?.children).toHaveLength(16);
  });

  it("should not change die if it is locked", () => {
    const btn = screen.getByTestId("gameboard-rolls-left-button");
    const dice = screen.queryAllByTestId("dice");
    const index = 2;

    expect(dice).toBeTruthy();
    expect(btn).toBeTruthy();
    expect(dice).toHaveLength(5);

    fireEvent.click(dice[index]);

    expect(dice[index]).toHaveClass("locked");
    expect(dice[index + 1]).not.toHaveClass("locked");

    for (let i = 0; i < 10; i++) {
      const diceBefore = dice.map((die) => die.textContent);

      fireEvent.click(btn);

      const diceAfter = dice.map((die) => die.textContent);
      expect(diceBefore[index]).toBe(diceAfter[index]);
    }
  });

  it("should not continue if game is over", () => {
    const btn = screen.getByTestId("gameboard-rolls-left-button");
    const dice = screen.queryAllByTestId("dice");
    useDiceStore.mockReturnValue({ gameOver: true });
    const allDiceLocked = dice.every((die) => die.classList.contains("locked"));
    expect(allDiceLocked).toBe(true);
  });
});
