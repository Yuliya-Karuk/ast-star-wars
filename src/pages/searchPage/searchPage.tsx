import { CharacterList, Pagination } from '@components/index';
import { useToast } from '@contexts/toastProvider';
import { Character } from '@models/index';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { api } from 'src/services';
import s from './searchPage.module.scss';

const productPerPage: number = 10;

export const SearchPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [characters, setCharacters] = useState<Character[]>([]);

  const [currentPage, setCurrentPage] = useState<number | null>(null);
  const [currentQuery, setCurrentQuery] = useState<string>('');
  const [totalPages, setTotalPages] = useState<number>(1);

  const { errorNotify } = useToast();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async (query: string, page: string) => {
      try {
        const response = await api.searchPeopleByName(query, page);
        setTotalPages(Math.ceil(response.count / productPerPage));
        setCharacters(response.results);
        setIsLoading(false);
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

  return (
    <div className={s.page}>
      <CharacterList characters={characters} isLoading={isLoading} />
      {currentPage && <Pagination currentPage={currentPage} totalPages={totalPages} setCurrentPage={setCurrentPage} />}
    </div>
  );
};
