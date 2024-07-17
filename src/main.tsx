import { ErrorBoundary } from '@components/index.ts';
import { AuthProvider } from '@contexts/authProvider.tsx';
import { FilmsProvider } from '@contexts/dataProvider.tsx';
import { ToastProvider } from '@contexts/toastProvider.tsx';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { AppRouter } from './router/router.tsx';
import { store } from './store/index.ts';
import './styles/index.scss';

const root = document.getElementById('root') as HTMLElement;

ReactDOM.createRoot(root).render(
  <React.StrictMode>
    <ErrorBoundary>
      <Provider store={store}>
        <ToastProvider>
          <AuthProvider>
            <FilmsProvider>
              <AppRouter />
            </FilmsProvider>
          </AuthProvider>
        </ToastProvider>
      </Provider>
    </ErrorBoundary>
  </React.StrictMode>
);
