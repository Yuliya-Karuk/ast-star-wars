import { CharacterWithFavorite, CharacterWithId, FavoriteItem } from '@/models';
import { FirebaseError } from 'firebase/app';
import { DefaultError, EmailAlreadyRegistered, UserCredentialError } from './constants';

export const extractIdFromUrl = (url: string): string => {
  const parts = url.split('/');
  return parts[parts.length - 2];
};

export const catchAuthErrors = (error: FirebaseError): string => {
  switch (error.code) {
    case 'auth/invalid-credential':
      return UserCredentialError;
    case 'auth/email-already-in-use':
      return EmailAlreadyRegistered;
    default:
      return DefaultError;
  }
};

export const getPaginationRange = (currentPage: number, totalPages: number): number[] => {
  const rangeSize = 5;
  const start = Math.floor((currentPage - 1) / rangeSize) * rangeSize + 1;
  const end = Math.min(start + rangeSize - 1, totalPages);

  return Array.from({ length: end - start + 1 }, (_, i) => start + i);
};

export function markFavorites(characters: CharacterWithId[], favorites: FavoriteItem[]): CharacterWithFavorite[] {
  const favoriteIds = new Set(favorites.map(fav => fav.id));

  return characters.map(character => ({
    ...character,
    isFavorite: favoriteIds.has(extractIdFromUrl(character.url)),
  }));
}

export function isNotNullable<T>(value: T, errorMessage?: string): NonNullable<T> {
  if (value === undefined || value === null) {
    throw new Error(errorMessage || 'Not expected value');
  }
  return value;
}

export function extractPlanetPath(url: string): string {
  const baseUrl = 'https://swapi.dev/api/';
  return url.slice(baseUrl.length);
}

export function extractQueryParameter(url: string): string | null {
  return url.split('q=')[1] || null;
}

export const urlImgTemplates = {
  character: (characterId: string) => `https://starwars-visualguide.com/assets/img/characters/${characterId}.jpg`,
  film: (episodeId: string) => `https://starwars-visualguide.com/assets/img/films/${episodeId}.jpg`,
  planet: (planetId: string) => `https://starwars-visualguide.com/assets/img/planets/${planetId}.jpg`,
};
