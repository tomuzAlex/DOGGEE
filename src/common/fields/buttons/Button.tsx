import React from 'react';
import styles from './Button.module.scss';
import Loader from '../Loader/Loader';
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean;
}
export const Button: React.FC<ButtonProps> = ({ children, isLoading }) => {
  return (
    <div>
      <button className={styles.button}>{!isLoading ? children : <Loader />}</button>
    </div>
  );
};
