import { ErrorBoundary } from '@components/index.ts';
import { AuthProvider } from '@contexts/authProvider.tsx';
import { ThemeProvider } from '@contexts/themeProvider.tsx';
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
        <ThemeProvider>
          <AuthProvider>
            <AppRouter />
          </AuthProvider>
        </ThemeProvider>
      </Provider>
    </ErrorBoundary>
  </React.StrictMode>
);
