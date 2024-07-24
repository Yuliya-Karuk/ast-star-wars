import { CharacterList } from '@/components';
import { mockedCharacters } from '@/testSetup/msw/mocks';
import { renderWithRouter } from '@/testSetup/render-router';
import { cleanup, screen } from '@testing-library/react';
import * as ReactRouterDom from 'react-router-dom';
import { describe, expect, vi } from 'vitest';

vi.mock('react-router-dom', async importOriginal => {
  const actual = (await importOriginal()) as typeof ReactRouterDom;
  return {
    ...actual,
    MemoryRouter: actual.MemoryRouter,
    useNavigate: vi.fn(),
  };
});

vi.mock('@hooks/useHandleFavorites', () => ({
  handleToggleFavorite: vi.fn(),
  isLoggedIn: false,
}));

describe('CharacterList', () => {
  beforeEach(() => {
    vi.resetAllMocks();
    cleanup();
  });

  it('verify that the component renders the specified number of cards', async () => {
    renderWithRouter(<CharacterList characters={mockedCharacters.results} />, {
      route: '/',
    });

    const characterItems = await screen.findAllByRole('button');
    expect(characterItems.length).toBe(mockedCharacters.results.length);
  });

  it('check that an appropriate message is displayed if no cards are present', async () => {
    renderWithRouter(<CharacterList characters={[]} />, {
      route: '/',
    });

    const emptyMessage = await screen.findByText(/Sorry, we couldn`t find anything matching your search./i);
    expect(emptyMessage).toBeInTheDocument();
  });
});
