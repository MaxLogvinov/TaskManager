'use client';

import { useSelector } from 'react-redux';
import { RootState } from '../../servises/store';
import { useState } from 'react';
import TaskItem from '../TaskItem/TaskItem';
import styles from './TaskList.module.scss';
import Button from '../Button/Button';

export default function TaskList() {
  const tasks = useSelector((state: RootState) => state.tasks.items);
  const [filter, setFilter] = useState({ title: '', email: '', status: '' });
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [visibleTasks, setVisibleTasks] = useState<number>(3);

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFilter((prevFilter) => ({ ...prevFilter, [name]: value }));
  };

  const handleSortChange = () => {
    setSortOrder((prevSortOrder) => (prevSortOrder === 'asc' ? 'desc' : 'asc'));
  };

  const filteredTasks = tasks
    .filter((task) =>
      task.title.toLowerCase().includes(filter.title.toLowerCase()),
    )
    .filter((task) =>
      task.email.toLowerCase().includes(filter.email.toLowerCase()),
    )
    .filter((task) =>
      task.status.toLowerCase().includes(filter.status.toLowerCase()),
    );

  const sortedTasks = filteredTasks.sort((a, b) => {
    if (sortOrder === 'asc') {
      return a.id - b.id;
    } else {
      return b.id - a.id;
    }
  });

  const addTasks = () => {
    setVisibleTasks(visibleTasks + 3);
  };

  return (
    <div className={styles.tasklist}>
      <input
        type="text"
        name="title"
        placeholder="Фильтр по названию"
        value={filter.title}
        onChange={handleFilterChange}
        className={styles.tasklist__input}
      />
      <input
        type="text"
        name="email"
        placeholder="Фильтр по email"
        value={filter.email}
        onChange={handleFilterChange}
        className={styles.tasklist__input}
      />
      <input
        type="text"
        name="status"
        placeholder="Фильтр по статусу"
        value={filter.status}
        onChange={handleFilterChange}
        className={styles.tasklist__input}
      />
      <button className={styles.tasklist__button} onClick={handleSortChange}>
        Сортировать по ID ({sortOrder === 'asc' ? 'возрастание' : 'убывание'})
      </button>
      {sortedTasks.slice(0, visibleTasks).map((task) => (
        <TaskItem key={task.id} task={task} />
      ))}
      {visibleTasks < sortedTasks.length && (
        <Button type="button" text="ещё" onClick={addTasks} />
      )}
    </div>
  );
}
