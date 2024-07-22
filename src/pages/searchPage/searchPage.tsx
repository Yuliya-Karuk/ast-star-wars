import { CharacterList, Loader, Pagination } from '@components/index';
import { useAppDispatch } from '@hooks/index';
import { CharacterWithFavorite } from '@models/index';
import { useSearchPeopleQuery } from '@store/api/swapiApi';
import { fetchFavorites } from '@store/favoritesSlice';
import { selectFavorites, selectUseIsLoggedIn } from '@store/selectors';
import { markFavorites } from '@utils/index';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import s from './searchPage.module.scss';

const productPerPage: number = 10;

export const SearchPage = () => {
  const [searchParams] = useSearchParams();
  const urlQuery = searchParams.get('q') || '';
  const urlPage = searchParams.get('page') || '';
  const initialPage = urlPage ? +urlPage : 1;
  const [currentPage, setCurrentPage] = useState<number>(initialPage);
  const [currentQuery, setCurrentQuery] = useState<string>(urlQuery);
  const [totalPages, setTotalPages] = useState<number>(1);

  const dispatch = useAppDispatch();
  const favorites = useSelector(selectFavorites);
  const [preparedCharacters, setPreparedCharacters] = useState<CharacterWithFavorite[] | null>(null);
  const isLoggedIn = useSelector(selectUseIsLoggedIn);
  const { data: characters, isLoading: charactersLoading } = useSearchPeopleQuery({
    searchValue: currentQuery,
    page: currentPage,
  });

  useEffect(() => {
    const query = searchParams.get('q') || '';
    const page = searchParams.get('page') || 1;

    setCurrentQuery(query);
    setCurrentPage(+page);
  }, [searchParams]);

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

  if (charactersLoading || preparedCharacters === null) {
    return <Loader />;
  }

  return (
    <main className={s.main}>
      {preparedCharacters && (
        <>
          <CharacterList characters={preparedCharacters} />
          {currentPage && <Pagination currentPage={currentPage} totalPages={totalPages} />}
        </>
      )}
    </main>
  );
};
