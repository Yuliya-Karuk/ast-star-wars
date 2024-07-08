import { CharacterList } from '@components/index';
import { useToast } from '@contexts/toastProvider';
import { Character } from '@models/index';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { api } from 'src/services';
import s from './searchPage.module.scss';

export const SearchPage = () => {
  const location = useLocation();
  // const [page, setPage] = useState<number>(1);
  const [isLoading, setIsLoading] = useState(true);
  const [characters, setCharacters] = useState<Character[]>([]);
  const { errorNotify } = useToast();

  useEffect(() => {
    const fetchData = async () => {
      const params = new URLSearchParams(location.search);
      const searchQuery = params.get('q') || '';
      const searchPage = params.get('page') || '1';

      // setPage(+searchPage);
      try {
        const response = await api.searchPeopleByName(searchQuery, searchPage);
        setCharacters(response.results);
        setIsLoading(false);
      } catch (error) {
        errorNotify((error as Error).message);
      }
    };

    fetchData();
  }, [errorNotify, location.search]);

  return (
    <div className={s.page}>
      <CharacterList characters={characters} isLoading={isLoading} />
    </div>
  );
};
