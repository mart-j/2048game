import React, { useEffect, useRef, useState } from 'react';
import Grid from './components/grid/Grid';
import Button from './components/button/Button';
import Score from './components/score/Score';
import Header from './components/header/Header';
import { GRID } from './helpers/GRID';
import {
  randomAvailableNumberGenerator,
  onMoveDown,
  onMoveUp,
  onMoveRight,
  onMoveLeft,
} from './helpers/TransformGrid';

const App = () => {
  const [rightAnimation, setRightAnimation] = useState(false);
  const [leftAnimation, setLeftAnimation] = useState(false);
  const [downAnimation, setdownAnimation] = useState(false);
  const [upAnimation, setUpAnimation] = useState(false);
  const [grid, setGrid] = useState(GRID);
  const [toggleMove, settoggleMove] = useState(false);
  const [youLose, setYouLose] = useState(false);

  const countWhenFourAppears = useRef(0);
  const getNewNumberIndex = useRef<number>();
  const getNewGridNumbers = useRef<number[]>([-1, -1]);
  const container = useRef<HTMLDivElement>(null);
  const score = useRef(0);
  const moveBack = useRef<{ curr: number[] | undefined; prev: number[] | undefined }>();

  useEffect(() => {
    container.current!.focus();
  }, []);

  useEffect(() => {
    if (moveBack.current) {
      moveBack.current!.prev = grid;
      moveBack.current!.prev = moveBack.current?.curr;
    }
  }, [toggleMove]);

  useEffect(() => {
    getOneSquareAfterMove();
    score.current = grid.reduce((a, c) => a + c);
  }, [toggleMove]);

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
    setRightAnimation(false);
    setLeftAnimation(false);
    setdownAnimation(false);
    setUpAnimation(false);
    getNewNumberIndex.current = -1;
    getNewGridNumbers.current = [-1, -1];
  };

  const endOfAnimationHandler = () => {
    stopAllAnimations();

    if (rightAnimation) {
      setGrid(onMoveRight(grid));
      settoggleMove(!toggleMove);
    }
    if (leftAnimation) {
      setGrid(onMoveLeft(grid));
      settoggleMove(!toggleMove);
    }
    if (downAnimation) {
      setGrid(onMoveDown(grid));
      settoggleMove(!toggleMove);
    }
    if (upAnimation) {
      setGrid(onMoveUp(grid));
      settoggleMove(!toggleMove);
    }
  };

  const startNewGame = () => {
    score.current = 0;
    setYouLose(false);
    const newGrid = [...GRID];
    const rndNumOne = randomAvailableNumberGenerator(grid);
    const rndNumTwo = randomAvailableNumberGenerator(grid);
    getNewGridNumbers.current = [rndNumOne, rndNumTwo];
    newGrid[rndNumTwo] = 2;
    newGrid[rndNumOne] = 2;
    setGrid(newGrid);
  };

  const getOneSquareAfterMove = () => {
    const number = randomAvailableNumberGenerator(grid);
    if (number === undefined) {
      setYouLose(true);
    }
    const newGrid = [...grid];
    if (countWhenFourAppears.current < 10) {
      countWhenFourAppears.current += 1;
      newGrid[number] = 2;
    } else {
      countWhenFourAppears.current = 0;
      newGrid[number] = 4;
    }
    getNewNumberIndex.current = number;
    setGrid(newGrid);
  };

  const oneMoveBack = () => {
    if (moveBack.current) {
      setGrid(moveBack.current!.prev!);
    }
    setYouLose(false);
  };

  return (
    <div
      style={{ height: '100vh' }}
      ref={container}
      tabIndex={0}
      onKeyDown={(e) => keyPressHandler(e.key)}
    >
      <Header />
      <Score score={score.current} />
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
