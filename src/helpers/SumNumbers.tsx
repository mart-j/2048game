/* eslint-disable no-param-reassign */
export const sumNumbersToLeft = (numArr: number[]) => {
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

export const sumNumbersToRight = (numArr: number[]) => {
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
