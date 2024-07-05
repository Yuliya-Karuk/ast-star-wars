import { Home, Login, NotFound, Registration } from '@pages/index';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { MainLayout } from '../components';
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
