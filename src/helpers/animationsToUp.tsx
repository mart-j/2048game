export const moveZeroStepsUp = (i: number, animation: boolean) => {
  return animation && i < 4;
};

export const moveOneStepUp = (
  grid: number[],
  i: number,
  animation: boolean,
) => {
  return (
    (animation &&
      i >= 12 &&
      i < 16 &&
      ((!grid[i - 4] && grid[i - 8 && i - 12]) ||
        (!grid[i - 8] && grid[i + 12 && i - 4]) ||
        (!grid[i - 12] && grid[i - 4 && i - 8]))) ||
    (animation &&
      i >= 8 &&
      i < 12 &&
      ((!grid[i - 4] && grid[i - 8]) || (grid[i - 4] && !grid[i - 8]))) ||
    (animation && i >= 4 && i < 8 && !grid[i - 4])
  );
};

export const moveTwoStepsUp = (
  grid: number[],
  i: number,
  animation: boolean,
) => {
  return (
    (animation &&
      i >= 12 &&
      i < 16 &&
      ((grid[i - 4] && !grid[i - 8] && !grid[i - 12]) ||
        (!grid[i - 4] && grid[i - 8] && !grid[i - 12]) ||
        (!grid[i - 4] && !grid[i - 8] && grid[i - 12]))) ||
    (animation && i >= 8 && i < 12 && !grid[i - 4] && !grid[i - 8])
  );
};

export const moveThreeStepsUp = (
  grid: number[],
  i: number,
  animation: boolean,
) => {
  return (
    animation &&
    i >= 12 &&
    i < 16 &&
    !grid[i - 4] &&
    !grid[i - 8] &&
    !grid[i - 12]
  );
};
