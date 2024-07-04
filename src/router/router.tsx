import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { MainLayout } from '../components';
import { Home, NotFound } from '../pages';
import { Login } from '../pages/login/login';
import { Registration } from '../pages/registration/registration';
import { AppRoutes } from './routes';

export const AppRouter = () => (
  <BrowserRouter>
    <Routes>
      <Route element={<MainLayout />}>
        <Route path={AppRoutes.HOME_ROUTE} element={<Home />} />
        <Route path={AppRoutes.REGISTRATION_ROUTE} element={<Registration />} />
        <Route path={AppRoutes.LOGIN_ROUTE} element={<Login />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  </BrowserRouter>
);
