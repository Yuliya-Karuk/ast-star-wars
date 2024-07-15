import { CharacterList, Loader, Pagination } from '@components/index';
import { useToast } from '@contexts/toastProvider';
import { useAppDispatch, useAppSelector } from '@hooks/index';
import { Character } from '@models/index';
import { fetchFavorites } from '@store/favoritesSlice';
import { RootState } from '@store/index';
import { useEffect, useState } from 'react';
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
  const [characters, setCharacters] = useState<Character[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      await dispatch(fetchFavorites());
      setIsLoading(false);
    };

    if (isLoading) {
      fetchData();
    }
  }, [dispatch, isLoading]);

  useEffect(() => {
    const fetchData = async (query: string, page: string) => {
      setIsLoading(true);
      try {
        const response = await api.searchPeopleByName(query, page);
        setTotalPages(Math.ceil(response.count / productPerPage));
        setCharacters(response.results);
      } catch (error) {
        errorNotify((error as Error).message);
      }
      setIsLoading(false);
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

  if (isLoading || characters === null) {
    return (
      <div className={s.page}>
        <Loader />
      </div>
    );
  }

  return (
    <div className={s.page}>
      <main className={s.main}>
        {characters.length > 0 ? (
          <>
            <CharacterList characters={characters} favorites={favorites} />
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
