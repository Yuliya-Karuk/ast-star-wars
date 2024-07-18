import { Loader, MainLayout } from '@components/index';
import { Suspense } from 'react';
import { lazily } from 'react-lazily';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { AppRoutes } from './routes';

const { Home } = lazily(() => import('../pages/index'));
const { Login } = lazily(() => import('../pages/index'));
const { Registration } = lazily(() => import('../pages/index'));
const { Favorites } = lazily(() => import('../pages/index'));
const { HistoryPage } = lazily(() => import('../pages/index'));
const { SearchPage } = lazily(() => import('../pages/index'));
const { NotFound } = lazily(() => import('../pages/index'));
const { Card } = lazily(() => import('../pages/index'));

export const AppRouter = () => (
  <BrowserRouter>
    <Suspense fallback={<Loader />}>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path={AppRoutes.HOME_ROUTE} element={<Home />} />
          <Route path={AppRoutes.REGISTRATION_ROUTE} element={<Registration />} />
          <Route path={AppRoutes.LOGIN_ROUTE} element={<Login />} />
          <Route path={AppRoutes.SEARCH_ROUTE} element={<SearchPage />} />
          <Route path={AppRoutes.FAVORITES_ROUTE} element={<Favorites />} />
          <Route path={AppRoutes.HISTORY_ROUTE} element={<HistoryPage />} />
          <Route path={`${AppRoutes.CARD_ROUTE}/:id`} element={<Card />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  </BrowserRouter>
);
