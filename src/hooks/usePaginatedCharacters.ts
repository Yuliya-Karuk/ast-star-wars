import { useSearchParams } from 'react-router-dom';
import { useCharacters } from './useCharacters';

export const usePaginatedCharacters = () => {
  const [searchParams] = useSearchParams();
  const urlPage = searchParams.get('page') || '';
  const currentPage = urlPage ? +urlPage : 1;
  const currentQuery = searchParams.get('q') || '';
  const { charactersIsFetching, preparedCharacters, totalPages } = useCharacters(currentQuery, currentPage);

  return { charactersIsFetching, preparedCharacters, totalPages, currentPage };
};
