import { CharacterList, Loader, Pagination } from '@components/index';
import { useToast } from '@contexts/toastProvider';
import { useAppDispatch, useAppSelector } from '@hooks/index';
import { Character, CharacterWithFavorite } from '@models/index';
import { fetchFavorites } from '@store/favoritesSlice';
import { RootState } from '@store/index';
import { selectUseIsLoggedIn } from '@store/selectors';
import { markFavorites } from '@utils/index';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { api } from 'src/services';
import s from './searchPage.module.scss';

const productPerPage: number = 10;

export const SearchPage = () => {
  const [currentPage, setCurrentPage] = useState<number | null>(null);
  const [currentQuery, setCurrentQuery] = useState<string>('');
  const [totalPages, setTotalPages] = useState<number>(1);

  const { errorNotify } = useToast();
  const location = useLocation();
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useAppDispatch();
  const { favorites } = useAppSelector((state: RootState) => state.favorites);
  const [characters, setCharacters] = useState<Character[] | null>(null);
  const [preparedCharacters, setPreparedCharacters] = useState<CharacterWithFavorite[] | null>(null);
  const isLoggedIn = useSelector((state: RootState) => selectUseIsLoggedIn(state));

  useEffect(() => {
    const getFavorites = async () => {
      await dispatch(fetchFavorites());
    };

    if (isLoggedIn) {
      getFavorites();
    }
  }, [dispatch, isLoggedIn]);

  useEffect(() => {
    const fetchData = async (query: string, page: string) => {
      try {
        const response = await api.searchPeopleByName(query, page);
        setCharacters(response.results);
        setTotalPages(Math.ceil(response.count / productPerPage));
      } catch (error) {
        errorNotify((error as Error).message);
      }
    };

    const getParams = () => {
      const params = new URLSearchParams(location.search);
      const searchQuery = params.get('q') || '';
      const searchPage = params.get('page') || '1';

      setCurrentPage(+searchPage);
      setCurrentQuery(searchQuery);

      fetchData(searchQuery, searchPage);
    };

    getParams();
  }, [errorNotify, location.search]);

  useEffect(() => {
    if (currentPage) {
      const params = new URLSearchParams({ q: currentQuery, page: String(currentPage) });
      navigate(`/search?${params.toString()}`);
    }
  }, [currentPage, currentQuery, navigate]);

  useEffect(() => {
    if (characters) {
      const charactersWithFavorites = markFavorites(characters, favorites);
      setPreparedCharacters(charactersWithFavorites);
      setIsLoading(false);
    }
  }, [characters, favorites]);

  if (isLoading || preparedCharacters === null) {
    return (
      <div className={s.page}>
        <Loader />
      </div>
    );
  }

  return (
    <div className={s.page}>
      <main className={s.main}>
        {preparedCharacters.length > 0 ? (
          <>
            <CharacterList characters={preparedCharacters} />
            {currentPage && (
              <Pagination currentPage={currentPage} totalPages={totalPages} setCurrentPage={setCurrentPage} />
            )}
          </>
        ) : (
          <div className={s.emptySearch}>Sorry, we didn`t add something to favorite</div>
        )}
      </main>
    </div>
  );
};
