import { useRef } from "react";
import { TestID } from "../../stores/useDiceStore";

type DiceProps = {
  disabled: boolean;
  id: number;
  locked: boolean;
  value: number;
  toggleLocked(ind: number): void;
} & TestID;

const Dice = ({
  disabled,
  id,
  locked,
  testID,
  value,
  toggleLocked,
}: DiceProps) => {
  const diceRef = useRef<HTMLDivElement>(null);

  const genColorClass = () => {
    return value === 1
      ? "one"
      : value === 2
      ? "two"
      : value === 3
      ? "three"
      : value === 4
      ? "four"
      : value === 5
      ? "five"
      : "six";
  };

  return (
    <div
      className={
        locked || disabled
          ? "dice locked"
          : `dice ${genColorClass()} jello-horizontal`
      }
      data-testid={testID}
      id={`${id}`}
      ref={diceRef}
      onAnimationEnd={() =>
        diceRef.current?.classList.remove("jello-horizontal")
      }
      onClick={() => !disabled && toggleLocked(id)}
    >
      {value}
    </div>
  );
};

export default Dice;
