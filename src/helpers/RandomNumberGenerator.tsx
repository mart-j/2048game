export const randomAvailableNumberGenerator = (grid: number[]) => {
  let availableIndexes: number[] | number[][] = grid.map((num, i) => {
    const indexArr = [];
    if (grid[i] === 0) {
      indexArr.push(i);
    }
    return indexArr;
  });

  availableIndexes = availableIndexes.flat();
  const rndIndex = Math.floor(Math.random() * availableIndexes.length);
  return [availableIndexes[rndIndex]][0];
};
