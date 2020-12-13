export const transformGridIntoRows = (grid: number[]) => {
  const arrays: number[][] = [];

  while (grid.length > 0) {
    arrays.push(grid.splice(0, 4));
  }

  return arrays;
};

export const transformGridIntoColumns = (grid: number[]) => {
  const rowArr: number[][] = [];
  const firstCol: number[] = [];
  const secondCol: number[] = [];
  const thirdCol: number[] = [];
  const fourthCol: number[] = [];

  grid.forEach((item, i) => {
    if (i % 4 === 0) {
      firstCol.push(grid[i]);
      secondCol.push(grid[i + 1]);
      thirdCol.push(grid[i + 2]);
      fourthCol.push(grid[i + 3]);
    }
    if (i === 15) {
      rowArr.push(firstCol, secondCol, thirdCol, fourthCol);
    }
  });

  return rowArr;
};
