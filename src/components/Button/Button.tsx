'use client';

import { FC } from 'react';
import styles from './Button.module.scss';

interface ButtonProps {
  type: 'button' | 'submit' | 'reset';
  text: string;
  onClick?: () => void;
}

const Button: FC<ButtonProps> = ({ type, text, onClick }) => {
  return (
    <button className={styles.button} type={type} onClick={onClick}>
      {text}
    </button>
  );
};

export default Button;
