import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useCharacters } from './useCharacters';

export const usePaginatedCharacters = () => {
  const [searchParams] = useSearchParams();
  const urlQuery = searchParams.get('q') || '';
  const urlPage = searchParams.get('page') || '';
  const initialPage = urlPage ? +urlPage : 1;
  const [currentPage, setCurrentPage] = useState<number>(initialPage);
  const [currentQuery, setCurrentQuery] = useState<string>(urlQuery);
  const { charactersIsFetching, preparedCharacters, totalPages } = useCharacters(currentQuery, currentPage);

  useEffect(() => {
    const query = searchParams.get('q') || '';
    const page = searchParams.get('page') || 1;

    setCurrentQuery(query);
    setCurrentPage(+page);
  }, [searchParams]);

  return { charactersIsFetching, preparedCharacters, totalPages, currentPage };
};
