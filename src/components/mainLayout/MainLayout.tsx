import { Outlet } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { Footer } from '../Footer/Footer';
import { Header } from '../Header/Header';

export const MainLayout = () => (
  <>
    <Header />
    <Outlet />
    <Footer />
    <ToastContainer position="top-center" autoClose={2000} className="Toastify" />
  </>
);
