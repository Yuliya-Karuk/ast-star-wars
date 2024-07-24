import { MainLayout } from '@/components';
import { renderWithRouter } from '@/testSetup/render-router';
import '@testing-library/jest-dom';
import { screen } from '@testing-library/react';

describe('MainLayout', () => {
  it('renders all required components', async () => {
    renderWithRouter(<MainLayout />, {
      route: '/',
    });

    const headerLogo = await screen.findByRole('img', { name: /Logo/i });
    expect(headerLogo).toBeInTheDocument();

    const footerText = await screen.findByText('SWAPI API');
    expect(footerText).toBeInTheDocument();
  });
});
