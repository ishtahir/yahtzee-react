import { describe, it, expect } from "@jest/globals";
import { fireEvent, render, screen } from "@testing-library/react";
// import { isEqual } from "lodash";

import ScoreCard from "./ScoreCard";

describe("ScoreCard", () => {
  const mockTakeTurn = jest.fn();
  const mockRollsLeft = jest.fn();

  beforeEach(() =>
    render(
      <ScoreCard handleTakeTurn={mockTakeTurn} setRollsLeft={mockRollsLeft} />
    )
  );

  it("should render ScoreCard", () => {
    expect(screen).toBeTruthy();
  });
});
