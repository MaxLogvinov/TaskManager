'use client';

import { FC } from 'react';
import styles from './Button.module.scss';

interface ButtonProps {
  type: 'button' | 'submit' | 'reset';
  text: string;
  onClick?: () => void;
  isValid: boolean;
}

const ButtonWithValid: FC<ButtonProps> = ({ type, text, onClick, isValid }) => {
  return (
    <button
      className={styles.button}
      type={type}
      onClick={onClick}
      disabled={!isValid}
    >
      {text}
    </button>
  );
};

export default ButtonWithValid;
