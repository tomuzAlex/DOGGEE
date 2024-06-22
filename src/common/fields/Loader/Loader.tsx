import React from 'react';
import styles from './Loader.module.scss';

interface LoaderProps {
  isLoading?: boolean;
}

const Loader: React.FC<LoaderProps> = () => {
  return (
    <div className={styles.loader}>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
};

export default Loader;
