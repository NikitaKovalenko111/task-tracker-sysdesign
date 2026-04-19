import { createSlice } from '@reduxjs/toolkit';

export interface Project {
  id: string;
  name: string;
  description: string;
  tasks: number;
  members: number;
  updatedAt: string;
  status: 'todo' | 'in-progress' | 'done';
  isPublic: boolean;
}

interface ProjectsState {
  items: Project[];
  currentProjectId: string;
  members: { id: string; name: string; role: string }[];
}

const initialState: ProjectsState = {
  items: [
    {
      id: 'p1',
      name: 'Smart Home Hub',
      description: 'Объединяем IoT-устройства в единый домашний дашборд с расписаниями и уведомлениями.',
      tasks: 38,
      members: 12,
      updatedAt: '19.04.2026',
      status: 'in-progress',
      isPublic: true,
    },
    {
      id: 'p2',
      name: 'Doc Assistant',
      description: 'Сервис умного поиска по документации команды с генерацией контекста для задач.',
      tasks: 22,
      members: 7,
      updatedAt: '18.04.2026',
      status: 'todo',
      isPublic: true,
    },
    {
      id: 'p3',
      name: 'Eco Route',
      description: 'Оптимизация городских маршрутов с учетом экологии, трафика и общественного транспорта.',
      tasks: 51,
      members: 18,
      updatedAt: '17.04.2026',
      status: 'done',
      isPublic: true,
    },
  ],
  currentProjectId: 'p1',
  members: [
    { id: 'm1', name: 'Анна Смирнова', role: 'Admin' },
    { id: 'm2', name: 'Игорь Иванов', role: 'Editor' },
    { id: 'm3', name: 'Мария Петрова', role: 'Member' },
  ],
};

const projectsSlice = createSlice({
  name: 'projects',
  initialState,
  reducers: {},
});

export default projectsSlice.reducer;
