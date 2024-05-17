import React from 'react';
import styles from './Input.module.scss';

interface InputProps extends React.HTMLProps<HTMLInputElement> {
  isError?: boolean;
  helperText?: string;
}

const Input: React.FC<InputProps> = ({ isError = false, helperText, ...props }) => {
  const className = isError ? styles.inputError : styles.input;
  return (
    <div>
      <input className={className} {...props} />
      {isError && helperText && <div className={styles.helperText}>{helperText}</div>}
    </div>
  );
};

export default Input;
