import { AuthProvider } from '@contexts/authProvider.tsx';
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
    <Provider store={store}>
      <ToastProvider>
        <AuthProvider>
          <AppRouter />
        </AuthProvider>
      </ToastProvider>
    </Provider>
  </React.StrictMode>
);
