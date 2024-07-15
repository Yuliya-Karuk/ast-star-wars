import { MainLayout } from '@components/index';
import { Favorites, Home, Login, NotFound, Registration, SearchPage } from '@pages/index';
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
        <Route path={AppRoutes.FAVORITES_ROUTE} element={<Favorites />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  </BrowserRouter>
);
