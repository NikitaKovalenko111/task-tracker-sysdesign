import { NavLink } from 'react-router-dom';

export function Topbar() {
  return (
    <header className="topbar">
      <div className="page__container topbar__inner">
        <NavLink className="topbar__brand" to="/">
          <span className="topbar__mark" />
          TaskFlow
        </NavLink>
        <nav className="topbar__nav">
          <NavLink className={({ isActive }) => `topbar__link ${isActive ? 'topbar__link--active' : ''}`} to="/">
            Лента проектов
          </NavLink>
          <NavLink
            className={({ isActive }) => `topbar__link ${isActive ? 'topbar__link--active' : ''}`}
            to="/dashboard"
          >
            Мои задачи
          </NavLink>
          <NavLink
            className={({ isActive }) => `topbar__link ${isActive ? 'topbar__link--active' : ''}`}
            to="/project"
          >
            Проект
          </NavLink>
          <NavLink
            className={({ isActive }) => `topbar__link ${isActive ? 'topbar__link--active' : ''}`}
            to="/profile"
          >
            Профиль
          </NavLink>
          <NavLink className={({ isActive }) => `topbar__link ${isActive ? 'topbar__link--active' : ''}`} to="/auth">
            Войти
          </NavLink>
        </nav>
      </div>
    </header>
  );
}
