import { useGetCharactersByIdsQuery } from '@/store/api/swapiApi';
import { fetchFavorites } from '@/store/favoritesSlice';
import { selectFavorites, selectUserIsLoggedIn } from '@/store/selectors';
import { markFavorites } from '@/utils';
import { useEffect, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { useAppDispatch } from './storeHooks';

export const useFavorites = () => {
  const isLoggedIn = useSelector(selectUserIsLoggedIn);
  const dispatch = useAppDispatch();
  const favorites = useSelector(selectFavorites);

  const { data: characters, isFetching } = useGetCharactersByIdsQuery(favorites || [], {
    skip: !isLoggedIn || !favorites,
  });

  useEffect(() => {
    const getFavorites = async () => {
      await dispatch(fetchFavorites());
    };

    if (isLoggedIn) {
      getFavorites();
    }
  }, [dispatch, isLoggedIn]);

  const { preparedCharacters, isLoading } = useMemo(() => {
    if (characters && favorites && characters.length === favorites.length && !isFetching) {
      const charactersWithFavorites = markFavorites(characters, favorites);
      return { preparedCharacters: charactersWithFavorites, isLoading: false };
    }
    return { preparedCharacters: null, isLoading: true };
  }, [characters, favorites, isFetching]);

  return { isLoading, preparedCharacters };
};
