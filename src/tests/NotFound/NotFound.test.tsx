import { NotFound } from '@/pages';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

describe('Not Found', () => {
  it('renders all required components', async () => {
    render(
      <MemoryRouter initialEntries={['/404']}>
        <NotFound />
      </MemoryRouter>
    );

    const pageText = await screen.findByText('Back to Home page');
    expect(pageText).toBeInTheDocument();
  });
});
