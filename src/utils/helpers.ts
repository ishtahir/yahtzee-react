// checks for chance
export const sumOfAllDice = (diceType: Record<string, number>) => {
  return Object.entries(diceType)
    .map((entry: [string | number, number]) => {
      entry[0] = Number(entry[0]);
      return entry;
    })
    .reduce((count: number, [key, val]) => {
      count += (key as number) * val;
      return count;
    }, 0);
};

// checks for 3 of kind, 4 of kind, 5 of kind (yahtzee)
export const checkNumOfKind = (
  num: number,
  diceType: Record<string, number>
) => {
  const vals = Object.values(diceType);

  const isNumOfKind = vals.map((val) => val >= num).some((bool) => bool);

  // no match
  if (!isNumOfKind) return 0;
  // yahtzee match (5 in a row)
  if (num === 5) return 50;

  // 3 or 4 of a kind match
  return sumOfAllDice(diceType);
};

export const checkFullHouse = (diceType: Record<string, number>) => {
  const vals = Object.values(diceType);
  if (vals.length === 2 && vals.includes(3) && vals.includes(2)) {
    return 25;
  }
  return 0;
};

export const checkSmallStraight = (diceType: Record<string, number>) => {
  const keys = Object.keys(diceType).map(Number);
  const sols = [
    [1, 2, 3, 4],
    [2, 3, 4, 5],
    [3, 4, 5, 6],
  ];

  const result = sols.some((sol) => sol.every((num) => keys.includes(num)));
  return result ? 30 : 0;
};

export const checkLargeStraight = (diceType: Record<string, number>) => {
  const keys = Object.keys(diceType).map(Number);
  const sols = [
    [1, 2, 3, 4, 5],
    [2, 3, 4, 5, 6],
  ];

  const result = sols.some((sol) => sol.every((num) => keys.includes(num)));
  return result ? 40 : 0;
};
