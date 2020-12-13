import React, { FC } from 'react';
import styles from './Button.module.scss';

interface Props {
  label: string;
  startNewGame: () => void;
}
const Button: FC<Props> = ({ label, startNewGame }) => {
  return (
    <div className={styles.buttonWrapper}>
      <button onClick={startNewGame} className={styles.button}>
        {label}
      </button>
    </div>
  );
};

export default Button;
