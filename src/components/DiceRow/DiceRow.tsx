import useDiceStore, { TestID } from "../../stores/useDiceStore";

import Dice from "../Dice/Dice";

type DiceRowProps = {
  rollsLeft: number;
} & TestID;

const DiceRow = ({ rollsLeft, testID }: DiceRowProps) => {
  const diceRow = useDiceStore((state) => state.diceRow);
  const gameOver = useDiceStore((state) => state.gameOver);
  const setDiceRow = useDiceStore((state) => state.setDiceRow);

  const toggleLocked = (ind: number) => {
    const diceCopy = [...diceRow];
    const die = diceCopy[ind];
    die.locked = !die.locked;

    setDiceRow(diceCopy);
  };

  return (
    <div className="dice-row" data-testid={testID}>
      {diceRow.map((die, ind) => (
        <Dice
          key={ind}
          disabled={gameOver || rollsLeft === 0}
          id={ind}
          locked={die.locked}
          testID="dice"
          value={die.value}
          toggleLocked={toggleLocked}
        />
      ))}
    </div>
  );
};

export default DiceRow;
