import { FormEvent, useState } from 'react';
import { useAppSelector } from '../app/hooks';

interface Message {
  id: string;
  author: string;
  text: string;
  mine?: boolean;
}

export function ProjectPage() {
  const currentProjectId = useAppSelector((state) => state.projects.currentProjectId);
  const project = useAppSelector((state) => state.projects.items.find((item) => item.id === currentProjectId));
  const members = useAppSelector((state) => state.projects.members);

  const [messages, setMessages] = useState<Message[]>([
    { id: '1', author: 'Анна', text: 'Ребята, обновила roadmap по задачам backend.' },
    { id: '2', author: 'Вы', text: 'Отлично, беру в работу блок уведомлений.', mine: true },
    { id: '3', author: 'Игорь', text: 'Добавил макет новой карточки устройства.' },
  ]);
  const [messageText, setMessageText] = useState('');

  if (!project) return null;

  const handleSend = (event: FormEvent) => {
    event.preventDefault();
    const text = messageText.trim();
    if (!text) return;

    setMessages((prev) => [...prev, { id: String(Date.now()), author: 'Вы', text, mine: true }]);
    setMessageText('');
  };

  return (
    <>
      <section className="project-hero u-fade-up">
        <h1 className="main-title">{project.name}</h1>
        <p className="project-hero__desc">
          Кабинет проекта с общей информацией, командой, задачами и внутренним чатом для оперативной коммуникации.
        </p>
        <div className="project-hero__meta">
          <span>Описание: интеграция устройств, аналитика, уведомления</span>
          <span>Участников: {project.members}</span>
          <span>Открытый доступ: да</span>
        </div>
      </section>

      <section className="page__section page__grid page__grid--2">
        <article className="card u-fade-up u-delay-1">
          <div className="card__header">
            <h2>Участники проекта</h2>
            <button className="button button--soft" type="button">
              + Добавить
            </button>
          </div>
          <div className="card__body">
            <form className="form" onSubmit={(event) => event.preventDefault()}>
              <div className="form__row">
                <label className="form__label">
                  Email пользователя
                  <input className="form__input" placeholder="member@mail.com" type="email" />
                </label>
                <label className="form__label">
                  Роль
                  <select className="form__select">
                    <option>Участник</option>
                    <option>Редактор</option>
                    <option>Администратор</option>
                  </select>
                </label>
              </div>
              <div className="form__actions">
                <button className="button button--primary" type="submit">
                  Добавить в проект
                </button>
              </div>
            </form>

            <div className="member-list">
              {members.map((member) => (
                <div className="member-list__item" key={member.id}>
                  <span>{member.name}</span>
                  <span className="muted-text">{member.role}</span>
                </div>
              ))}
            </div>
          </div>
        </article>

        <article className="card u-fade-up u-delay-2">
          <div className="card__header">
            <h2>Чат проекта</h2>
            <span className="muted-text">Онлайн: 6</span>
          </div>
          <div className="card__body">
            <div className="chat">
              <div className="chat__messages">
                {messages.map((message) => (
                  <div className={`chat__message ${message.mine ? 'chat__message--me' : ''}`} key={message.id}>
                    <div className="chat__author">{message.author}</div>
                    {message.text}
                  </div>
                ))}
              </div>
              <form className="chat__composer" onSubmit={handleSend}>
                <input
                  className="form__input"
                  onChange={(event) => setMessageText(event.target.value)}
                  placeholder="Напишите сообщение"
                  type="text"
                  value={messageText}
                />
                <button className="button button--primary" type="submit">
                  Отправить
                </button>
              </form>
            </div>
          </div>
        </article>
      </section>
    </>
  );
}
