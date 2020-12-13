import React, { FC } from 'react';
import classnames from 'classnames';
import styles from './Grid.module.scss';
import backButton from '../../assets/back.png';
import {
  moveZeroStepsRight,
  moveOneStepRight,
  moveTwoStepsRight,
  moveThreeStepsRight,
} from '../../helpers/animationsToRight';
import {
  moveZeroStepsLeft,
  moveOneStepToLeft,
  moveTwoStepsToLeft,
  moveThreeStepsToLeft,
} from '../../helpers/animationsToLeft';
import {
  moveZeroStepsDown,
  moveOneStepDown,
  moveTwoStepsDown,
  moveThreeStepsDown,
} from '../../helpers/animationsToDown';
import {
  moveZeroStepsUp,
  moveOneStepUp,
  moveTwoStepsUp,
  moveThreeStepsUp,
} from '../../helpers/animationsToUp';

interface Props {
  getNewNumberIndex: number | undefined;
  getNewGridNumbers: number[] | undefined;
  grid: number[];
  rightAnimation: boolean;
  leftAnimation: boolean;
  upAnimation: boolean;
  downAnimation: boolean;
  endOfAnimationHandler: () => void;
  youLose: boolean;
  oneMoveBack: () => void;
}

const Grid: FC<Props> = ({
  youLose,
  leftAnimation,
  upAnimation,
  downAnimation,
  rightAnimation,
  grid,
  getNewGridNumbers,
  getNewNumberIndex,
  endOfAnimationHandler,
  oneMoveBack,
}) => {
  
  const animationCases = (i: number) => {
    return classnames({
      [styles.numberSquare]: true,
      [styles.animateFade]:
        i === getNewNumberIndex || i === getNewGridNumbers![0] || i === getNewGridNumbers![1],
      [styles.rightZero]: moveZeroStepsRight(i, rightAnimation),
      [styles.rightOne]: moveOneStepRight(grid, i, rightAnimation),
      [styles.rightTwo]: moveTwoStepsRight(grid, i, rightAnimation),
      [styles.rightThree]: moveThreeStepsRight(grid, i, rightAnimation),
      [styles.leftZero]: moveZeroStepsLeft(i, leftAnimation),
      [styles.leftOne]: moveOneStepToLeft(grid, i, leftAnimation),
      [styles.leftTwo]: moveTwoStepsToLeft(grid, i, leftAnimation),
      [styles.leftThree]: moveThreeStepsToLeft(grid, i, leftAnimation),
      [styles.downZero]: moveZeroStepsDown(i, downAnimation),
      [styles.downOne]: moveOneStepDown(grid, i, downAnimation),
      [styles.downTwo]: moveTwoStepsDown(grid, i, downAnimation),
      [styles.downThree]: moveThreeStepsDown(grid, i, downAnimation),
      [styles.upZero]: moveZeroStepsUp(i, upAnimation),
      [styles.upOne]: moveOneStepUp(grid, i, upAnimation),
      [styles.upTwo]: moveTwoStepsUp(grid, i, upAnimation),
      [styles.upThree]: moveThreeStepsUp(grid, i, upAnimation),
    });
  };

  return (
    <div className={classnames({ [styles.container]: true, [styles.lostGame]: youLose })}>
      {youLose && (
        <div onClick={oneMoveBack} className={styles.goBackButton}>
         <img src={backButton} alt="return"/>
        </div>
      )}
      <div className={styles.grid}>
        {grid.map((item, i) => {
          return (
            <div className={styles.gridItem} key={`${i}`}>
              {item !== 0 && (
                <div
                  style={{ backgroundColor: `rgb( 255, ${item * 20}, 0)` }}
                  onAnimationEnd={endOfAnimationHandler}
                  className={animationCases(i)}
                >
                  {item}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default Grid;
