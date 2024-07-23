import { MainLayout } from '@components/MainLayout/MainLayout';
import '@testing-library/jest-dom';
import { screen } from '@testing-library/react';
import { renderWithRouter } from 'src/testSetup/render-router';

describe('MainLayout', () => {
  it('renders all required components', () => {
    renderWithRouter(<MainLayout />, {
      route: '/',
    });

    const headerLogo = screen.getByRole('img', { name: /Logo/i });
    expect(headerLogo).toBeInTheDocument();

    const footerText = screen.getByText('SWAPI API');
    expect(footerText).toBeInTheDocument();
  });
});
