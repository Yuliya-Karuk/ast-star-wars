import { CharacterWithFavorite } from '@models/index';
import { useSearchPeopleQuery } from '@store/api/swapiApi';
import { fetchFavorites } from '@store/favoritesSlice';
import { selectFavorites, selectUseIsLoggedIn } from '@store/selectors';
import { markFavorites } from '@utils/utils';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useAppDispatch } from './storeHooks';

const productPerPage: number = 10;

export const useCharacters = (currentQuery: string, currentPage: number) => {
  const dispatch = useAppDispatch();
  const favorites = useSelector(selectFavorites);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [preparedCharacters, setPreparedCharacters] = useState<CharacterWithFavorite[] | null>(null);
  const isLoggedIn = useSelector(selectUseIsLoggedIn);
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

  useEffect(() => {
    if (characters && favorites) {
      setTotalPages(Math.ceil(characters.count / productPerPage));
      const charactersWithFavorites = markFavorites(characters.results, favorites);
      setPreparedCharacters(charactersWithFavorites);
    }
  }, [characters, favorites]);

  return { preparedCharacters, charactersIsFetching, totalPages };
};
