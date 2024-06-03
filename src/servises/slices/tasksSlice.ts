import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TasksState, Task } from '@/utils/types';

const initialState: TasksState = {
  items: [
    {
      id: 1,
      title: 'Первая задача',
      email: 'user@user.com',
      text: 'Описание задачи',
      status: 'Не выполнено',
    },
    {
      id: 2,
      title: 'Вторая задача',
      email: 'admin@admin.com',
      text: 'Описание задачи',
      status: 'Выполнено',
    },
    {
      id: 3,
      title: 'Третья задача',
      email: 'admin@admin.com',
      text: 'Описание задачи',
      status: 'Выполнено',
    },
    {
      id: 4,
      title: 'Четвертая задача',
      email: 'admin@admin.com',
      text: 'Описание задачи',
      status: 'Выполнено',
    },
  ],
  nextId: 5,
};

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    addTask: (
      state,
      action: PayloadAction<{ title: string; email: string; text: string }>,
    ) => {
      const { title, email, text } = action.payload;
      state.items.push({
        id: state.nextId,
        title,
        email,
        text,
        status: 'Не выполнено',
      });
      state.nextId += 1;
    },
    updateTask: (state, action: PayloadAction<Task>) => {
      const index = state.items.findIndex(
        (task) => task.id === action.payload.id,
      );
      if (index !== -1) {
        state.items[index] = action.payload;
      }
    },
  },
});

export const { addTask, updateTask } = tasksSlice.actions;
export default tasksSlice.reducer;
