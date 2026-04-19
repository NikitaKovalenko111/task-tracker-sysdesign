import { TaskStatus } from '../features/tasks/tasksSlice';

const statusText: Record<TaskStatus, string> = {
  todo: 'Планирование',
  'in-progress': 'В разработке',
  done: 'MVP готов',
};

export function ProjectStatusPill({ status }: { status: TaskStatus }) {
  return <span className={`status-pill status-pill--${status}`}>{statusText[status]}</span>;
}
