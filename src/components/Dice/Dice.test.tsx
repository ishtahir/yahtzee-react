import { describe, it, expect } from "@jest/globals";
import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

import Dice from "./Dice";

describe("Dice", () => {
  afterEach(() => jest.restoreAllMocks());

  it("should render a Dice", () => {
    render(
      <Dice
        disabled={false}
        id={0}
        locked={false}
        value={3}
        toggleLocked={jest.fn}
      />
    );
    expect(screen).toBeTruthy();
  });

  it("should be disabled", () => {
    const mockToggleLocked = jest.fn();
    const { container } = render(
      <Dice
        disabled={true}
        id={0}
        locked={false}
        value={3}
        toggleLocked={mockToggleLocked}
      />
    );
    const el = container.firstChild as HTMLElement;
    expect(el).toHaveClass("dice");
    expect(mockToggleLocked).toHaveBeenCalledTimes(0);
    fireEvent.click(el);
    expect(mockToggleLocked).toHaveBeenCalledTimes(0);
  });

  it("should be able to be locked", () => {
    const mockToggleLocked = jest.fn();
    const { container, rerender } = render(
      <Dice
        disabled={false}
        id={0}
        locked={false}
        value={3}
        toggleLocked={mockToggleLocked}
      />
    );
    const el = container.firstChild as HTMLElement;
    expect(mockToggleLocked).toHaveBeenCalledTimes(0);
    expect(el).not.toHaveClass("locked");
    fireEvent.click(el);
    rerender(
      <Dice
        disabled={false}
        id={0}
        locked={true}
        value={3}
        toggleLocked={mockToggleLocked}
      />
    );
    expect(mockToggleLocked).toHaveBeenCalledTimes(1);
    expect(el).toHaveClass("locked");
  });

  it("displays value and has given id", () => {
    const { container } = render(
      <Dice
        disabled={false}
        id={0}
        locked={false}
        value={6}
        toggleLocked={jest.fn}
      />
    );
    const el = container.firstChild as HTMLElement;
    expect(el.textContent).toBe("6");
    expect(el.id).toBe("0");
  });

  it("checks for the correct color class", () => {
    render(
      <Dice
        disabled={false}
        id={0}
        locked={false}
        value={3}
        toggleLocked={jest.fn}
      />
    );
    const el = screen.getByText("3");
    expect(el.classList.contains("three")).toBe(true);
    expect(el).toHaveClass("three");
  });

  it("checks if onAnimationEnd callback is fired", () => {
    render(
      <Dice
        disabled={false}
        id={0}
        locked={false}
        testID="dice"
        value={3}
        toggleLocked={jest.fn}
      />
    );
    const dice = screen.getByTestId("dice");
    expect(dice).toHaveClass("jello-horizontal");
    fireEvent.animationEnd(dice);
    expect(dice).not.toHaveClass("jello-horizontal");
  });
});
