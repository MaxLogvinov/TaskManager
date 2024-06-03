'use client';

import React, { useState, ChangeEvent, FormEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addTask } from '../../servises/slices/tasksSlice';
import { RootState } from '../../servises/store';
import styles from './AddTaskForm.module.scss';
import { regexEmail } from '@/utils/constants';
import ButtonWithValid from '../Button/ButtonWithValid';

interface TaskValues {
  title: string;
  email: string;
  text: string;
}

interface TaskErrors {
  title: string;
  email: string;
  text: string;
}

export default function AddTaskForm() {
  const dispatch = useDispatch();
  const { user } = useSelector((state: RootState) => state.auth);

  const [values, setValues] = useState<TaskValues>({
    title: '',
    email: user?.email || '',
    text: '',
  });

  const [errors, setErrors] = useState<TaskErrors>({
    title: '',
    email: '',
    text: '',
  });

  const [isValid, setIsValid] = useState<boolean>(false);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
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

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    dispatch(
      addTask({ title: values.title, email: values.email, text: values.text }),
    );
    setValues({
      title: '',
      email: '',
      text: '',
    });
  };

  return (
    <section>
      <form noValidate onSubmit={handleSubmit} className={styles.form}>
        <input
          type="text"
          name="title"
          placeholder="Заголовок задачи"
          value={values.title}
          onChange={handleChange}
          className={styles.form__input}
          required
          minLength={3}
          maxLength={25}
        />
        <span className={styles.form__error}>{errors.title}</span>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={values.email}
          onChange={handleChange}
          className={styles.form__input}
          required
          pattern={regexEmail}
        />
        <span className={styles.form__error}>{errors.email}</span>
        <textarea
          name="text"
          placeholder="Описание задачи"
          value={values.text}
          onChange={handleChange}
          className={styles.form__input}
        />
        <ButtonWithValid
          type="submit"
          text="Добавить задачу"
          isValid={isValid}
        />
      </form>
    </section>
  );
}
