import { CharacterItem } from '@components/CharacterItem/CharacterItem';
import { screen } from '@testing-library/react';
import { mockedCharacter } from 'src/testSetup/msw/mocks';
import { renderWithRouter } from 'src/testSetup/render-router';

describe('CharacterItem rendering', () => {
  afterAll(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('Ensure that the card component renders the relevant card data', () => {
    renderWithRouter(<CharacterItem character={mockedCharacter} />, {
      route: '/',
    });

    const characterName = screen.getByText('Luke Skywalker Mocked');
    expect(characterName).toBeInTheDocument();

    const birthYear = screen.getByText('19BBY');
    expect(birthYear).toBeInTheDocument();
  });
});
