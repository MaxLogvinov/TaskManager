'use client';

import {
  useState,
  useEffect,
  ChangeEvent,
  FormEvent,
  useCallback,
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import { RootState } from '../../servises/store';
import { login } from '../../servises/slices/authSlice';
import styles from './Login.module.scss';
import { regexEmail } from '@/utils/constants';
import ButtonWithValid from '@/components/Button/ButtonWithValid';

interface Values {
  email: string;
  password: string;
}

interface Errors {
  email: string;
  password: string;
}

export default function LoginPage() {
  const dispatch = useDispatch();
  const router = useRouter();
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);
  const [values, setValues] = useState<Values>({
    email: '',
    password: '',
  });

  const [errors, setErrors] = useState<Errors>({
    email: '',
    password: '',
  });

  const [isValid, setIsValid] = useState<boolean>(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value, validationMessage } = e.target;

    setValues({
      ...values,
      [name]: value,
    });

    setErrors({
      ...errors,
      [name]: validationMessage,
    });

    setIsValid(e.target.closest('form')!.checkValidity());
  };

  useEffect(() => {
    if (isAuthenticated) {
      router.push('/');
    }
  }, [isAuthenticated, router]);

  const checkToken = useCallback(() => {
    if (!isAuthenticated) {
      const localUserString = localStorage.getItem('user');
      if (localUserString) {
        const localUser = JSON.parse(localUserString);
        const { email, password } = localUser;
        dispatch(login({ email, password }));
      }
    }
  }, [dispatch, isAuthenticated]);

  useEffect(() => {
    checkToken();
  }, [checkToken, isAuthenticated]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    dispatch(login({ email: values.email, password: values.password }));
  };

  return (
    <>
      {!isAuthenticated ? (
        <div className={styles.login}>
          <h1 className={styles.login__title}>Вход</h1>
          <form className={styles.login__form} onSubmit={handleSubmit}>
            <input
              type="email"
              name="email"
              placeholder="Введите email"
              value={values.email}
              onChange={handleChange}
              required
              className={styles.login__input}
              pattern={regexEmail}
            />
            <span className={styles.login__error}>{errors.email}</span>
            <input
              type="password"
              name="password"
              placeholder="Введите пароль"
              value={values.password}
              onChange={handleChange}
              required
              className={styles.login__input}
            />
            <span className={styles.login__error}>{errors.password}</span>
            <ButtonWithValid type="submit" text="Войти" isValid={isValid} />
          </form>
        </div>
      ) : null}
    </>
  );
}
