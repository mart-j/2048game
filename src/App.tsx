import React, { useEffect, useRef, useState } from 'react';
import Grid from './components/grid/Grid';
import Button from './components/button/Button';
import Score from './components/score/Score';
import Header from './components/header/Header';
import { GRID } from './helpers/GRID';
import { randomAvailableNumberGenerator } from './helpers/RandomNumberGenerator';
import { sumNumbersToLeft, sumNumbersToRight } from './helpers/SumNumbers';
import { transformGridIntoRows, transformGridIntoColumns } from './helpers/TransformGrid';

const App = () => {
  const [rightAnimation, setRightAnimation] = useState(false);
  const [leftAnimation, setLeftAnimation] = useState(false);
  const [downAnimation, setdownAnimation] = useState(false);
  const [upAnimation, setUpAnimation] = useState(false);
  const [score, setScore] = useState(0);
  const [grid, setGrid] = useState(GRID);
  const [countWhenFourAppears, setCountWhenFourApperars] = useState(0);
  const [toggleMove, settoggleMove] = useState(false);
  const [youLose, setYouLose] = useState(false);
  const [previousGrid, setPreviousGrid] = useState<number[]>();
  const [prevPreviousGrid, setPrevPreviousGrid] = useState<number[]>();

  const getNewNumberIndex = useRef<number>();
  const getNewGridNumbers = useRef<number[]>([-1, -1]);
  const container = useRef<HTMLDivElement>(null);

  const keyPressHandler = (key: string) => {
    if (!youLose) {
      const allAnimationsFalse =
        !upAnimation &&
        !downAnimation &&
        !leftAnimation &&
        !rightAnimation &&
        getNewNumberIndex.current === -1;
      if (key === 'ArrowRight' && allAnimationsFalse) {
        setRightAnimation(true);
      }
      if (key === 'ArrowLeft' && allAnimationsFalse) {
        setLeftAnimation(true);
      }
      if (key === 'ArrowDown' && allAnimationsFalse) {
        setdownAnimation(true);
      }
      if (key === 'ArrowUp' && allAnimationsFalse) {
        setUpAnimation(true);
      }
    }
  };

  const stopAllAnimations = () => {
    getNewNumberIndex.current = -1;
    getNewGridNumbers.current = [-1, -1];
    setRightAnimation(false);
    setLeftAnimation(false);
    setdownAnimation(false);
    setUpAnimation(false);
  };

  const endOfAnimationHandler = () => {
    stopAllAnimations();
    if (rightAnimation) {
      onMoveRight();
    }
    if (leftAnimation) {
      onMoveLeft();
    }
    if (downAnimation) {
      onMoveDown();
    }
    if (upAnimation) {
      onMoveUp();
    }
  };

  useEffect(() => {
    container.current?.focus();
  });

  useEffect(() => {
    setPrevPreviousGrid(previousGrid);
    setPreviousGrid(grid);
  }, [toggleMove]);

  const startNewGame = () => {
    setScore(0);
    setYouLose(false);
    const newGrid = [...GRID];
    const rndNumOne = randomAvailableNumberGenerator(grid);
    const rndNumTwo = randomAvailableNumberGenerator(GRID);
    getNewGridNumbers.current = [rndNumOne, rndNumTwo];
    newGrid[rndNumTwo] = 2;
    setGrid(newGrid);
    newGrid[rndNumOne] = 2;
    setGrid(newGrid);
  };

  const getOneSquareAfterMove = () => {
    const number = randomAvailableNumberGenerator(grid);
    if (number === undefined) {
      setYouLose(true);
    }
    const newGrid = [...grid];
    if (countWhenFourAppears < 10) {
      setCountWhenFourApperars(countWhenFourAppears + 1);
      newGrid[number] = 2;
    } else {
      setCountWhenFourApperars(0);
      newGrid[number] = 4;
    }
    getNewNumberIndex.current = number;

    setGrid(newGrid);
  };

  useEffect(() => {
    getOneSquareAfterMove();
    setScore(grid.reduce((a, c) => a + c));
  }, [toggleMove]);

  const oneMoveBack = () => {
    setGrid(prevPreviousGrid!);
    setYouLose(false);
  };

  const onMoveRight = () => {
    const filteredNums = transformGridIntoRows(grid).map((numArr) => {
      return [...numArr.filter((num) => num !== 0), ...numArr.filter((num) => num === 0)];
    });
    const summedNums: number[][] = filteredNums.map((num) => {
      return [
        [...sumNumbersToRight(num).filter((numb) => numb !== 0)],
        [...sumNumbersToRight(num).filter((numb) => numb === 0)],
      ]
        .reverse()
        .flat();
    });

    setGrid(summedNums.flat());

    settoggleMove(!toggleMove);
  };

  const onMoveLeft = () => {
    const filteredNums = transformGridIntoRows(grid).map((numArr) => {
      return [...numArr.filter((num) => num !== 0), ...numArr.filter((num) => num === 0)];
    });
    const summedNums: number[][] = filteredNums.map((num) => {
      return [
        ...sumNumbersToLeft(num).filter((numb) => numb !== 0),
        ...sumNumbersToLeft(num).filter((numb) => numb === 0),
      ];
    });

    setGrid(summedNums.flat());
    settoggleMove(!toggleMove);
  };

  const onMoveUp = () => {
    const filteredNums = transformGridIntoColumns(grid).map((numArr) => {
      return [...numArr.filter((num) => num !== 0), ...numArr.filter((num) => num === 0)].flat();
    });
    const summedNums: number[][] = filteredNums.map((num) => {
      return [
        ...sumNumbersToLeft(num).filter((numb) => numb !== 0),
        ...sumNumbersToLeft(num).filter((numb) => numb === 0),
      ];
    });
    const result = transformGridIntoColumns(summedNums.flat());

    setGrid(result.flat());
    settoggleMove(!toggleMove);
  };

  const onMoveDown = () => {
    const filteredNums = transformGridIntoColumns(grid).map((numArr) => {
      return [...numArr.filter((num) => num === 0), ...numArr.filter((num) => num !== 0)].flat();
    });

    const summedNums: number[][] = filteredNums.map((num) => {
      return [
        [...sumNumbersToRight(num).filter((numb) => numb !== 0)],
        [...sumNumbersToRight(num).filter((numb) => numb === 0)],
      ]
        .reverse()
        .flat();
    });
    const result = transformGridIntoColumns(summedNums.flat());

    setGrid(result.flat());
    settoggleMove(!toggleMove);
  };

  useEffect(() => {}, [toggleMove]);

  return (
    <div
      style={{ height: '100vh' }}
      ref={container}
      tabIndex={0}
      onKeyDown={(e) => keyPressHandler(e.key)}
    >
      <Header />
      <Score score={score} />
      <Button startNewGame={startNewGame} label="new game" />
      <Grid
        oneMoveBack={oneMoveBack}
        youLose={youLose}
        endOfAnimationHandler={endOfAnimationHandler}
        rightAnimation={rightAnimation}
        leftAnimation={leftAnimation}
        upAnimation={upAnimation}
        downAnimation={downAnimation}
        grid={grid}
        getNewGridNumbers={getNewGridNumbers.current}
        getNewNumberIndex={getNewNumberIndex.current}
      />
    </div>
  );
};
export default App;
