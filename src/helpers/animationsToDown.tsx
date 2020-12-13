export const moveZeroStepsDown = (i: number, animation: boolean) => {
  return animation && i >= 12 && i < 16;
};

export const moveOneStepDown = (grid: number[], i: number, animation: boolean) => {
  return (
    (animation &&
      i < 4 &&
      ((!grid[i + 4] && grid[i + 8 && i + 12]) ||
        (!grid[i + 8] && grid[i + 12 && i + 4]) ||
        (!grid[i + 12] && grid[i + 4 && i + 8]))) ||
    (animation &&
      i >= 4 &&
      i < 8 &&
      ((!grid[i + 4] && grid[i + 8]) || (grid[i + 4] && !grid[i + 8]))) ||
    (animation && i >= 8 && i <= 11 && !grid[i + 4])
  );
};

export const moveTwoStepsDown = (grid: number[], i: number, animation: boolean) => {
  return (
    (animation &&
      i < 4 &&
      ((grid[i + 4] && !grid[i + 8] && !grid[i + 12]) ||
        (!grid[i + 4] && grid[i + 8] && !grid[i + 12]) ||
        (!grid[i + 4] && !grid[i + 8] && grid[i + 12]))) ||
    (animation && i >= 4 && i < 8 && !grid[i + 4] && !grid[i + 8])
  );
};

export const moveThreeStepsDown = (grid: number[], i: number, animation: boolean) => {
  return animation && i < 4 && !grid[i + 4] && !grid[i + 8] && !grid[i + 12];
};
