import { getPaginationRange } from '@utils/index';
import classnames from 'classnames';
import { useEffect, useState } from 'react';
import styles from './Pagination.module.scss';

const maxShownPages = 5;

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  setCurrentPage: (data: number) => void;
}

export const Pagination = ({ currentPage, totalPages, setCurrentPage }: PaginationProps) => {
  const [paginationRange, setPaginationRange] = useState<number[]>([]);

  useEffect(() => {
    const newPaginationRange = getPaginationRange(currentPage, totalPages);
    setPaginationRange(newPaginationRange);
  }, [currentPage, totalPages]);

  return (
    <nav className={styles.paginationNav} aria-label="Page navigation">
      {totalPages > 1 && (
        <ul className={styles.pagination}>
          <li>
            <button
              type="button"
              className={classnames(styles.pgnButton, { [styles.first]: true })}
              onClick={() => setCurrentPage(1)}
              aria-label="First"
              disabled={currentPage === 1}
            >
              <span aria-hidden="true" />
            </button>
          </li>
          <li>
            <button
              type="button"
              className={classnames(styles.pgnButton, { [styles.previous]: true })}
              onClick={() => setCurrentPage(currentPage - 1)}
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
                className={classnames(styles.pgnButton, { [styles.active]: el === currentPage })}
                onClick={() => setCurrentPage(el)}
              >
                {el}
              </button>
            </li>
          ))}
          {totalPages > maxShownPages && paginationRange.length === 5 && (
            <li>
              <button type="button" className={classnames(styles.pgnButton, { [styles.empty]: true })} disabled>
                ...
              </button>
            </li>
          )}
          <li>
            <button
              type="button"
              className={classnames(styles.pgnButton, { [styles.next]: true })}
              onClick={() => setCurrentPage(currentPage + 1)}
              aria-label="Next"
              disabled={currentPage === totalPages || totalPages === 0}
            >
              <span aria-hidden="true" />
            </button>
          </li>
          <li>
            <button
              type="button"
              className={classnames(styles.pgnButton, { [styles.last]: true })}
              onClick={() => setCurrentPage(totalPages)}
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
