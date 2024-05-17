import React from 'react'
import styles from './Button.module.scss'

interface ButtonProps extends React.HTMLProps<HTMLButtonElement> { };

const Button: React.FC<ButtonProps> = ({children}) => {
  return (
    <button className={styles.button}>{children}</button>
  )
};

export default Button;

