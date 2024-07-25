import { useSearchPeopleQuery } from '@/store/api/swapiApi';
import { fetchFavorites } from '@/store/favoritesSlice';
import { selectFavorites, selectUserIsLoggedIn } from '@/store/selectors';
import { markFavorites } from '@/utils';
import { useEffect, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { useAppDispatch } from './storeHooks';

const productPerPage: number = 10;

export const useCharacters = (currentQuery: string, currentPage: number) => {
  const dispatch = useAppDispatch();
  const favorites = useSelector(selectFavorites);
  const isLoggedIn = useSelector(selectUserIsLoggedIn);
  const { data: characters, isFetching: charactersIsFetching } = useSearchPeopleQuery({
    searchValue: currentQuery,
    page: currentPage,
  });

  useEffect(() => {
    const getFavorites = async () => {
      await dispatch(fetchFavorites());
    };

    if (isLoggedIn) {
      getFavorites();
    }
  }, [dispatch, isLoggedIn]);

  const totalPages = useMemo(() => {
    if (characters) {
      return Math.ceil(characters.count / productPerPage);
    }
    return 1;
  }, [characters]);

  const preparedCharacters = useMemo(() => {
    if (characters) {
      return markFavorites(characters.results, isLoggedIn && favorites ? favorites : []);
    }
    return null;
  }, [characters, favorites, isLoggedIn]);

  return { preparedCharacters, charactersIsFetching, totalPages };
};
