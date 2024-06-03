'use client';

import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateTask } from '../../servises/slices/tasksSlice';
import { RootState } from '../../servises/store';
import styles from './TaskItem.module.scss';
import { Task } from '@/utils/types';

interface TaskItemProps {
  task: Task;
}

const TaskItem: React.FC<TaskItemProps> = ({ task }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state: RootState) => state.auth);
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(task.title);
  const [email, setEmail] = useState(task.email);
  const [text, setText] = useState(task.text);
  const [status, setStatus] = useState(task.status);

  const handleEdit = () => {
    if (isEditing) {
      dispatch(updateTask({ ...task, title, email, text, status }));
    }
    setIsEditing(!isEditing);
  };

  return (
    <div className={styles.taskItem}>
      <div className={styles.taskItem__container}>
        {isEditing ? (
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        ) : (
          <h3>{task.title}</h3>
        )}
        {isEditing ? (
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled
          />
        ) : (
          <p>{task.email}</p>
        )}
        {isEditing ? (
          <textarea value={text} onChange={(e) => setText(e.target.value)} />
        ) : (
          <p>{task.text}</p>
        )}
      </div>
      <div className={styles.taskItem__container}>
        <p>{task.id}</p>
        {isEditing ? (
          <input
            type="checkbox"
            checked={status === 'Выполнено'}
            onChange={(e) =>
              setStatus(e.target.checked ? 'Выполнено' : 'Не выполнено')
            }
          />
        ) : (
          <p>{task.status}</p>
        )}
        {user?.role === 'admin' && (
          <button onClick={handleEdit} className={styles.taskItem__button}>
            {isEditing ? 'Сохранить' : 'Редактировать'}
          </button>
        )}
      </div>
    </div>
  );
};

export default TaskItem;
