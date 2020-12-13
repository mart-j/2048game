/* eslint-disable no-param-reassign */
export const transformGridIntoRows = (grid: number[]) => {
  let arrays: number[][] = [];
  // split in 4 rows
  while (grid.length > 0) {
    arrays.push(grid.splice(0, 4));
  }
  // sort numbers to right
  arrays = arrays.map((row) => {
    return [...row.filter((num) => num), ...row.filter((num) => !num)];
  });
  return arrays;
};

export const transformGridIntoColumns = (grid: number[]) => {
  const arrays: number[][] = [];
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
      arrays.push(firstCol, secondCol, thirdCol, fourthCol);
    }
  });
  const newArr = [];
  for (let i = 1; i < 16; i *= 4) {
    for (let j = 0; j < 4; j++) {
      newArr.push(grid[i + j]);
    }
  }
  return arrays;
};

export const sumToRight = (numArr: number[]) => {
  const arrNew: number[] = [];
  numArr.reverse().forEach((item, i) => {
    if (item === numArr[i + 1]) {
      const sum = item + numArr[i + 1];
      item = sum;
      numArr[i + 1] = 0;
    }
    arrNew.push(item);
  });

  return arrNew.reverse();
};

export const sumToLeft = (numArr: number[]) => {
  const arrNew: number[] = [];
  numArr.forEach((item, i) => {
    if (item === numArr[i + 1]) {
      const sum = item + numArr[i + 1];
      item = sum;
      numArr[i + 1] = 0;
    }
    arrNew.push(item);
  });
  return arrNew;
};

export const onMoveRight = (grid: number[]) => {
  const filteredNums = transformGridIntoRows(grid);
  const summedNums: number[] = filteredNums
    .map((num) => {
      return [
        [...sumToRight(num).filter((number) => number)],
        [...sumToRight(num).filter((number) => !number)],
      ]
        .reverse()
        .flat();
    })
    .flat();
  return summedNums;
  // setGrid(summedNums);
  // settoggleMove(!toggleMove);
};

export const onMoveLeft = (grid: number[]) => {
  const filteredNums = transformGridIntoRows(grid);
  const summedNums: number[] = filteredNums
    .map((num) => {
      return [...sumToLeft(num).filter((numb) => numb), ...sumToLeft(num).filter((numb) => !numb)];
    })
    .flat();

  return summedNums;
  // setGrid(summedNums);
  // settoggleMove(!toggleMove);
};

export const onMoveUp = (grid: number[]) => {
  const filteredNums = transformGridIntoColumns(grid);
  const summedNums: number[][] = filteredNums.map((num) => {
    return [...sumToLeft(num).filter((numb) => numb), ...sumToLeft(num).filter((numb) => !numb)];
  });
  const result = transformGridIntoColumns(summedNums.flat());

  return result.flat();
  // setGrid(result.flat());
  // settoggleMove(!toggleMove);
};

export const onMoveDown = (grid: number[]) => {
  const filteredNums = transformGridIntoColumns(grid).map((numArr) => {
    return [...numArr.filter((num) => !num), ...numArr.filter((num) => num)].flat();
  });

  const summedNums: number[][] = filteredNums.map((num) => {
    return [
      [...sumToRight(num).filter((numb) => numb)],
      [...sumToRight(num).filter((numb) => !numb)],
    ]
      .reverse()
      .flat();
  });
  const result = transformGridIntoColumns(summedNums.flat());

  return result.flat();
};

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


