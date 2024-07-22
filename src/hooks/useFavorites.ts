import { CharacterWithFavorite } from '@models/index';
import { AppRoutes } from '@router/routes';
import { useGetCharactersByIdsQuery } from '@store/api/swapiApi';
import { fetchFavorites } from '@store/favoritesSlice';
import { selectFavorites, selectUseIsLoggedIn } from '@store/selectors';
import { markFavorites } from '@utils/utils';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from './storeHooks';

export const useFavorites = () => {
  const isLoggedIn = useSelector(selectUseIsLoggedIn);
  const dispatch = useAppDispatch();
  const favorites = useSelector(selectFavorites);
  const [preparedCharacters, setPreparedCharacters] = useState<CharacterWithFavorite[] | null>(null);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

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

  useEffect(() => {
    if (!isFetching) {
      if (characters && favorites && characters.length === favorites.length) {
        const charactersWithFavorites = markFavorites(characters, favorites);
        setPreparedCharacters(charactersWithFavorites);
        setIsLoading(false);
      }
    }
  }, [characters, favorites, isFetching]);

  useEffect(() => {
    if (isLoggedIn === false) {
      navigate(AppRoutes.LOGIN_ROUTE);
    }
  }, [isLoggedIn, navigate]);

  return { isLoading, preparedCharacters };
};
