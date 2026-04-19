import { TaskStatus } from '../features/tasks/tasksSlice';

const statusText: Record<TaskStatus, string> = {
  todo: 'К выполнению',
  'in-progress': 'В работе',
  done: 'Готово',
};

export function TaskStatusPill({ status }: { status: TaskStatus }) {
  return <span className={`status-pill status-pill--${status}`}>{statusText[status]}</span>;
}
