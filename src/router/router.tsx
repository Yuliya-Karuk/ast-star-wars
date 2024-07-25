import { Loader, MainLayout } from '@/components';
import { selectUserIsLoading, selectUserIsLoggedIn } from '@store/selectors';
import { Suspense } from 'react';
import { lazily } from 'react-lazily';
import { useSelector } from 'react-redux';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { AppRoutes } from './routes';

const { Home } = lazily(() => import('../pages/index'));
const { Login } = lazily(() => import('../pages/index'));
const { Registration } = lazily(() => import('../pages/index'));
const { Favorites } = lazily(() => import('../pages/index'));
const { HistoryPage } = lazily(() => import('../pages/index'));
const { SearchPage } = lazily(() => import('../pages/index'));
const { NotFound } = lazily(() => import('../pages/index'));
const { Card } = lazily(() => import('../pages/index'));

interface RouteDescription {
  path: string;
  component: React.ComponentType;
}

const publicRoutes: RouteDescription[] = [
  { path: AppRoutes.HOME_ROUTE, component: Home },
  { path: AppRoutes.REGISTRATION_ROUTE, component: Registration },
  { path: AppRoutes.LOGIN_ROUTE, component: Login },
  { path: AppRoutes.SEARCH_ROUTE, component: SearchPage },
  { path: `${AppRoutes.CARD_ROUTE}/:id`, component: Card },
];

const authRoutes: RouteDescription[] = [
  { path: AppRoutes.FAVORITES_ROUTE, component: Favorites },
  { path: AppRoutes.HISTORY_ROUTE, component: HistoryPage },
];

interface Props {
  children: React.ReactNode;
}

function ProtectedRoute({ children }: Props) {
  const isLoggedIn = useSelector(selectUserIsLoggedIn);
  return isLoggedIn ? children : <Navigate to={AppRoutes.LOGIN_ROUTE} replace />;
}

export function AppRouter() {
  const isLoading = useSelector(selectUserIsLoading);
  const isLoggedIn = useSelector(selectUserIsLoggedIn);

  return (
    <BrowserRouter>
      <Suspense fallback={<Loader />}>
        {isLoading || isLoggedIn === null ? (
          <Loader />
        ) : (
          <Routes>
            <Route element={<MainLayout />}>
              {publicRoutes.map(({ path, component: Component }) => (
                <Route key={path} path={path} element={<Component />} />
              ))}
              {authRoutes.map(({ path, component: Component }) => (
                <Route
                  key={path}
                  path={path}
                  element={
                    <ProtectedRoute>
                      <Component />
                    </ProtectedRoute>
                  }
                />
              ))}
              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
        )}
      </Suspense>
    </BrowserRouter>
  );
}
