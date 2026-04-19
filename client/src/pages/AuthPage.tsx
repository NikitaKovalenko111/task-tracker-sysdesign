import { FormEvent, useState } from 'react';

export function AuthPage() {
  const [tab, setTab] = useState<'login' | 'register'>('login');

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
  };

  return (
    <section className="auth u-fade-up">
      <div className="auth__card">
        <h1 className="section-title">Добро пожаловать в TaskFlow</h1>
        <p className="auth__hint">Зарегистрируйтесь, чтобы управлять задачами проектов и командными чатами.</p>

        <div className="auth__tabs">
          <button
            className={`auth__tab ${tab === 'login' ? 'auth__tab--active' : ''}`}
            onClick={() => setTab('login')}
            type="button"
          >
            Вход
          </button>
          <button
            className={`auth__tab ${tab === 'register' ? 'auth__tab--active' : ''}`}
            onClick={() => setTab('register')}
            type="button"
          >
            Регистрация
          </button>
        </div>

        {tab === 'login' ? (
          <form className="form" onSubmit={handleSubmit}>
            <label className="form__label">
              Email
              <input className="form__input" type="email" placeholder="you@mail.com" required />
            </label>
            <label className="form__label">
              Пароль
              <input className="form__input" type="password" placeholder="Введите пароль" required />
            </label>
            <button className="button button--primary button--block" type="submit">
              Войти
            </button>
          </form>
        ) : (
          <form className="form" onSubmit={handleSubmit}>
            <div className="form__row">
              <label className="form__label">
                Имя
                <input className="form__input" type="text" placeholder="Алексей" required />
              </label>
              <label className="form__label">
                Фамилия
                <input className="form__input" type="text" placeholder="Петров" required />
              </label>
            </div>
            <label className="form__label">
              Email
              <input className="form__input" type="email" placeholder="you@mail.com" required />
            </label>
            <label className="form__label">
              Пароль
              <input className="form__input" type="password" placeholder="Придумайте пароль" required />
            </label>
            <button className="button button--primary button--block" type="submit">
              Создать аккаунт
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
