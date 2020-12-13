export const moveZeroStepsLeft = (i: number, animation: boolean) => {
  return animation && i % 4 === 0;
};

export const moveOneStepToLeft = (
  grid: number[],
  i: number,
  animation: boolean,
) => {
  return (
    (animation &&
      i % 4 === 3 &&
      ((!grid[i - 1] && grid[i - 2 && i - 3]) ||
        (!grid[i - 2] && grid[i - 3 && i - 1]) ||
        (!grid[i - 3] && grid[i - 1 && i - 2]))) ||
    (animation &&
      i % 4 === 2 &&
      ((!grid[i - 1] && grid[i - 2]) || (grid[i - 1] && !grid[i - 2]))) ||
    (animation && i % 4 === 1 && !grid[i - 1])
  );
};

export const moveTwoStepsToLeft = (
  grid: number[],
  i: number,
  animation: boolean,
) => {
  return (
    (animation &&
      i % 4 === 3 &&
      ((grid[i - 1] && !grid[i - 2] && !grid[i - 3]) ||
        (!grid[i - 1] && grid[i - 2] && !grid[i - 3]) ||
        (!grid[i - 1] && !grid[i - 2] && grid[i - 3]))) ||
    (animation && i % 4 === 2 && !grid[i - 1] && !grid[i - 2])
  );
};

export const moveThreeStepsToLeft = (
  grid: number[],
  i: number,
  animation: boolean,
) => {
  return (
    animation && i % 4 === 3 && !grid[i - 1] && !grid[i - 2] && !grid[i - 3]
  );
};
