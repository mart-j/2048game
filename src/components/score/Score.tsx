import React, { FC } from 'react';
import styles from './Score.module.scss';

interface Props {
  score: number;
}
const Score: FC<Props> = ({ score }) => {
  return (
    <div className={styles.scoreWrapper}>
      <div className={styles.score}>{score}</div>
    </div>
  );
};

export default Score;
