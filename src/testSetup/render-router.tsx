import { AuthProvider } from '@contexts/authProvider';
import { ThemeProvider } from '@contexts/themeProvider';
import { store } from '@store/index';
import { render } from '@testing-library/react';
import { ReactNode } from 'react';

import { Provider } from 'react-redux';
import { MemoryRouter, Route, Routes } from 'react-router-dom';

export const renderWithRouter = (ui: ReactNode, { route = '/' } = {}) => {
  window.history.pushState({}, 'Test page', route);

  return render(
    <Provider store={store}>
      <ThemeProvider>
        <MemoryRouter initialEntries={[route]}>
          <AuthProvider>
            <Routes>
              <Route path="/" element={ui} />
            </Routes>
          </AuthProvider>
        </MemoryRouter>
      </ThemeProvider>
    </Provider>
  );
};
