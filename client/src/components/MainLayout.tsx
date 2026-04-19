import { Outlet } from 'react-router-dom';
import { Topbar } from './Topbar';

export function MainLayout() {
  return (
    <>
      <Topbar />
      <main className="page__container page__section">
        <Outlet />
      </main>
    </>
  );
}
