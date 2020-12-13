import React from 'react';
import styles from './Header.module.scss';


const Header = () => {
  return (
    <div className={styles.headerWrapper}>
      <div className={styles.header}>2048</div>
    </div>
  );
};

export default Header;
