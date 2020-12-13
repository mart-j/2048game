export const moveZeroStepsRight = (index: number, animation: boolean) => {
  return animation && index % 4 === 3;
};

export const moveOneStepRight = (
  grid: number[],
  i: number,
  animation: boolean,
) => {
  return (
    (animation &&
      i % 4 === 0 &&
      ((!grid[i + 1] && grid[i + 2 && i + 3]) ||
        (!grid[i + 2] && grid[i + 3 && i + 1]) ||
        (!grid[i + 3] && grid[i + 1 && i + 2]))) ||
    (animation &&
      i % 4 === 1 &&
      ((!grid[i + 1] && grid[i + 2]) || (grid[i + 1] && !grid[i + 2]))) ||
    (animation && i % 4 === 2 && !grid[i + 1])
  );
};

export const moveTwoStepsRight = (
  grid: number[],
  i: number,
  animation: boolean,
) => {
  return (
    (animation &&
      i % 4 === 0 &&
      ((grid[i + 1] && !grid[i + 2] && !grid[i + 3]) ||
        (!grid[i + 1] && grid[i + 2] && !grid[i + 3]) ||
        (!grid[i + 1] && !grid[i + 2] && grid[i + 3]))) ||
    (animation && i % 4 === 1 && !grid[i + 1] && !grid[i + 2])
  );
};

export const moveThreeStepsRight = (
  grid: number[],
  i: number,
  animation: boolean,
) => {
  return (
    animation && i % 4 === 0 && !grid[i + 1] && !grid[i + 2] && !grid[i + 3]
  );
};
