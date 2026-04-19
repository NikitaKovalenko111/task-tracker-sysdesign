import { useMemo, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { TaskModal } from '../components/TaskModal';
import { TaskStatusPill } from '../components/TaskStatusPill';
import { addTask, deleteTask, Task, TaskStatus, updateTask } from '../features/tasks/tasksSlice';

function formatDate(date: string) {
  const [year, month, day] = date.split('-');
  return `${day}.${month}.${year}`;
}

export function DashboardPage() {
  const dispatch = useAppDispatch();
  const tasks = useAppSelector((state) => state.tasks.items);

  const [searchText, setSearchText] = useState('');
  const [searchDate, setSearchDate] = useState('');
  const [searchStatus, setSearchStatus] = useState('');

  const [openModal, setOpenModal] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  const filteredTasks = useMemo(() => {
    const text = searchText.trim().toLowerCase();

    return tasks.filter((task) => {
      const byText = !text || task.title.toLowerCase().includes(text) || task.description.toLowerCase().includes(text);
      const byDate = !searchDate || task.dueDate === searchDate;
      const byStatus = !searchStatus || task.status === searchStatus;
      return byText && byDate && byStatus;
    });
  }, [tasks, searchText, searchDate, searchStatus]);

  const openCreateModal = () => {
    setEditingTask(null);
    setOpenModal(true);
  };

  const openEditModal = (task: Task) => {
    setEditingTask(task);
    setOpenModal(true);
  };

  return (
    <>
      <section className="u-fade-up">
        <h1 className="main-title">Планировщик задач</h1>
        <p className="muted-text">Создавайте, редактируйте и удаляйте задачи. Поиск работает по названию, описанию и дате.</p>
      </section>

      <section className="search-panel page__section u-fade-up u-delay-1">
        <h2 className="search-panel__title">Поиск задач</h2>
        <div className="search-panel__grid">
          <input
            className="form__input"
            onChange={(event) => setSearchText(event.target.value)}
            placeholder="Поиск по названию и описанию"
            type="text"
            value={searchText}
          />
          <input className="form__input" onChange={(event) => setSearchDate(event.target.value)} type="date" value={searchDate} />
          <select className="form__select" onChange={(event) => setSearchStatus(event.target.value)} value={searchStatus}>
            <option value="">Любой статус</option>
            <option value="todo">К выполнению</option>
            <option value="in-progress">В работе</option>
            <option value="done">Готово</option>
          </select>
          <button className="button button--primary" onClick={openCreateModal} type="button">
            + Новая задача
          </button>
        </div>
      </section>

      <section className="page__section task-list">
        {filteredTasks.map((task, index) => (
          <article key={task.id} className={`task-item u-fade-up u-delay-${Math.min(index + 1, 3)}`}>
            <div className="task-item__top">
              <h3 className="task-item__title">{task.title}</h3>
              <TaskStatusPill status={task.status} />
            </div>
            <p className="task-item__description">{task.description}</p>
            <div className="task-item__meta">
              <span>Срок: {formatDate(task.dueDate)}</span>
              <span>Проект: {task.projectName}</span>
            </div>
            <div className="task-item__actions">
              <button className="button button--soft" onClick={() => openEditModal(task)} type="button">
                Редактировать
              </button>
              <button className="button button--danger" onClick={() => dispatch(deleteTask(task.id))} type="button">
                Удалить
              </button>
            </div>
          </article>
        ))}
      </section>

      <TaskModal
        initialTask={editingTask}
        onClose={() => setOpenModal(false)}
        onSubmit={(data) => {
          if (editingTask) {
            dispatch(updateTask({ id: editingTask.id, data }));
          } else {
            dispatch(addTask(data));
          }
          setOpenModal(false);
        }}
        open={openModal}
      />
    </>
  );
}
