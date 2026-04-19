import { FormEvent, useEffect, useState } from 'react';
import { Task, TaskPayload, TaskStatus } from '../features/tasks/tasksSlice';

interface TaskModalProps {
  open: boolean;
  initialTask: Task | null;
  onClose: () => void;
  onSubmit: (data: TaskPayload) => void;
}

export function TaskModal({ open, initialTask, onClose, onSubmit }: TaskModalProps) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [status, setStatus] = useState<TaskStatus>('todo');
  const [projectName, setProjectName] = useState('Smart Home Hub');

  useEffect(() => {
    if (initialTask) {
      setTitle(initialTask.title);
      setDescription(initialTask.description);
      setDueDate(initialTask.dueDate);
      setStatus(initialTask.status);
      setProjectName(initialTask.projectName);
      return;
    }

    setTitle('');
    setDescription('');
    setDueDate('');
    setStatus('todo');
    setProjectName('Smart Home Hub');
  }, [initialTask, open]);

  if (!open) return null;

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    if (!title.trim() || !dueDate) return;

    onSubmit({
      title: title.trim(),
      description: description.trim(),
      dueDate,
      status,
      projectName: projectName.trim() || 'Без проекта',
    });
  };

  return (
    <div className="modal modal--open" onClick={onClose}>
      <div className="modal__card" onClick={(event) => event.stopPropagation()}>
        <div className="card">
          <div className="card__header">
            <h3>{initialTask ? 'Редактирование задачи' : 'Создание задачи'}</h3>
            <button className="button button--ghost" onClick={onClose} type="button">
              Закрыть
            </button>
          </div>
          <div className="card__body">
            <form className="form" onSubmit={handleSubmit}>
              <label className="form__label">
                Название задачи
                <input className="form__input" value={title} onChange={(e) => setTitle(e.target.value)} type="text" required />
              </label>
              <label className="form__label">
                Описание
                <textarea
                  className="form__textarea"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Подробности по задаче"
                />
              </label>
              <div className="form__row">
                <label className="form__label">
                  Дата
                  <input className="form__input" value={dueDate} onChange={(e) => setDueDate(e.target.value)} type="date" required />
                </label>
                <label className="form__label">
                  Статус
                  <select className="form__select" value={status} onChange={(e) => setStatus(e.target.value as TaskStatus)}>
                    <option value="todo">К выполнению</option>
                    <option value="in-progress">В работе</option>
                    <option value="done">Готово</option>
                  </select>
                </label>
              </div>
              <label className="form__label">
                Проект
                <input className="form__input" value={projectName} onChange={(e) => setProjectName(e.target.value)} type="text" />
              </label>
              <div className="form__actions">
                <button className="button button--ghost" onClick={onClose} type="button">
                  Отмена
                </button>
                <button className="button button--primary" type="submit">
                  Сохранить
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
