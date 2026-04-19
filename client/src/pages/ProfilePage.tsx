import { FormEvent } from 'react';
import { useAppSelector } from '../app/hooks';

export function ProfilePage() {
  const user = useAppSelector((state) => state.user);
  const projects = useAppSelector((state) => state.projects.items);

  const initials = `${user.firstName[0]}${user.lastName[0]}`;

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
  };

  return (
    <div className="profile">
      <section className="profile__hero u-fade-up">
        <div className="profile__row">
          <div className="profile__avatar">{initials}</div>
          <button className="button button--soft" type="button">
            Редактировать профиль
          </button>
        </div>
        <h1 className="section-title">
          {user.firstName} {user.lastName}
        </h1>
        <p className="muted-text">
          {user.role}. Курирую проекты Smart Home Hub и Doc Assistant.
        </p>
      </section>

      <section className="page__grid page__grid--2">
        <article className="card u-fade-up u-delay-1">
          <div className="card__header">
            <h2>Мои проекты</h2>
          </div>
          <div className="card__body">
            <div className="member-list">
              {projects.map((project) => (
                <div className="member-list__item" key={project.id}>
                  <span>{project.name}</span>
                  <span className="muted-text">{project.tasks} задач</span>
                </div>
              ))}
            </div>
          </div>
        </article>

        <article className="card u-fade-up u-delay-2">
          <div className="card__header">
            <h2>Настройки аккаунта</h2>
          </div>
          <div className="card__body">
            <form className="form" onSubmit={handleSubmit}>
              <label className="form__label">
                Имя
                <input className="form__input" defaultValue={user.firstName} type="text" />
              </label>
              <label className="form__label">
                Email
                <input className="form__input" defaultValue={user.email} type="email" />
              </label>
              <div className="form__actions">
                <button className="button button--primary" type="submit">
                  Сохранить изменения
                </button>
              </div>
            </form>
          </div>
        </article>
      </section>
    </div>
  );
}
