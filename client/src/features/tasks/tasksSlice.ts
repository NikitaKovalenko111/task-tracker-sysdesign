import { createSlice, nanoid, PayloadAction } from '@reduxjs/toolkit';

export type TaskStatus = 'todo' | 'in-progress' | 'done';

export interface Task {
  id: string;
  title: string;
  description: string;
  dueDate: string;
  status: TaskStatus;
  projectName: string;
}

interface TasksState {
  items: Task[];
}

const initialState: TasksState = {
  items: [
    {
      id: '1',
      title: 'Собрать требования по API',
      description: 'Согласовать контракты endpoint для команды mobile.',
      dueDate: '2026-04-21',
      status: 'todo',
      projectName: 'Smart Home Hub',
    },
    {
      id: '2',
      title: 'Прототип UI для статистики',
      description: 'Подготовить карточки аналитики и состояния устройств.',
      dueDate: '2026-04-20',
      status: 'in-progress',
      projectName: 'Smart Home Hub',
    },
    {
      id: '3',
      title: 'Настроить уведомления',
      description: 'Добавить email и push уведомления о дедлайнах.',
      dueDate: '2026-04-19',
      status: 'done',
      projectName: 'Smart Home Hub',
    },
  ],
};

export interface TaskPayload {
  title: string;
  description: string;
  dueDate: string;
  status: TaskStatus;
  projectName: string;
}

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    addTask(state, action: PayloadAction<TaskPayload>) {
      state.items.unshift({
        id: nanoid(),
        ...action.payload,
      });
    },
    updateTask(state, action: PayloadAction<{ id: string; data: TaskPayload }>) {
      const index = state.items.findIndex((task) => task.id === action.payload.id);
      if (index !== -1) {
        state.items[index] = {
          ...state.items[index],
          ...action.payload.data,
        };
      }
    },
    deleteTask(state, action: PayloadAction<string>) {
      state.items = state.items.filter((task) => task.id !== action.payload);
    },
  },
});

export const { addTask, updateTask, deleteTask } = tasksSlice.actions;
export default tasksSlice.reducer;
