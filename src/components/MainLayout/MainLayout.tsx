import { useTheme } from '@contexts/themeProvider';
import cn from 'classnames';
import { Outlet } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Footer } from '../Footer/Footer';
import { Header } from '../Header/Header';
import s from './MainLayout.module.scss';

export const MainLayout = () => {
  const { theme } = useTheme();

  return (
    <>
      <Header />
      <div className={cn(s.page, { [s.light]: theme === 'light' })}>
        <Outlet />
      </div>
      <Footer />
      <ToastContainer position="top-center" autoClose={2000} className="Toastify" />
    </>
  );
};
