import { CharacterItem } from '@/components';
import { mockedCharacter } from '@/testSetup/msw/mocks';
import { renderWithRouter } from '@/testSetup/render-router';
import { screen } from '@testing-library/react';

describe('CharacterItem rendering', () => {
  afterAll(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('Ensure that the card component renders the relevant card data', async () => {
    renderWithRouter(<CharacterItem character={mockedCharacter} />, {
      route: '/',
    });

    const characterName = await screen.findByText('Luke Skywalker Mocked');
    expect(characterName).toBeInTheDocument();

    const birthYear = await screen.findByText('19BBY');
    expect(birthYear).toBeInTheDocument();
  });
});
