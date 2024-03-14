import { describe, it, expect } from "@jest/globals";
import { render, screen } from "@testing-library/react";

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
