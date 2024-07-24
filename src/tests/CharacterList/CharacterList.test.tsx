import { CharacterList } from '@components/CharacterList/CharacterList';
import { cleanup, screen } from '@testing-library/react';
import * as ReactRouterDom from 'react-router-dom';
import { mockedCharacters } from 'src/testSetup/msw/mocks';
import { renderWithRouter } from 'src/testSetup/render-router';
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

  it('verify that the component renders the specified number of cards', () => {
    renderWithRouter(<CharacterList characters={mockedCharacters.results} />, {
      route: '/',
    });

    const characterItems = screen.getAllByRole('button');
    expect(characterItems.length).toBe(mockedCharacters.results.length);
  });

  it('check that an appropriate message is displayed if no cards are present', () => {
    renderWithRouter(<CharacterList characters={[]} />, {
      route: '/',
    });

    const emptyMessage = screen.getByText(/Sorry, we couldn`t find anything matching your search./i);
    expect(emptyMessage).toBeInTheDocument();
  });
});
