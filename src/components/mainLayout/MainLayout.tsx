import { Outlet } from 'react-router-dom';

export const MainLayout = () => (
  <>
    <header>Header</header>
    <main>
      <Outlet />
    </main>
    <footer>Footer</footer>
  </>
);
