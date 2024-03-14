import { describe, it, expect } from "@jest/globals";
import { fireEvent, render, screen } from "@testing-library/react";
import { isEqual } from "lodash";

import DiceRow from "./DiceRow";

describe("DiceRow", () => {
  beforeEach(() => render(<DiceRow />));

  it("should render DiceRow", () => {
    expect(screen).toBeTruthy();
  });

  it("should have 5 Dice", () => {
    const dice = screen.queryAllByTestId("dice");
    expect(dice).toHaveLength(5);
  });

  it("should test the toggleLocked function", () => {
    const dice = screen.queryAllByTestId("dice");
    expect(dice).toHaveLength(5);
    const lockedBefore = dice.map((die) => die.classList.contains("locked"));
    fireEvent.click(dice[0]);
    const lockedAfter = dice.map((die) => die.classList.contains("locked"));
    expect(isEqual(lockedBefore, lockedAfter)).toBe(false);
  });
});
