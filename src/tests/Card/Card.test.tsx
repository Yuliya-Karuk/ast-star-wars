import { Card } from '@/pages';
import { renderWithRouter } from '@/testSetup/render-router';
import { cleanup, screen } from '@testing-library/react';
import { vi } from 'vitest';

describe('Card Component', () => {
  afterAll(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.restoreAllMocks();
    cleanup();
  });

  it('should display character details when data is available', async () => {
    renderWithRouter(<Card />, { route: '/people/1', path: '/people/:id' });

    const loader = await screen.findByTestId('loader');
    expect(loader).toBeInTheDocument();
  });

  it('Make sure the detailed card component correctly displays the detailed card data;', async () => {
    renderWithRouter(<Card />, { route: '/people/1', path: '/people/:id' });

    const characterName = await screen.findByText('Luke Skywalker Details');
    expect(characterName).toBeInTheDocument();

    const birthYear = await screen.findByText('19BBY');
    expect(birthYear).toBeInTheDocument();

    const planet = await screen.findByText('Tatooine Mocked');
    expect(planet).toBeInTheDocument();
  });
});
