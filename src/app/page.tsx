'use client';

import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import { RootState } from '../servises/store';
import TaskList from '../components/TaskList/TaskList';
import AddTaskForm from '../components/AddTaskForm/AddTaskForm';
import styles from './Home.module.scss';
import Link from 'next/link';

export default function HomePage() {
  const router = useRouter();
  const { isAuthenticated, user } = useSelector(
    (state: RootState) => state.auth,
  );

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login');
    }
  }, [isAuthenticated, router]);

  return (
    <>
      {isAuthenticated ? (
        <div className={styles.home}>
          <header>
            <h1 className={styles.home__title}>Task Manager</h1>
          </header>
          <TaskList />
          <div className={styles.home__container}>
            <div>
              <AddTaskForm />
            </div>
            <div className={styles.home__info}>
              <span>{user?.email}</span>
              <span>{user?.role}</span>
              <Link className={styles.home__link} href="/logout">
                Выйти
              </Link>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
