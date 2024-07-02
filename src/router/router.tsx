import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { MainLayout } from '../components';
import { Home, NotFound } from '../pages';
import { AppRoutes } from './routes';

export const AppRouter = () => (
  <BrowserRouter>
    <Routes>
      <Route element={<MainLayout />}>
        <Route path={AppRoutes.HOME_ROUTE} element={<Home />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  </BrowserRouter>
);
