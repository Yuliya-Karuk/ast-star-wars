import { MainLayout } from '@components/index';
import { Home, Login, NotFound, Registration } from '@pages/index';
import { SearchPage } from '@pages/searchPage/searchPage';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { AppRoutes } from './routes';

export const AppRouter = () => (
  <BrowserRouter>
    <Routes>
      <Route element={<MainLayout />}>
        <Route path={AppRoutes.HOME_ROUTE} element={<Home />} />
        <Route path={AppRoutes.REGISTRATION_ROUTE} element={<Registration />} />
        <Route path={AppRoutes.LOGIN_ROUTE} element={<Login />} />
        <Route path={AppRoutes.SEARCH_ROUTE} element={<SearchPage />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  </BrowserRouter>
);
