'use client';

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import { logout } from '../../servises/slices/authSlice';
import styles from './Logout.module.scss';
import Button from '@/components/Button/Button';
import { RootState } from '@/servises/store';

export default function LogoutPage() {
  const dispatch = useDispatch();
  const router = useRouter();
  const { isAuthenticated, user } = useSelector(
    (state: RootState) => state.auth,
  );

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login');
    }
  }, [isAuthenticated, router]);

  const logOut = () => {
    dispatch(logout());
    router.push('/login');
  };

  const goBack = () => {
    router.push('/');
  };

  return (
    <>
      {isAuthenticated ? (
        <div className={styles.logout}>
          <h2 className={styles.logout__title}>Вы уверены?</h2>
          <div className={styles.logout__buttons}>
            <Button type="button" text="Да" onClick={logOut} />
            <Button type="button" text="Нет" onClick={goBack} />
          </div>
        </div>
      ) : null}
    </>
  );
}
