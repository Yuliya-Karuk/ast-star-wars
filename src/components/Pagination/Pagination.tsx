import { useTheme } from '@/contexts';
import { usePaginatedCharacters } from '@/hooks';
import { getPaginationRange } from '@/utils';
import cn from 'classnames';
import { useSearchParams } from 'react-router-dom';
import s from './Pagination.module.scss';

const maxShownPages = 5;

export const Pagination = () => {
  const { currentPage, totalPages } = usePaginatedCharacters();
  const paginationRange = getPaginationRange(currentPage, totalPages);
  const [searchParams, setSearchParams] = useSearchParams();
  const { theme } = useTheme();

  const handlePageChange = (newPage: number) => {
    const currentParams = new URLSearchParams(searchParams);
    currentParams.set('page', String(newPage));
    setSearchParams(currentParams);
  };

  return (
    <nav className={s.paginationNav} aria-label="Page navigation">
      {totalPages > 1 && (
        <ul className={s.pagination}>
          <li>
            <button
              type="button"
              className={cn(s.pgnButton, { [s.first]: true, [s.light]: theme === 'light' })}
              onClick={() => handlePageChange(1)}
              aria-label="First"
              disabled={currentPage === 1}
            >
              <span aria-hidden="true" />
            </button>
          </li>
          <li>
            <button
              type="button"
              className={cn(s.pgnButton, { [s.previous]: true, [s.light]: theme === 'light' })}
              onClick={() => handlePageChange(currentPage - 1)}
              aria-label="Previous"
              disabled={currentPage === 1}
            >
              <span aria-hidden="true" />
            </button>
          </li>
          {paginationRange.map(el => (
            <li key={el}>
              <button
                type="button"
                className={cn(s.pgnButton, { [s.light]: theme === 'light', [s.active]: el === currentPage })}
                onClick={() => handlePageChange(el)}
              >
                {el}
              </button>
            </li>
          ))}
          {totalPages > maxShownPages && paginationRange.length === 5 && (
            <li>
              <button
                type="button"
                className={cn(s.pgnButton, { [s.empty]: true, [s.light]: theme === 'light' })}
                disabled
              >
                ...
              </button>
            </li>
          )}
          <li>
            <button
              type="button"
              className={cn(s.pgnButton, { [s.next]: true, [s.light]: theme === 'light' })}
              onClick={() => handlePageChange(currentPage + 1)}
              aria-label="Next"
              disabled={currentPage === totalPages || totalPages === 0}
            >
              <span aria-hidden="true" />
            </button>
          </li>
          <li>
            <button
              type="button"
              className={cn(s.pgnButton, { [s.last]: true, [s.light]: theme === 'light' })}
              onClick={() => handlePageChange(totalPages)}
              aria-label="Last"
              disabled={currentPage === totalPages || totalPages === 0}
            >
              <span aria-hidden="true" />
            </button>
          </li>
        </ul>
      )}
    </nav>
  );
};
